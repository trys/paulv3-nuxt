<template>
  <div>
    <site-menu />
    <nuxt />
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import GoTrue from 'gotrue-js';
  import SiteMenu from '~/components/menu'
  export default {
    async mounted () {
      const isLocal = document.location.host.split(":").shift() === 'localhost'
      const auth = new GoTrue({ APIUrl: 'https://paultheoctopus.netlify.com/.netlify/identity', setCookie: !isLocal });
      this.$store.commit('addAuth', auth)
      const user = this.$store.state.auth.currentUser()
      this.$store.commit('addUser', user)

      if (user) {
        try {
          const { data } = await axios.get('/predictions')
          data.forEach(prediction => this.$store.commit('addPrediction', prediction))
        } catch(e) {}
      }
    },

    components: {
      SiteMenu
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