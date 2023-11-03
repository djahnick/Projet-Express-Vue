

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
    </div>
    
    <TransactionForm 
      :accountId="accountDetails.id" 
      @transaction-created="updateTransactions"
    />

    <TransactionList 
      ref="transactionList" 
      :accountId="accountDetails.id"
    />
    <AccountChart :accountId="accountDetails.id" />

    
  </div>
</template>

<script>
import axios from 'axios';
import TransactionForm from '../components/TransactionForm.vue';
import TransactionList from '../components/TransactionList.vue';
import AccountChart from '../components/AccountChart.vue'; // Assurez-vous que le chemin d'importation est correct


export default {
  name: 'AccountDetails',
  components: {
    TransactionForm,
    TransactionList,
    AccountChart
    
  },
  data() {
    return {
      // Set initial values to avoid errors before the actual data is fetched
      accountDetails: {
        balance: 0,
        currency: 'EUR', // Replace 'EUR' with your default or expected currency
        accountName: '',
        id: null
      }
    };
  },
  computed: {
    formattedBalance() {
      // Check if accountDetails has the necessary properties to avoid errors
      if (typeof this.accountDetails.currency === 'string' && typeof this.accountDetails.balance === 'number') {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: this.accountDetails.currency
        }).format(this.accountDetails.balance);
      }
      // Return a placeholder or empty string if the data is not yet available
      return 'Chargement...';
    }
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
        // Handle error, show user-friendly message if needed
      }
    },
    async updateTransactions() {
      // Refresh account details and transaction list
      await this.fetchAccountDetails();
      if (this.$refs.transactionList) {
        this.$refs.transactionList.fetchTransactions();
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>

