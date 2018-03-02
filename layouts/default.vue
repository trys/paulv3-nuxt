<template>
  <div>
    <header>
      <h1 @click="$router.push('/')">Nuxt static</h1>
      <nuxt-link :to="{ name: 'index' }">Home</nuxt-link> | 
      <nuxt-link :to="{ name: 'teams' }">Teams</nuxt-link> | 
      <nuxt-link :to="{ name: 'groups' }">Groups</nuxt-link> | 
      <nuxt-link :to="{ name: 'table' }">Table</nuxt-link> | 
      <nuxt-link :to="{ name: 'fixtures' }">Fixtures</nuxt-link> | 
      <nuxt-link v-if="!$store.state.user" :to="{ name: 'account-login' }">Login</nuxt-link>
      <nuxt-link v-else :to="{ name: 'account-logout' }">Logout</nuxt-link> |
      <nuxt-link v-if="!$store.state.user" :to="{ name: 'account-signup' }">Sign up</nuxt-link>
    </header>
    <nuxt></nuxt>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import GoTrue from 'gotrue-js';
  export default {
    async mounted () {
      const isLocal = document.location.host.split(":").shift() === 'localhost'
      const auth = new GoTrue({ APIUrl: 'https://paultheoctopus.netlify.com/.netlify/identity', setCookie: !isLocal });
      this.$store.commit('addAuth', auth)
      const user = this.$store.state.auth.currentUser()

      if (user) {
        this.$store.commit('addUser', user)
        try {
          const { data } = await axios.get('/predictions')
          data.forEach(prediction => this.$store.commit('addPrediction', prediction))
        } catch(e) {}
      }
    }
  }
</script>

<style>
* {
  box-sizing: border-box;
}

h1 {
  cursor: pointer;
}

body {
  padding: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>