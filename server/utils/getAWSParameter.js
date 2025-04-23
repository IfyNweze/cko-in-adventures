const {
    SSMClient,
    GetParameterCommand,
  } = require("@aws-sdk/client-ssm");
  
const REGION = "eu-west-2";
const ssm = new SSMClient({ region: REGION });

async function getParameter(name) {
    try {
      // Prepare the parameters to fetch from SSM
      const params = {
        Name: name, // Name of the parameter to fetch
        WithDecryption: true // Decrypt the value if it is a SecureString
      };
  
      // Call AWS SSM to get the parameter value
      const command = new GetParameterCommand(params);
      const response = await ssm.send(command);
      
      return response.Parameter.Value; 
    } catch (err) {
      console.error(`Error fetching parameter ${name}:`, err);
      throw err; 
    }
  }
  
module.exports = getParameter;
