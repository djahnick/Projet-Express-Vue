<template>
  <div class="container mx-auto px-4 py-10 mb-12">
    <div class="flex justify-center">
      <div class="w-full max-w-6xl">
        <div class="bg-blue-900 text-white shadow-xl rounded-xl p-8">
          <h1 class="text-4xl font-bold text-center mb-10">Bienvenue à MKDG Banque</h1>
          
          <!-- Autres sections ici... -->
          <!-- Vue d'ensemble des comptes -->
          <div class="mb-6">
            <router-link to="/accounts" class="block">
              <button class="w-full bg-white hover:bg-gray-200 text-blue-900 font-bold py-3 px-4 rounded transition ease-in-out duration-150">
                Voir les Comptes
              </button>
            </router-link>
          </div>
          
          <!-- Création d'un nouveau compte -->
          <div class="mb-6">
            <router-link to="/accountForm" class="block">
              <button class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition ease-in-out duration-150">
                Créer un Compte
              </button>
            </router-link>
          </div>

          <!-- Section des indices boursiers -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-center mb-4">Indices Boursiers</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(data, index) in chartDatasets" :key="index" class="p-4 bg-gray-700 rounded-lg">
                <h3 class="text-lg font-bold text-center mb-3">{{ data.label }}</h3>
                <line-chart :chart-data="createChartData(data)" :options="chartOptions"></line-chart>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  </div>
  
</template>


<script>
import { defineComponent, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { LineChart } from 'vue-chart-3';


Chart.register(...registerables);

export default defineComponent({
  name: 'HomePage',
  components: {
    LineChart
  },
  setup() {
    
   const chartDatasets = ref([
  {
    label: 'CAC 40',
    borderColor: '#42A5F5',
    data: [6900, 6950, 6920, 6880, 6905, 6930, 6910, 6940, 6960]
  },
  

  {
    label: 'Bitcoin (BTC)',
    borderColor: '#FFD700',
    data: [55000, 55500, 56000, 56500, 57000, 57500, 58000, 58500, 59000]
  },
  {
    label: 'XAU/USD',
    borderColor: '#FFA500',
    data: [1800, 1820, 1815, 1810, 1825, 1830, 1825, 1835, 1840]
  },
  {
    label: 'EUR/USD',
    borderColor: '#FF6347',
    data: [1.1500, 1.1550, 1.1525, 1.1510, 1.1555, 1.1560, 1.1555, 1.1570, 1.1580]
  },
  // Ajoutez d'autres indices boursiers au besoin
]);


    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    });

    function createChartData(dataset) {
      return {
        labels: ['9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
          {
            label: dataset.label,
            backgroundColor: dataset.borderColor,
            borderColor: dataset.borderColor,
            data: dataset.data,
            fill: false,
          }
        ]
      };
    }

    return {
      chartDatasets,
      chartOptions,
      createChartData,
      
    };
  },
  filters: {
    currency(value) {
      // Formatteur de monnaie simple
      return value.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' });
    }
  },
});
</script>
