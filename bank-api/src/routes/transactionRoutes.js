const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Ajouter une nouvelle transaction à un compte
router.post('/accounts/:accountId/transactions', transactionController.addTransaction);

// Afficher toutes les transactions d'un compte
router.get('/accounts/:accountId/transactions', transactionController.getTransactionsByAccountId);

// Mettre à jour une transaction spécifique
router.put('/transactions/:transactionId', transactionController.updateTransaction);

// Supprimer une transaction
router.delete('/transactions/:transactionId', transactionController.deleteTransaction);

module.exports = router;
