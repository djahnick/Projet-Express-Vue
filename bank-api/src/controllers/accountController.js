const { readData, writeData } = require('../../jsonDB');

function readAccountsFromFile() {
    const data = readData();
    return data.accounts || [];
}

function writeAccountsToFile(accounts) {
    const data = readData();
    data.accounts = accounts;
    writeData(data);
}

const accountController = {
    createAccount: (req, res) => {
        const accounts = readAccountsFromFile();
        const newAccount = { 
            id: accounts.length + 1, 
            ...req.body 
        };
        accounts.push(newAccount);
        writeAccountsToFile(accounts);
        res.status(201).send(newAccount);
    },

    getAllAccounts: (req, res) => {
        const accounts = readAccountsFromFile();
        res.status(200).send(accounts);
    },

    getAccountById: (req, res) => {
        const accounts = readAccountsFromFile();
        const account = accounts.find(a => a.id === parseInt(req.params.id));
        if (!account) return res.status(404).send('Le compte n\'a pas été trouvé.');
        res.status(200).send(account);
    },

    updateAccount: (req, res) => {
        const accounts = readAccountsFromFile();
        const index = accounts.findIndex(a => a.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Le compte n\'a pas été trouvé.');

        accounts[index] = { ...accounts[index], ...req.body };
        writeAccountsToFile(accounts);
        res.status(200).send(accounts[index]);
    },

    deleteAccount: (req, res) => {
        let accounts = readAccountsFromFile();
        const index = accounts.findIndex(a => a.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Le compte n\'a pas été trouvé.');

        accounts = accounts.filter((_, idx) => idx !== index);
        writeAccountsToFile(accounts);
        res.status(200).send({ message: 'Compte supprimé.' });
    }
};

module.exports = { accountController };
