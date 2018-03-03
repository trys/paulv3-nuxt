<template>
  <header role="banner">
    <h1><nuxt-link :to="{ name: 'index' }">Paul the Octopus</nuxt-link></h1>
    <nuxt-link :to="{ name: 'teams' }">Teams</nuxt-link> 
    <nuxt-link :to="{ name: 'groups' }">Groups</nuxt-link>
    <nuxt-link :to="{ name: 'table' }">Table</nuxt-link>
    <nuxt-link :to="{ name: 'fixtures' }">Fixtures</nuxt-link>
    <template v-if="user !== false">
      <nuxt-link v-if="!user" :to="{ name: 'account-login' }">Login</nuxt-link>
      <nuxt-link v-if="!user" :to="{ name: 'account-signup' }">Sign up</nuxt-link>
      <nuxt-link v-else :to="{ name: 'account-logout' }">Logout</nuxt-link>
    </template>
  </header>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
  [role="banner"] a + a {
    margin-left: 20px;
  }
</style>
