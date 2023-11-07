<template>
  <div class="container mx-auto p-8">
    <h2 class="text-2xl font-semibold mb-6">Détails du Compte</h2>
    
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p class="text-sm font-bold mb-2">Nom du Compte:</p>
      <p class="mb-4">{{ accountDetails.accountName }}</p>
      <p class="text-sm font-bold mb-2">Solde Initial:</p>
      <p class="mb-4">{{ formattedInitialBalance }}</p>
      <p class="text-sm font-bold mb-2">Solde Actuel:</p>
      <p class="mb-4">{{ formattedBalance }}</p>

      <!-- Display Total Income and Total Expenses -->
      <p class="text-sm font-bold mb-2">Total Revenu:</p>
      <p class="mb-4">{{ formattedTotalIncome }}</p>
      <p class="text-sm font-bold mb-2">Total Dépenses:</p>
      <p class="mb-4">{{ formattedTotalExpenses }}</p>
    </div>
    
    <TransactionForm 
      :accountId="accountDetails.id" 
      @transaction-created="updateTransactions"
    />

    <TransactionList 
  ref="transactionList" 
  :accountId="accountDetails.id"
  @update-totals="updateTotals"
  @transaction-deleted="updateAccountAfterTransaction" 
/>

<AccountChart ref="accountChart" :accountId="accountDetails.id" />


    
  </div>
</template>

<script>
import axios from 'axios';
import TransactionForm from '../components/TransactionForm.vue';
import TransactionList from '../components/TransactionList.vue';
import AccountChart from '../components/AccountChart.vue';

export default {
  name: 'AccountDetails',
  components: {
    TransactionForm,
    TransactionList,
    AccountChart
  },
  data() {
    return {
      accountDetails: {
        balance: 0,
        currency: 'EUR',
        accountName: '',
        initialBalance: 0,
        id: null
      },
      totalIncome: null, // Ajoutez ces deux propriétés
      totalExpenses: null
    };
  },
  computed: {
    formattedInitialBalance() {
      if (typeof this.accountDetails.currency === 'string' && typeof this.accountDetails.initialBalance === 'number') {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: this.accountDetails.currency
        }).format(this.accountDetails.initialBalance);
      }
      return 'Chargement...';
    },
    formattedBalance() {
      if (typeof this.accountDetails.currency === 'string' && typeof this.accountDetails.balance === 'number') {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: this.accountDetails.currency
        }).format(this.accountDetails.balance);
      }
      return 'Chargement...';
    },
    formattedTotalIncome() {
      if (typeof this.totalIncome === 'number') {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: this.accountDetails.currency
        }).format(this.totalIncome);
      }
      return 'Chargement...';
    },
    formattedTotalExpenses() {
      if (typeof this.totalExpenses === 'number') {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: this.accountDetails.currency
        }).format(this.totalExpenses);
      }
      return 'Chargement...';
    },
  },
  async created() {
    await this.fetchAccountDetails();
    await this.fetchTotalIncome();
    await this.fetchTotalExpenses();
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
    async fetchTotalIncome() {
      const incomeUrl = `http://localhost:3000/accounts/${this.accountDetails.id}/transactions/income`;
      try {
        const response = await axios.get(incomeUrl);
        this.totalIncome = response.data.totalIncome;
      } catch (error) {
        console.error('Erreur lors de la récupération du total des revenus', error);
      }
    },
    async fetchTotalExpenses() {
      const expensesUrl = `http://localhost:3000/accounts/${this.accountDetails.id}/transactions/expenses`;
      try {
        const response = await axios.get(expensesUrl);
        this.totalExpenses = response.data.totalExpenses;
      } catch (error) {
        console.error('Erreur lors de la récupération du total des dépenses', error);
      }
    },
    async updateTransactions() {
      await this.fetchAccountDetails();
    await this.fetchTotalIncome(); // Optionally, re-fetch total income if it could be affected
    await this.fetchTotalExpenses(); // Optionally, re-fetch total expenses if it could be affected
    this.refreshChart();
      if (this.$refs.transactionList) {
        this.$refs.transactionList.fetchTransactions();
      }
    },
    async updateAccountAfterTransaction() {
    await this.fetchAccountDetails(); // Refetch the account details to update the balance
    await this.fetchTotalIncome(); // Optionally, re-fetch total income if it could be affected
    await this.fetchTotalExpenses(); // Optionally, re-fetch total expenses if it could be affected
    this.refreshChart();
  },
  refreshChart() {
    if (this.$refs.accountChart) {
      this.$refs.accountChart.fetchAccountDetailsAndTransactions();
    }
  },
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
