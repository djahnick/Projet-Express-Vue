import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import AccountList from '@/components/AccountList.vue';
import AccountForm from '@/components/AccountForm.vue';
import AccountDetails from '@/views/AccountDetails.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts',
    name: 'AccountList',
    component: AccountList
  },
  {
    path: '/accountForm',
    name: 'AccountForm',
    component: AccountForm
  },
  {
    path: '/account/:id',
    name: 'AccountDetails',
    component: AccountDetails
  },
  // Ajoutez d'autres routes si nécessaire
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
