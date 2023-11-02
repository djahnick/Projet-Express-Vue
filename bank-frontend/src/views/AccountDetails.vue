<template>
  <div>
    <h2>Détails du Compte</h2>
    <p>Nom du Compte: {{ accountDetails.accountName }}</p>
    <p>Solde: {{ accountDetails.balance }} {{ accountDetails.currency }}</p>

    <TransactionForm :accountId="accountDetails.id" @transaction-created="updateTransactions"></TransactionForm>

  <TransactionList ref="transactionList" :accountId="accountDetails.id"></TransactionList>
  </div>
</template>

<script>
import axios from 'axios';
import TransactionForm from '../components/TransactionForm.vue';
import TransactionList from '../components/TransactionList.vue';

export default {
  name: 'AccountDetails',
  components: {
    TransactionForm,
    TransactionList
  },
  data() {
    return {
      accountDetails: {}
    };
  },
  async created() {
    await this.fetchAccountDetails();
  },
  methods: {
    async fetchAccountDetails() {
      try {
        const accountId = this.$route.params.id;
        const response = await axios.get(`http://localhost:3000/accounts/${accountId}`);
        this.accountDetails = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du compte', error);
      }
    },
    async updateTransactions() {
      await this.fetchAccountDetails(); // Rafraîchir les détails du compte
      this.$refs.transactionList.fetchTransactions(); // Rafraîchir la liste des transactions
    }
  }
};
</script>

<style scoped>
/* Styles si nécessaire */
</style>
