<template>
  <div>
    <header>
      <h1 @click="$router.push('/')">Nuxt static</h1>
      <nuxt-link to="/">Home</nuxt-link> | 
      <nuxt-link to="/teams">Teams</nuxt-link> | 
      <nuxt-link to="/groups">Groups</nuxt-link> | 
      <nuxt-link to="/fixtures">Fixtures</nuxt-link>
    </header>
    <nuxt></nuxt>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    async mounted () {
      const { data } = await axios.get('/predictions')
      data.forEach(prediction => this.$store.commit('addPrediction', prediction))
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