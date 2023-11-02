const { readData, writeData } = require('../../jsonDB');

const transactionController = {
    addTransaction: (req, res) => {
        const data = readData();
        const accountId = parseInt(req.params.accountId);
        const account = data.accounts.find(a => a.id === accountId);
    
        if (!account) {
            return res.status(404).send('Le compte n\'a pas été trouvé.');
        }
    
        const newTransaction = { 
            id: data.transactions.length + 1, 
            accountId: accountId,
            ...req.body 
        };
    
        data.transactions.push(newTransaction);
    
        // Mise à jour du solde du compte
        if (newTransaction.category === 'dépense') {
            account.balance -= newTransaction.amount;
        } else if (newTransaction.category === 'revenu') {
            account.balance += newTransaction.amount;
        }
    
        // Sauvegarde de la nouvelle transaction et du solde mis à jour
        writeData(data);
    
        console.log(`Solde après transaction: ${account.balance}`);
        res.status(201).send(newTransaction);
    },
    

    getTransactionsByAccountId: (req, res) => {
        const data = readData();
        const accountTransactions = data.transactions.filter(t => t.accountId === parseInt(req.params.accountId));
        res.status(200).send(accountTransactions);
    },
    
    updateTransaction: (req, res) => {
        const data = readData();
        const transaction = data.transactions.find(t => t.id === parseInt(req.params.transactionId));
        if (!transaction) return res.status(404).send('La transaction n\'a pas été trouvée.');

        // Mise à jour des informations de la transaction
        Object.assign(transaction, req.body);
        writeData(data);
        res.status(200).send(transaction);
    },

    deleteTransaction: (req, res) => {
        const data = readData();
        const index = data.transactions.findIndex(t => t.id === parseInt(req.params.transactionId));
        if (index === -1) return res.status(404).send('La transaction n\'a pas été trouvée.');

        data.transactions.splice(index, 1);
        writeData(data);
        res.status(200).send({ message: 'Transaction supprimée.' });
    }
};

module.exports = transactionController;
