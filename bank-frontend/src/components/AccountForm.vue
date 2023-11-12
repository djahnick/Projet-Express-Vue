<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Créer un Nouveau Compte</h2>
    <div class="w-full max-w-sm mx-auto">
      <form @submit.prevent="createAccount" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="account-name">
            Nom du Compte
          </label>
          <input v-model="accountData.accountName" type="text" placeholder="Nom du Compte"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 id="account-name" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="initial-balance">
            Solde Initial
          </label>
          <input v-model.number="accountData.initialBalance" type="number" placeholder="Solde Initial"
       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
       id="initial-balance" required min="0">

        </div>
        <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="currency">
      Devise
    </label>
    <select v-model="accountData.currency" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="currency" required>
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
    </select>
  </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Créer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AccountForm',
  data() {
    return {
      accountData: {
        name: '', 
        initialBalance: '', 
        currency: '', // Assurez-vous que ce champ correspond au modèle du formulaire
      },
    };
  },
  methods: {
    async createAccount() {
  try {
    const response = await axios.post('http://localhost:3000/accounts', {
      ...this.accountData,
      balance: this.accountData.initialBalance  // Ajoutez cette ligne pour envoyer le solde initial comme balance
    });
    console.log('Account created:', response.data);
    this.$router.push('/');
  } catch (error) {
    console.error('Error creating account:', error);
  }
},

  },
};
</script>

