import Account from './account.js';

export default class System {
  constructor(config) {
    this.accounts = [];
    this.config = config;
  }

  findOrCreateAccount(id) {
    let account;
    if (this.accounts.length) {
      account = this.accounts.find((acc) => acc.getId() == id);
    }
    if (!account) {
      account = new Account(id, this.config);
      this.accounts = this.accounts.concat(account);
    }
    return account;
  }
}
