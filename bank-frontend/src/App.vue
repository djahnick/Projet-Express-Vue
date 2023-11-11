<template>
  <nav class="bg-blue-900 border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="#" class="flex">
        <span class="self-center text-lg font-semibold whitespace-nowrap text-white">MKDG Banque</span>
      </a>
      <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-300 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <router-link to="/" class="block py-2 pr-4 pl-3 text-gray-300 rounded md:bg-transparent md:text-gray-300 md:p-0" aria-current="page">Accueil</router-link>
          </li>
          <li>
            <router-link to="/accounts" class="block py-2 pr-4 pl-3 text-gray-300 rounded md:bg-transparent md:text-gray-300 md:p-0">Comptes</router-link>
          </li>
          <li>
            <router-link to="/connexion" class="block py-2 pr-4 pl-3 text-gray-300 rounded md:bg-transparent md:text-gray-300 md:p-0">Connexion</router-link>
          </li>
          <!-- Ajoutez d'autres liens de navigation si nécessaire -->
        </ul>
      </div>
    </div>
  </nav>

  <div id="app">
    <router-view></router-view>
  </div>
  <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-blue-900 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
    <span class="text-sm text-white sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline text-gray-300">DJAHNICK GENE </a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
        <li>
            <a href="#" class="hover:underline text-gray-300 me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" class="hover:underline text-gray-300 me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline text-gray-300 me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline text-gray-300">Contact</a>
        </li>
    </ul>
  </footer>
</template>
