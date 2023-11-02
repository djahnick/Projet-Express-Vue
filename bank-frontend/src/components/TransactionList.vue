<template>
  <div>
    <h2>Transactions</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        <strong>ID:</strong> {{ transaction.id }}<br>
        <strong>Date:</strong> {{ transaction.date }}<br>
        <strong>Catégorie:</strong> {{ transaction.category }}<br>
        <strong>Montant:</strong> {{ transaction.amount }}<br>
        <strong>Description:</strong> {{ transaction.description }}
      </li>
    </ul>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'TransactionList',
  props: {
    accountId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      transactions: []
    };
  },
  watch: {
    accountId: {
      immediate: true,
      handler() {
        this.fetchTransactions();
      }
    }
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await axios.get(`http://localhost:3000/accounts/${this.accountId}/transactions`);
        this.transactions = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des transactions', error);
      }
    }
  }
};
</script>

<style scoped>
/* Votre CSS ici */
</style>