const express = require('express');
const router = express.Router();
const { accountController } = require('../controllers/accountController');

// Créer un nouveau compte bancaire
router.post('/accounts', accountController.createAccount);

// Afficher tous les comptes bancaires
router.get('/accounts', accountController.getAllAccounts);


// Afficher un compte bancaire spécifique par ID
router.get('/accounts/:id', accountController.getAccountById);

// Mettre à jour un compte bancaire
router.put('/accounts/:id', accountController.updateAccount);

// Supprimer un compte bancaire
router.delete('/accounts/:id', accountController.deleteAccount);

module.exports = router;
