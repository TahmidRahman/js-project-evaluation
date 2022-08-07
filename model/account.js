import { round, smallestCurrency } from '../utils/format.js';
import startOfWeek from 'date-fns/startOfWeek/index.js';

export default class Account {
  constructor(id, config) {
    this.id = id;
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
    const operationType = operation.getType();
    const operationUserType = operation.getUserType();
    const allOperations = this.getOperations();
    const commission = this.config[operationType][operationUserType];
    if (commission.max) {
      return this.handleMaxCommission(operation, commission);
    } else if (commission.min) {
      return this.handleMinCommission(operation, commission);
    } else if (commission.week_limit) {
      return this.handleWeeklyCommission(operation, commission, allOperations);
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
    const startOfWeekDate = startOfWeek(
      new Date(operation.getDate())
    ).toISOString();
    if (!this.weeks[startOfWeekDate]) {
      this.weeks[startOfWeekDate] = amount;
    } else {
      this.weeks[startOfWeekDate] += amount;
    }
    if (this.weeks[startOfWeekDate] > commission.week_limit.amount) {
      const calculatedCommission = smallestCurrency(
        (this.weeks[startOfWeekDate] - commission.week_limit.amount) *
          commission.percents
      );

      const extraCommission = !this.countedWeeks[startOfWeekDate]
        ? calculatedCommission
        : round(calculatedCommission - this.countedWeeks[startOfWeekDate]);

      this.countedWeeks[startOfWeekDate] = calculatedCommission;
      return extraCommission;
    } else {
      return round(0);
    }
  }
}
