// Import the DynamoDB low-level client from AWS SDK v3
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

// Import the DynamoDBDocumentClient and PutCommand for easier document-style API
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

// (defaulting to eu-west-2 if not set in env)
const REGION = process.env.AWS_REGION || "eu-west-2";

const TABLE_NAME = process.env.WEBHOOKS_TABLE || "CKO-Webhooks";

// Create a DynamoDB client instance
const client = new DynamoDBClient({ region: REGION });

// Create a higher-level document client for easier data handling (auto converts types)
const ddb = DynamoDBDocumentClient.from(client);

// Main function to write a webhook payload into DynamoDB
async function writeToDynamoDB(body) {

  const { id: eventID, type, data } = body;

  try {
    // Generate a timestamp for the event storage time
    const timestamp = new Date().toISOString();

    // Prepare the item to be stored
    const item = {
      // Use data.id if available, otherwise fallback to source_id or a random string
      event_id: eventID || "unknown_id",

      // Store the type of webhook event (like 'payment_approved')
      event_type: type || "unknown_event",

      // Save the timestamp of when the webhook was received/stored
      timestamp,

      // Store the full webhook data under a "raw_data" field for future use
      raw_data: data,
    };

    // Use the PutCommand to write this item to the specified DynamoDB table
    await ddb.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    }));

    // Log success
    console.log("Stored in DynamoDB:", item.event_id);

  } catch (err) {
    // Log error if anything goes wrong during the write
    console.error("Failed to store in DynamoDB", err);
  }
}

module.exports = writeToDynamoDB;
