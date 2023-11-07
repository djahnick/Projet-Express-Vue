<template>
  <div>
    <line-chart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

export default {
  components: {
    LineChart,
  },
  props: {
    accountId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Solde Initial',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          data: [],
        },
        {
          label: 'Solde Actuel',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          data: [],
        },
        {
          label: 'Total Dépenses',
          backgroundColor: 'rgba(255, 255, 0, 0.5)',
          borderColor: 'rgb(255, 255, 0)',
          fill: false,
          data: [],
        },
        {
          label: 'Total Revenus',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
          data: [],
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false,
        },
      },
    });

    async function fetchAccountDetailsAndTransactions() {
      try {
        const accountId = props.accountId;

        const accountResponse = await axios.get(`http://localhost:3000/accounts/${accountId}`);
        const accountDetails = accountResponse.data;

        const transactionsResponse = await axios.get(`http://localhost:3000/accounts/${accountId}/transactions`);
        const transactions = transactionsResponse.data;

        // Tri des transactions par date
        transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

        updateChartData(accountDetails, transactions);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    }

    watchEffect(() => {
      if (props.accountId) {
        fetchAccountDetailsAndTransactions();
      }
    });

    function updateChartData(accountDetails, transactions) {
      chartData.value.labels = [];
      chartData.value.datasets[0].data = []; // Solde Initial
      chartData.value.datasets[1].data = []; // Solde Actuel
      
      let currentBalance = accountDetails.initialBalance;
      let totalExpenses = 0;
      let totalRevenues = 0;

      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.date).toLocaleDateString('fr-FR');
        const amount = transaction.amount;

        if (transaction.category.toLowerCase() === 'dépense') {
          totalExpenses += Math.abs(amount);
          currentBalance -= amount;
        } else if (transaction.category.toLowerCase() === 'revenu') {
          totalRevenues += amount;
          currentBalance += amount;
        }

        chartData.value.labels.push(transactionDate);
        chartData.value.datasets[0].data.push(accountDetails.initialBalance);
        chartData.value.datasets[1].data.push(currentBalance);
        chartData.value.datasets[2].data.push(totalExpenses);
        chartData.value.datasets[3].data.push(totalRevenues);
      });
    }

    return {
      chartData,
      chartOptions,
      fetchAccountDetailsAndTransactions,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>