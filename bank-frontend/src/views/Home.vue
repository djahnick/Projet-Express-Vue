<template>
  <div class="container mx-auto px-4 py-10">
    <div class="flex justify-center">
      <div class="w-full max-w-2xl">
        <div class="bg-white shadow-xl rounded-xl p-8">
          <h1 class="text-4xl font-bold text-center mb-10 text-gray-800">Bienvenue à MKDG Banque</h1>
          
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
          
          <!-- Gestion de profil -->
          <div class="mb-6">
            <router-link to="/profile" class="block">
              <button class="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-4 rounded transition ease-in-out duration-150">
                Gérer le Profil
              </button>
            </router-link>
          </div>

          <!-- Les dernières transactions -->
          <div>
            <router-link to="/transactions" class="block">
              <button class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded transition ease-in-out duration-150">
                Voir les Dernières Transactions
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
/* Les styles personnalisés peuvent être ajoutés ici si nécessaire */
</style>
