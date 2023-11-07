const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Ajouter une nouvelle transaction à un compte
router.post('/accounts/:accountId/transactions', transactionController.addTransaction);

// Afficher toutes les transactions d'un compte
router.get('/accounts/:accountId/transactions', transactionController.getTransactionsByAccountId);

// Mettre à jour une transaction spécifique
// Mettre à jour une transaction spécifique pour un compte
router.put('/accounts/:accountId/transactions/:transactionId', transactionController.updateTransaction);

// Supprimer une transactionx
// Supprimer une transaction spécifique pour un compte
router.delete('/accounts/:accountId/transactions/:transactionId', transactionController.deleteTransaction);

router.post('/transfer', transactionController.transferFunds);

// Calculer les dépenses totales pour un compte
router.get('/accounts/:accountId/transactions/expenses', transactionController.getTotalExpenses);

// Calculer les revenus totaux pour un compte
router.get('/accounts/:accountId/transactions/income', transactionController.getTotalIncome);

module.exports = router;
