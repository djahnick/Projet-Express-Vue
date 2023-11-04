// model/accountModel.js
class Account {
  constructor(id, accountName, initialBalance, balance, currency) {
      this.id = id;
      this.accountName = accountName;
      this.initialBalance = initialBalance; // Ajout de l'attribut initialBalance
      this.balance = balance;
      this.currency = currency;
      this.transactions = [];  // Chaque compte aura ses propres transactions
  }
}



const accounts = []; // Stocke tous les comptes

module.exports = { Account, accounts };
