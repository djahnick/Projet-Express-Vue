import axios from 'axios';

export default (await import('vue')).defineComponent({
name: 'AccountList',
data() {
return {
accounts: []
};
},
async created() {
try {
const response = await axios.get('http://localhost:3000/accounts/accounts');
this.accounts = response.data;
} catch (error) {
console.error('Erreur lors de la récupération des comptes', error);
}
},
});
