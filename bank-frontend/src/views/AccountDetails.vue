<template>
  <div class="container mx-auto p-8 mb-12">
      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <!-- Account Name Card -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <div class="flex items-center">
            <i class="fas fa-user-circle text-4xl sm:text-5xl text-gray-900"></i> <!-- Ajoutez l'icône ici -->
            <div class="ml-4">
                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ accountDetails.accountName }}</span>
                <h3 class="text-base font-normal text-gray-500">Nom du Compte</h3>
            </div>
        </div>
    </div>

    <!-- Initial Balance Card -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <div class="flex items-center">
            <i class="fas fa-wallet text-4xl sm:text-5xl text-blue-900"></i> <!-- Ajoutez l'icône ici -->
            <div class="ml-4">
                <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{{ formattedInitialBalance }}</span>
                <h3 class="text-base font-normal text-gray-500">Solde Initial</h3>
            </div>
        </div>
    </div>

    <!-- Current Balance Card -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <div class="flex items-center">
            <i class="fas fa-wallet text-4xl sm:text-5xl text-blue-900"></i> <!-- Ajoutez l'icône ici -->
            <div class="ml-4">
                <span class="text-2xl sm:text-3xl leading-none font-bold text-blue-900">{{ formattedBalance }}</span>
                <h3 class="text-base font-normal text-gray-500">Solde Actuel</h3>
            </div>
        </div>
    </div>

    <!-- Total Income and Expenses Card -->
    <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <div class="flex items-center">
            <i class="fas fa-money-bill text-4xl sm:text-5xl text-green-500"></i> <!-- Ajoutez l'icône ici -->
            <div class="ml-4">
                <span class="text-2xl sm:text-3xl leading-none font-bold text-green-500">{{ formattedTotalIncome }}</span>
                <h3 class="text-base font-normal text-gray-500">Total Revenu</h3>
            </div>
        </div>
        <div class="flex items-center mt-4">
            <i class="fas fa-shopping-cart text-4xl sm:text-5xl text-red-500"></i> <!-- Ajoutez l'icône ici -->
            <div class="ml-4">
                <span class="text-2xl sm:text-3xl leading-none font-bold text-red-500">{{ formattedTotalExpenses }}</span>
                <h3 class="text-base font-normal text-gray-500">Total Dépenses</h3>
            </div>
        </div>
    </div>
</div>


      <!-- Transaction Form -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Transaction Form -->
          <div>
              <TransactionForm :accountId="accountDetails.id" @transaction-created="updateTransactions" />
          </div>

          <!-- Transaction List avec défilement vertical -->
          <div class="overflow-auto max-h-[580px] min-w-[600px]">
              <!-- Ajustez la largeur minimale au besoin -->
              <TransactionList ref="transactionList" :accountId="accountDetails.id" @update-totals="updateTotals" @transaction-deleted="updateTransactions" @transaction-updated="updateTransactions" />
          </div>
      </div>

      <!-- Transfer Funds -->
      <div class="mt-6">
          <TransferFunds :from-account="accountDetails.id" @transfer-completed="updateTransactions" />
      </div>
      <div class="mt-6">
          <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
              <AccountChart ref="accountChart" :accountId="accountDetails.id" />
          </div>
      </div>
  </div>
</template>

<script>
  import axios from "axios";
  import TransactionForm from "../components/TransactionForm.vue";
  import TransactionList from "../components/TransactionList.vue";
  import AccountChart from "../components/AccountChart.vue";
  import TransferFunds from "../components/TransferFunds.vue";

  export default {
      name: "AccountDetails",
      components: {
          TransactionForm,
          TransactionList,
          AccountChart,
          TransferFunds,
      },
      data() {
          return {
              accountDetails: {
                  balance: 0,
                  currency: "EUR",
                  accountName: "",
                  initialBalance: 0,
                  id: null,
              },
              totalIncome: null, // Ajoutez ces deux propriétés
              totalExpenses: null,
          };
      },
      computed: {
          formattedInitialBalance() {
              if (typeof this.accountDetails.currency === "string" && typeof this.accountDetails.initialBalance === "number") {
                  return new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: this.accountDetails.currency,
                  }).format(this.accountDetails.initialBalance);
              }
              return "Chargement...";
          },
          formattedBalance() {
              if (typeof this.accountDetails.currency === "string" && typeof this.accountDetails.balance === "number") {
                  return new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: this.accountDetails.currency,
                  }).format(this.accountDetails.balance);
              }
              return "Chargement...";
          },
          formattedTotalIncome() {
              if (typeof this.totalIncome === "number") {
                  return new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: this.accountDetails.currency,
                  }).format(this.totalIncome);
              }
              return "Chargement...";
          },
          formattedTotalExpenses() {
              if (typeof this.totalExpenses === "number") {
                  return new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: this.accountDetails.currency,
                  }).format(this.totalExpenses);
              }
              return "Chargement...";
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
                  console.error("Erreur lors de la récupération des détails du compte", error);
              }
          },
          async fetchTotalIncome() {
              const incomeUrl = `http://localhost:3000/accounts/${this.accountDetails.id}/transactions/income`;
              try {
                  const response = await axios.get(incomeUrl);
                  this.totalIncome = response.data.totalIncome;
              } catch (error) {
                  console.error("Erreur lors de la récupération du total des revenus", error);
              }
          },
          async fetchTotalExpenses() {
              const expensesUrl = `http://localhost:3000/accounts/${this.accountDetails.id}/transactions/expenses`;
              try {
                  const response = await axios.get(expensesUrl);
                  this.totalExpenses = response.data.totalExpenses;
              } catch (error) {
                  console.error("Erreur lors de la récupération du total des dépenses", error);
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
      },
  };
</script>

<style scoped>
  /* Add your styles here */
</style>
