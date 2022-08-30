import Operation from './model/operation.js';
import OperationDetails from './model/operation-details.js';
import System from './model/system.js';
import { getConfig } from './utils/config.js';
import { isValidFileInput, parseDataFromFile } from './utils/file.js';

async function runApp() {
  const fileInput = process.argv[2];
  if (isValidFileInput(fileInput)) {
    const data = parseDataFromFile(fileInput);
    const config = await getConfig();
    const paymentSystem = new System(config);
    for (const operationItem of data) {
      const { date, user_id, user_type, type, operation } = operationItem;
      const { amount, currency } = operation;
      const operationDetails = new OperationDetails(amount, currency);
      const operationInstance = new Operation(
        date,
        user_id,
        user_type,
        type,
        operationDetails
      );
      const account = paymentSystem.findOrCreateAccount(user_id, user_type);
      account.addOperation(operationInstance);
      process.stdout.write(account.getCommissionOfLastOperation());
      process.stdout.write('\n');
    }
  }
}

runApp();
