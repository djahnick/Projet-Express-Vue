class Transaction {
  constructor(id, accountId, date, category, amount, description) {
      this.id = id;
      this.accountId = accountId; // L'ID du compte associé
      this.date = date;
      this.category = category;
      this.amount = amount;
      this.description = description;
  }
}

module.exports = { Transaction };
