<template>
    <div>
      <h2>Créer un Nouveau Compte</h2>
      <form @submit.prevent="createAccount">
        <input v-model="accountData.accountName" type="text" placeholder="Nom du Compte" />
        <input v-model="accountData.balance" type="number" placeholder="Solde Initial" />
        <input v-model="accountData.currency" type="text" placeholder="Devise" />
        <button type="submit">Créer</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateAccountForm',
    data() {
      return {
        accountData: {
          accountName: '',
          balance: 0,
          currency: ''
        }
      };
    },
    methods: {
      async createAccount() {
        try {
          await axios.post('http://localhost:3000/accounts/', this.accountData);
          // Gérer la réponse du serveur
          alert("Compte créé avec succès !");
          // Rediriger ou mettre à jour la vue
        } catch (error) {
          console.error("Erreur lors de la création du compte", error);
          alert("Erreur lors de la création du compte.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Votre CSS ici */
  </style>
  