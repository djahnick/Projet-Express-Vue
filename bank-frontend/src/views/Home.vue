<template>
  <div class="container mx-auto px-4 py-10">
    <div class="flex justify-center">
      <div class="w-full max-w-6xl">
        <div class="bg-white shadow-xl rounded-xl p-8">
          <h1 class="text-4xl font-bold text-center mb-10 text-gray-800">Bienvenue à MKDG Banque</h1>
          
          <!-- Autres sections ici ... -->
 <!-- Vue d'ensemble des comptes -->
 <div class="mb-6">
            <router-link to="/accounts" class="block">
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition ease-in-out duration-150">
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
            <h2 class="text-2xl font-bold text-center mb-4 text-gray-700">Indices Boursiers</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(data, index) in chartDatasets" :key="index" class="p-4 bg-gray-100 rounded-lg">
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
        label: 'S&P 500',
        borderColor: '#9CCC65',
        data: [4350, 4380, 4370, 4360, 4385, 4390, 4385, 4395, 4400]
      },
      // Ajoutez d'autres objets pour chaque indice boursier que vous voulez montrer
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

<style scoped>
/* Votre style personnalisé ici */
.grid-cols-1 {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-4 {
  padding: 1rem;
}
</style>
