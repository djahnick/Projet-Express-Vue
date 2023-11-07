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
    
        res.status(201).send(newTransaction)
    },

    getTransactionsByAccountId: (req, res) => {
        const data = readData();
        const accountId = parseInt(req.params.accountId);
        const accountTransactions = data.transactions.filter(t => t.accountId === accountId);
        res.status(200).send(accountTransactions);
    },
    
    updateTransaction: (req, res) => {
        const data = readData();
        const accountId = parseInt(req.params.accountId);
        const transactionId = parseInt(req.params.transactionId);
        const transactionIndex = data.transactions.findIndex(t => t.id === transactionId && t.accountId === accountId);
    
        if (transactionIndex === -1) {
            return res.status(404).send('La transaction n\'a pas été trouvée.');
        }
    
        const transactionToUpdate = data.transactions[transactionIndex];
        const account = data.accounts.find(a => a.id === accountId);
    
        if (!account) {
            return res.status(404).send('Le compte associé à la transaction n\'a pas été trouvé.');
        }
    
        // Annulez l'impact de la transaction originale sur le solde
        if (transactionToUpdate.category === 'dépense') {
            account.balance += transactionToUpdate.amount;
        } else if (transactionToUpdate.category === 'revenu') {
            account.balance -= transactionToUpdate.amount;
        }
    
        // Appliquez les modifications de la transaction
        Object.assign(transactionToUpdate, req.body);
    
        // Calculez le nouvel impact sur le solde
        if (transactionToUpdate.category === 'dépense') {
            account.balance -= transactionToUpdate.amount;
        } else if (transactionToUpdate.category === 'revenu') {
            account.balance += transactionToUpdate.amount;
        }
    
        // Mise à jour du solde du compte et sauvegarde des modifications
        writeData(data);
        res.status(200).send(transactionToUpdate);
    },

    deleteTransaction: (req, res) => {
        const data = readData();
        const accountId = parseInt(req.params.accountId);
        const transactionId = parseInt(req.params.transactionId);
        const transactionIndex = data.transactions.findIndex(t => t.id === transactionId && t.accountId === accountId);
    
        if (transactionIndex === -1) {
            return res.status(404).send('La transaction n\'a pas été trouvée.');
        }
    
        const transactionToDelete = data.transactions[transactionIndex];
        const account = data.accounts.find(a => a.id === accountId);
    
        if (!account) {
            return res.status(404).send('Le compte associé à la transaction n\'a pas été trouvé.');
        }
    
        // Annulez l'impact de la transaction sur le solde du compte
        if (transactionToDelete.category === 'dépense') {
            account.balance += transactionToDelete.amount;
        } else if (transactionToDelete.category === 'revenu') {
            account.balance -= transactionToDelete.amount;
        }
    
        // Supprimez la transaction de la liste des transactions
        data.transactions.splice(transactionIndex, 1);
    
        // Sauvegardez les modifications dans le fichier JSON
        writeData(data);
        res.status(200).send({ message: 'Transaction supprimée.' });
    },
    transferFunds: (req, res) => {
        const { fromAccountId, toAccountId, amount } = req.body;
    
        // Vérifiez si le montant est valide
        if (amount <= 0) {
            return res.status(400).send('Le montant doit être supérieur à zéro.');
        }
    
        const data = readData();
    
        // Trouvez les comptes d'origine et de destination
        const fromAccount = data.accounts.find(account => account.id === fromAccountId);
        const toAccount = data.accounts.find(account => account.id === toAccountId);
    
        // Vérifiez si les deux comptes existent
        if (!fromAccount || !toAccount) {
            return res.status(404).send('Un ou les deux comptes n\'ont pas été trouvés.');
        }
    
        // Vérifiez si le compte d'origine a suffisamment de fonds
        if (fromAccount.balance < amount) {
            return res.status(400).send('Fonds insuffisants pour effectuer le transfert.');
        }
    
        // Effectuez le transfert
        fromAccount.balance -= amount;
        toAccount.balance += amount;
    
        // Créez des transactions pour représenter le transfert dans les deux comptes
        const transferTransaction = {
            id: data.transactions.length + 1,
            fromAccountId: fromAccountId,
            toAccountId: toAccountId,
            amount: amount,
            date: new Date(), // Ajoutez la date actuelle pour la transaction
            type: 'transfer'
        };
    
        data.transactions.push(transferTransaction);
    
        // Sauvegardez les modifications dans le fichier JSON
        writeData(data);
    
        // Répondez avec la transaction de transfert pour confirmer l'opération
        res.status(201).send(transferTransaction);
    },
    getTotalExpenses: (req, res) => {
        const data = readData();
        const accountId = parseInt(req.params.accountId);
        const expenses = data.transactions
            .filter(t => t.accountId === accountId && t.category === 'dépense')
            .reduce((total, transaction) => total + transaction.amount, 0);

        res.status(200).send({ totalExpenses: expenses });
    },

    getTotalIncome: (req, res) => {
        const data = readData();
        const accountId = parseInt(req.params.accountId);
        const income = data.transactions
            .filter(t => t.accountId === accountId && t.category === 'revenu')
            .reduce((total, transaction) => total + transaction.amount, 0);

        res.status(200).send({ totalIncome: income });
    }
    

};

module.exports = transactionController;
