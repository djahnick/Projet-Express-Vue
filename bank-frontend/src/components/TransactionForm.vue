<template>
  <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg">

    <h2 class="text-2xl font-bold mb-6 text-gray-800">Ajouter une Transaction</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label for="date" class="block mb-2 text-sm font-medium text-gray-700">Date:</label>
        <input type="date" id="date" v-model="transaction.date" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      </div>
      <div>
        <label for="category" class="block mb-2 text-sm font-medium text-gray-700">Catégorie:</label>
        <select id="category" v-model="transaction.category" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="dépense">dépense</option>
          <option value="revenu">revenu</option>
        </select>
      </div>
      <div>
        <label for="amount" class="block mb-2 text-sm font-medium text-gray-700">Montant:</label>
        <input type="number" id="amount" v-model="transaction.amount" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      </div>
      <div>
        <label for="description" class="block mb-2 text-sm font-medium text-gray-700">Description:</label>
        <textarea id="description" v-model="transaction.description" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ajoutez une description..."></textarea>
      </div>
      <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Soumettre la Transaction</button>
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