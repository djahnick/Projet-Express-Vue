const express = require('express');
const cors = require('cors'); // Ajouter cors

const accountRoutes = require('./src/routes/accountRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');

const app = express();

// Configuration de CORS
app.use(cors({
    origin: 'http://localhost:8080', // Remplacer par l'URL de votre frontend Vue.js
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());

app.use('/', accountRoutes); // Ajouté '/accounts' comme base pour les routes de compte
app.use('/', transactionRoutes); // Ajouté '/transactions' comme base pour les routes de transaction

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
