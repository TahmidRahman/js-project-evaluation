export default class OperationDetails {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  getAmount() {
    return this.amount;
  }

  setCurrency(currency) {
    this.currency = currency;
  }

  getCurrency() {
    return this.currency;
  }
}
