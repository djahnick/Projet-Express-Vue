<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold text-center my-6">Liste des Comptes</h2>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <!-- ... (le reste de votre code) ... -->
              <thead class="bg-blue-800">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nom du Compte
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Solde
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Devise
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Voir les détails</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="account in accounts" :key="account.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <i class="fa fa-user-circle text-xl text-gray-500 mr-2"></i> <!-- Icône d'utilisateur -->
                      <div class="text-sm font-medium text-gray-900">
                        {{ account.accountName }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ account.balance }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {{ account.currency }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <router-link :to="`/account/${account.id}`" class="text-indigo-600 hover:text-indigo-900">Voir</router-link>
                    <button @click="deleteAccount(account.id)" class="ml-4 text-red-600 hover:text-red-900">Supprimer</button>

                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'AccountList',
  data() {
    return {
      accounts: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/accounts');
      this.accounts = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des comptes', error);
    }
  },
  methods: {
    async deleteAccount(accountId) {
      try {
        await axios.delete(`http://localhost:3000/accounts/${accountId}`);
        this.accounts = this.accounts.filter(account => account.id !== accountId);
      } catch (error) {
        console.error('Erreur lors de la suppression du compte', error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles supplémentaires pour la personnalisation de la table, si nécessaire */
</style>