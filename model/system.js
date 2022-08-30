import Account from './account.js';

export default class System {
  constructor(config) {
    this.accounts = [];
    this.config = config;
  }

  findAccountByIdAndType(id, type) {
    return this.accounts.find(
      (acc) => acc && acc.getId() == id && acc.getType() == type
    );
  }

  createAccount(id, type) {
    const account = new Account(id, type, this.config);
    this.accounts = this.accounts.concat(account);
    return account;
  }

  findOrCreateAccount(id, type) {
    let account = this.findAccountByIdAndType(id, type);
    if (!account) {
      account = this.createAccount(id, type);
    }
    return account;
  }
}
