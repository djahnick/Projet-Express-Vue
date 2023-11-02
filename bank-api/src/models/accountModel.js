class Account {
  constructor(id, accountName, balance, currency) {
      this.id = id;
      this.accountName = accountName;
      this.balance = balance;
      this.currency = currency;
      this.transactions = [];  // Chaque compte aura ses propres transactions
  }
}

const accounts = []; // Stocke tous les comptes

module.exports = { Account, accounts };
