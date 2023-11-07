<template>
  <div class="container mx-auto p-6 bg-white shadow-md rounded">

    <h2 class="text-2xl font-bold mb-4 text-gray-800">Ajouter une Transaction</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date:</label>
        <input type="date" id="date" v-model="transaction.date" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700">Catégorie:</label>
        <select id="category" v-model="transaction.category" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="dépense">dépense</option>
          <option value="revenu">revenu</option>
        </select>
      </div>
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Montant:</label>
        <input type="number" id="amount" v-model="transaction.amount" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" v-model="transaction.description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
      </div>
      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Soumettre la Transaction</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TransactionForm',
  props: {
    accountId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      transaction: {
        date: '',
        category: '',
        amount: 0,
        description: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post(`http://localhost:3000/accounts/${this.accountId}/transactions`, this.transaction);
        alert('Transaction ajoutée avec succès!');
        this.$emit('transaction-created'); // Émettre un événement pour actualiser la liste des transactions
        // Réinitialiser le formulaire après l'envoi
        this.transaction = { date: '', category: '', amount: 0, description: '' };
      } catch (error) {
        console.error('Erreur lors de lajout de la transaction', error);
        alert('Erreur lors de la création de la transaction');
      }
    }
  }
};
</script>

<style scoped>
/* ... */
</style>