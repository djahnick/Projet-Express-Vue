<template>
  <div v-if="isEditing" class="fixed inset-0 bg-black bg-opacity-50 h-full w-full flex justify-center items-center">
      <div class="bg-white p-4 rounded-lg">
          <form @submit.prevent="updateTransaction">
              <!-- Formulaire pour modifier la transaction -->
              <div>
                  <label for="edit-description" class="block text-sm font-medium text-gray-700">Description</label>
                  <input type="text" id="edit-description" v-model="transactionToEdit.description" class="mt-1 block w-full" required />
              </div>
              <div class="mt-4">
                  <label for="edit-amount" class="block text-sm font-medium text-gray-700">Montant</label>
                  <input type="number" id="edit-amount" v-model="transactionToEdit.amount" class="mt-1 block w-full" required />
              </div>
              <div class="mt-4">
                  <label for="edit-date" class="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" id="edit-date" v-model="transactionToEdit.date" class="mt-1 block w-full" required />
              </div>
              <div class="mt-4 flex justify-end space-x-2">
                  <button type="button" @click="isEditing = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                      Annuler
                  </button>
                  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Sauvegarder
                  </button>
              </div>
          </form>
      </div>
  </div>

 
  <div class="container mx-auto p-4">
  <ul v-if="transactions.length" class="bg-blue-900 shadow-md rounded-lg overflow-hidden">
    <li v-for="transaction in transactions" :key="transaction.id" class="px-6 py-4 border-b border-gray-700 hover:bg-gray-800">
      <div class="flex justify-between items-center">
        <!-- Section pour Revenus -->
        <div v-if="transaction.category === 'revenu'" class="flex items-center space-x-4">
          <span class="p-2 inline-flex items-c enter justify-center text-green-400">
            <i class="fas fa-arrow-down"></i>
          </span>
          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-300">Revenu</p>
            <p class="text-gray-200">{{ transaction.description }}</p>
            <p class="text-gray-400 text-xs">{{ formatDate(transaction.date) }}</p>
          </div>
          <span class="text-green-400 font-semibold">{{ formatAmount(transaction.amount) }}</span>
          <button @click="deleteTransaction(accountId, transaction.id)" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            <i class="fas fa-trash"></i>          </button>
          <button @click="editTransaction(transaction)" class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
            <i class="fas fa-edit"></i> 

          </button>
        </div>

        <div v-else class="flex-1"></div>

        <!-- Section pour Dépenses -->
        <div v-if="transaction.category === 'dépense'" class="flex items-center justify-end space-x-4">
          <span class="text-red-400 font-semibold">{{ formatAmount(transaction.amount) }}</span>
          <div class="flex-1 text-right">
            <p class="text-sm font-semibold text-gray-300">Dépense</p>
            <p class="text-gray-200">{{ transaction.description }}</p>
            <p class="text-gray-400 text-xs">{{ formatDate(transaction.date) }}</p>
          </div>
          <span class="p-2 inline-flex items-center justify-center text-red-400">
            <i class="fas fa-arrow-up"></i>
          </span>
          <button @click="deleteTransaction(accountId, transaction.id)" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            <i class="fas fa-trash"></i>          </button>
          <button @click="editTransaction(transaction)" class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
            <i class="fas fa-edit"></i> 
          </button>
        </div>

        <div v-else class="text-red-400"></div>
      </div>
    </li>
  </ul>
  <div v-else class="text-center py-4 text-white">
    <p>Aucune transaction disponible.</p>
  </div>
</div>

</template>

<script>
  import axios from "axios";
  

  export default {
      name: "TransactionList",
      props: {
          accountId: {
              type: Number,
              required: true,
          },
      },
      data() {
          return {
              transactions: [],
              isEditing: false,
              transactionToEdit: null,
          };
      },
      watch: {
          accountId: {
              immediate: true,
              handler() {
                  this.fetchTransactions();
              },
          },
      },
      methods: {
          async fetchTransactions() {
              try {
                  const response = await axios.get(`http://localhost:3000/accounts/${this.accountId}/transactions`);
                  this.transactions = response.data;
              } catch (error) {
                  console.error("Erreur lors de la récupération des transactions", error);
              }
          },
          formatDate(date) {
              return new Date(date).toLocaleDateString("fr-FR");
          },
          formatAmount(amount) {
              return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount);
          },
          async deleteTransaction(accountId, transactionId) {
              if (confirm("Are you sure you want to delete this transaction?")) {
                  try {
                      await axios.delete(`http://localhost:3000/accounts/${accountId}/transactions/${transactionId}`);
                      this.transactions = this.transactions.filter((t) => t.id !== transactionId);
                      this.$emit("transaction-deleted"); // Emitting an event after transaction deletion
                  } catch (error) {
                      console.error("Erreur lors de la suppression de la transaction", error);
                  }
              }
          },
          async updateTransaction() {
              try {
                  const accountId = this.accountId;
                  const transactionId = this.transactionToEdit.id;
                  const response = await axios.put(`http://localhost:3000/accounts/${accountId}/transactions/${transactionId}`, this.transactionToEdit);

                  const updatedTransaction = response.data;

                  // Find the index of the updated transaction in the transactions array
                  const index = this.transactions.findIndex((t) => t.id === updatedTransaction.id);

                  // Replace the old transaction with the updated one
                  if (index !== -1) {
                      this.transactions[index] = updatedTransaction;
                  }

                  // Close the editing form
                  this.isEditing = false;
              } catch (error) {
                  console.error("Erreur lors de la mise à jour de la transaction", error);
              }
          },
          editTransaction(transaction) {
              this.transactionToEdit = { ...transaction }; // Make a copy of the transaction to edit
              this.isEditing = true; // Set editing mode to true
          },
      },
  };
</script>

<style scoped>
  /* Tailwind classes are handling all the styling needs. If you have custom styles, you can add them here */
</style>
