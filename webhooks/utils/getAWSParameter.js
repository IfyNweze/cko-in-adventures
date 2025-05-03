const {
    SSMClient,
    GetParameterCommand,
  } = require("@aws-sdk/client-ssm");
  
const REGION = process.env.AWS_REGION || 'eu-west-2';
const ssm = new SSMClient({ region: REGION });

/**
 * Fetch a single parameter from AWS SSM Parameter Store.
 * @param {string} name - Name of the parameter to fetch.
 * @returns {Promise<string>} - The decrypted value of the parameter.
 */

async function getParameter(name) {
  try {
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: true,
    });

    const response = await ssm.send(command);
    return response.Parameter.Value;
    
  } catch (err) {
    console.error(`Error fetching parameter ${name}:`, err);
    throw err; 
  }
}
  
module.exports = getParameter;
