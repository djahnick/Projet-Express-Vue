<template>
  <!-- Ajoutez ceci dans votre template <template> dans App.vue ou un autre composant de layout -->
<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="#" class="flex">
      <!-- Logo et nom de la banque ici -->
      <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">MKDG Banque</span>
    </a>
    <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <!-- Icône pour le menu mobile -->
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          <router-link to="/" class="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Accueil</router-link>
        </li>
        <li>
          <router-link to="/accounts" class="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Comptes</router-link>
        </li>
       
        <li>
          <router-link to="/connexion" class="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Connexion</router-link>
        </li>
        <!-- Ajoutez d'autres liens de navigation si nécessaire -->
      </ul>
    </div>
  </div>
</nav>

  <div id="app">
    <router-view></router-view>
  </div>
  
</template>
