<template>
  <div class="transfer-funds container mx-auto p-6 bg-blue-900 text-white shadow-md rounded">
    <h1 class="text-2xl font-bold mb-6">Transférer des fonds</h1>
    <form @submit.prevent="submitTransfer" class="space-y-4">
      <div class="input-group">
        <label for="fromAccount" class="block mb-2 text-sm font-medium">De Compte ID:</label>
        <div class="flex items-center border border-gray-300 rounded">
          <span class="px-3"><i class="fas fa-user-circle"></i></span>
          <input type="number" id="fromAccount" v-model.number="transferDetails.fromAccountId" required
                 class="w-full p-2 bg-transparent rounded">
        </div>
      </div>
      <div class="input-group">
        <label for="toAccount" class="block mb-2 text-sm font-medium">À Compte ID:</label>
        <div class="flex items-center border border-gray-300 rounded">
          <span class="px-3"><i class="fas fa-user-circle"></i></span>
          <input type="number" id="toAccount" v-model.number="transferDetails.toAccountId" required
                 class="w-full p-2 bg-transparent rounded">
        </div>
      </div>
      <div class="input-group">
        <label for="amount" class="block mb-2 text-sm font-medium">Montant:</label>
        <div class="flex items-center border border-gray-300 rounded">
          <span class="px-3"><i class="fas fa-euro-sign"></i></span>
          <input type="number" id="amount" v-model.number="transferDetails.amount" required min="1"
                 class="w-full p-2 bg-transparent rounded">
        </div>
      </div>
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
        Transférer
      </button>
      <div v-if="error" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

  
  <script>
  // Assurez-vous que vous avez importé et configuré Flowbite si vous utilisez ses composants.
  import axios from 'axios';
  
  export default {
    name: 'TransferFunds',
    data() {
      return {
        transferDetails: {
          fromAccountId: null,
          toAccountId: null,
          amount: null
        },
        error: false,
        errorMessage: ''
      };
    },
    methods: {
      async submitTransfer() {
        this.error = false;
        try {
          const response = await axios.post('http://localhost:3000/transfer', this.transferDetails);
          console.log('Transfer successful', response);
          this.transferDetails = { fromAccountId: null, toAccountId: null, amount: null };
        } catch (error) {
          console.error('Erreur lors du transfert des fonds', error);
          this.error = true;
          this.errorMessage = error.response?.data || 'Une erreur est survenue lors du transfert des fonds. Veuillez réessayer.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Avec Tailwind, vous pourriez ne pas avoir besoin de styles supplémentaires ici */
  </style>
  