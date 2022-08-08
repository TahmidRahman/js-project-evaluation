import Account from './account.js';

export default class System {
  constructor(config) {
    this.accounts = [];
    this.config = config;
  }

  findAccountById(id) {
    return this.accounts.find((acc) => acc && acc.getId() == id);
  }

  createAccount(id) {
    const account = new Account(id, this.config);
    this.accounts = this.accounts.concat(account);
    return account;
  }

  findOrCreateAccount(id) {
    let account = this.findAccountById(id);
    if (!account) {
      account = this.createAccount(id);
    }
    return account;
  }
}
