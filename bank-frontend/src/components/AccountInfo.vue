<template>
  <div>
    <h2>Account Information</h2>
    <div v-if="accountData">
      <p><strong>Account Name:</strong> {{ accountData.accountName }}</p>
      <p><strong>Initial Balance:</strong> {{ accountData.initialBalance }} {{ accountData.currency }}</p>
      <p><strong>Current Balance:</strong> {{ currentBalance }} {{ accountData.currency }}</p>
      <p><strong>Total Income:</strong> {{ totalIncome }} {{ accountData.currency }}</p>
      <p><strong>Total Expenses:</strong> {{ totalExpenses }} {{ accountData.currency }}</p>
    </div>
    <div v-else>
      <p>No account selected.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  props: {
    accountId: Number, // Assuming you pass the account ID as a prop
  },
  data() {
    return {
      accountData: null,
      totalIncome: 0,
      totalExpenses: 0,
      currentBalance: 0,
    };
  },
  created() {
    this.fetchAccountData();
  },
  methods: {
    async fetchAccountData() {
      // Replace with the actual API endpoint URL and account ID
      const accountUrl = `http://localhost:3000/accounts/${this.accountId}`;
      const incomeUrl = `http://localhost:3000/accounts/${this.accountId}/transactions/income`;
      const expensesUrl = `http://localhost:3000/accounts/${this.accountId}/transactions/expenses`;

      try {
        const accountResponse = await fetch(accountUrl);
        const incomeResponse = await fetch(incomeUrl);
        const expensesResponse = await fetch(expensesUrl);

        if (accountResponse.ok && incomeResponse.ok && expensesResponse.ok) {
          const accountData = await accountResponse.json();
          const incomeData = await incomeResponse.json();
          const expensesData = await expensesResponse.json();

          this.accountData = accountData;
          this.totalIncome = incomeData.totalIncome;
          this.totalExpenses = expensesData.totalExpenses;
          this.currentBalance = this.accountData.initialBalance + this.totalIncome - this.totalExpenses;
        }
      } catch (error) {
        console.error("There was an error fetching the account data:", error);
      }
    },
  },
};
</script>
