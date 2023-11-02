const fs = require('fs');
const path = require('path');

// Chemin vers data.json
// jsonDB.js
const dataPath = path.join(__dirname, 'data.json');

function readData() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier', error);
        return null;
    }
}

function writeData(data) {
    try {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataPath, dataString, 'utf8');
    } catch (error) {
        console.error('Erreur lors de lécriture dans le fichier', error);
    }
}

module.exports = { readData, writeData };
