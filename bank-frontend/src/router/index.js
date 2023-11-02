import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import AccountList from '@/components/AccountList.vue';
import CreateAccountForm from '@/components/CreateAccountForm.vue';
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
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccountForm
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
