import { round, smallestCurrency } from '../utils/format.js';
import startOfWeek from 'date-fns/startOfWeek/index.js';

export default class Account {
  constructor(id, type, config) {
    this.id = id;
    this.type = type;
    this.operations = [];
    this.config = config;
    this.weeks = {};
    this.countedWeeks = {};
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  setOperations(operations) {
    this.operations = operations;
  }

  getOperations() {
    return this.operations;
  }

  addOperation(operation) {
    this.operations = this.operations.concat(operation);
  }

  getOperationsCount() {
    return this.operations.length;
  }

  getLastOperation() {
    return this.operations[this.operations.length - 1] || null;
  }

  getCommissionOfLastOperation() {
    const operation = this.getLastOperation();
    return this.getCommission(operation);
  }

  getCommission(operation) {
    const operationType = operation.getType();
    const operationUserType = operation.getUserType();
    const commission = this.config[operationType][operationUserType];
    if (commission.max) {
      return this.handleMaxCommission(operation, commission);
    } else if (commission.min) {
      return this.handleMinCommission(operation, commission);
    } else if (commission.week_limit) {
      return this.handleWeeklyCommission(operation, commission);
    }
  }

  handleMaxCommission(operation, commission) {
    const calculatedCommission = smallestCurrency(
      operation.getOperationDetails().getAmount() * commission.percents
    );
    return calculatedCommission > commission.max.amount
      ? round(commission.max.amount)
      : calculatedCommission;
  }

  handleMinCommission(operation, commission) {
    const calculatedCommission = smallestCurrency(
      operation.getOperationDetails().getAmount() * commission.percents
    );
    return calculatedCommission > commission.min.amount
      ? calculatedCommission
      : round(0);
  }

  handleWeeklyCommission(operation, commission) {
    const amount = operation.getOperationDetails().getAmount();
    const startOfWeekDate = startOfWeek(new Date(operation.getDate()), {
      weekStartsOn: 1
    }).toISOString();
    if (!this.weeks[startOfWeekDate]) {
      this.weeks[startOfWeekDate] = amount;
    } else {
      this.weeks[startOfWeekDate] += amount;
    }
    if (this.weeks[startOfWeekDate] > commission.week_limit.amount) {
      const extendedAmount =
        this.weeks[startOfWeekDate] -
        (this.countedWeeks[startOfWeekDate] || commission.week_limit.amount);
      this.countedWeeks[startOfWeekDate] = this.weeks[startOfWeekDate];
      return smallestCurrency(extendedAmount * commission.percents);
    } else {
      return round(0);
    }
  }
}
