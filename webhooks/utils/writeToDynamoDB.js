const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

// Environment setup
const REGION = process.env.AWS_REGION || "eu-west-2";
const TABLE_NAME = process.env.WEBHOOKS_TABLE || "CKO-Webhooks";

// Create DynamoDB clients
const client = new DynamoDBClient({ region: REGION });
const ddb = DynamoDBDocumentClient.from(client);

// Helper: Sleep for `ms` milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper: Retry with exponential backoff
async function retryDynamoDBPut(item, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await ddb.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      }));
      return;
    } catch (err) {
      const isRetryable = err?.$retryable || err?.name === 'ProvisionedThroughputExceededException';
      if (!isRetryable || attempt === retries) throw err;
      
      const delay = 100 * 2 ** attempt; // 100ms --> 200ms --> 400ms
      console.warn(`Retry ${attempt + 1}/${retries} after error:`, err.name || err.message);
      await sleep(delay);
    }
  }
}

// Main write function
async function writeToDynamoDB(body) {
  const { id: eventID, type, data } = body;

  // Validate incoming data
  if (!eventID || !type || !data) {
    console.error("Validation error: Missing required fields in webhook body.", {
      eventID,
      type,
      hasData: !!data,
    });
    return;
  }

  const timestamp = new Date().toISOString();

  const item = {
    event_id: eventID,
    event_type: type,
    payment_id: data?.id || null,
    source_id: data?.source?.id || null,
    amount: data?.amount || 0,
    currency: data?.currency || 'N/A',
    processed_on: data?.processed_on || null,
    timestamp, 
    raw_data: data,
  };

  try {
    await retryDynamoDBPut(item);
    console.log("Stored in DynamoDB:", item.event_id);
  } catch (err) {
    if (err.name === 'ValidationException') {
      console.error("DynamoDB validation error:", err.message);
    } else if (err.name === 'ProvisionedThroughputExceededException') {
      console.error("Throughput exceeded. Enable auto-scaling? ");
    } else if (err.name === 'AccessDeniedException') {
      console.error("Access denied. Check your IAM permissions for DynamoDB.");
    } else {
      console.error("Unknown error writing to DynamoDB:", err);
    }
  }
}

module.exports = writeToDynamoDB;
