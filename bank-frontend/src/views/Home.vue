<template>
  <div>
    <h1>Bienvenue dans l'application Bancaire</h1>
    <router-link to="/accounts">Voir les Comptes</router-link>

    <!-- Ajoutez le bouton ci-dessous -->
    <button @click="goToCreateAccount">Créer un Nouveau Compte</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    goToCreateAccount() {
      // Redirection vers la route de création de compte
      this.$router.push({ name: 'CreateAccount' });
    }
  }
};
</script>

<style scoped>
/* Votre CSS */
</style>
