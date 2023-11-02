<template>
    <div>
      <h2>Liste des Comptes</h2>
      <ul>
        <li v-for="account in accounts" :key="account.id">
        <router-link :to="`/account/${account.id}`">{{ account.accountName }} - {{ account.balance }} {{ account.currency }}</router-link>
      </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AccountList',
    data() {
      return {
        accounts: []
      };
    },
    async created() {
  try {
    const response = await axios.get('http://localhost:3000/accounts');
    this.accounts = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes', error);
  }
}

    
  };
  </script>
  
  <style scoped>
  /* Ajoutez du CSS ici si nécessaire */
  </style>
  