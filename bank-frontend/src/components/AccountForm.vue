<template>
  <div>
    <h2>Créer un Nouveau Compte</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="accountName">Nom du Compte:</label>
        <input v-model="account.accountName" type="text" id="accountName">
      </div>
      <div>
        <label for="balance">Solde Initial:</label>
        <input v-model.number="account.balance" type="number" id="balance">
      </div>
      <div>
        <label for="currency">Devise:</label>
        <input v-model="account.currency" type="text" id="currency">
      </div>
      <button type="submit">Créer Compte</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AccountForm',
  data() {
    return {
      account: {
        accountName: '',
        balance: 0,
        currency: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/accounts', this.account);
        alert('Compte créé avec succès!');
        this.resetForm();
      } catch (error) {
        console.error('Il y avait une erreur en créant le compte', error);
      }
    },
    resetForm() {
      this.account.accountName = '';
      this.account.balance = 0;
      this.account.currency = '';
    }
  }
};
</script>

<style scoped>
/* Ajoutez du CSS ici si nécessaire */
</style>
