<template>
  <div>

    <h2>Ajouter une Transaction</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="date">Date:</label>
        <input type="date" id="date" v-model="transaction.date" required>
      </div>
      <div>
        <label for="category">Catégorie:</label>
        <select id="category" v-model="transaction.category" required>
          <option value="dépense">dépense</option>
          <option value="revenu">revenu</option>
        </select>
      </div>
      <div>
        <label for="amount">Montant:</label>
        <input type="number" id="amount" v-model="transaction.amount" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="transaction.description"></textarea>
      </div>
      <button type="submit">Soumettre la Transaction</button>
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
