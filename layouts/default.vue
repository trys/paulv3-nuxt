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
  import Cookies from 'js-cookie'
  export default {
    async mounted () {
      const isLocal = document.location.host.split(":").shift() === 'localhost'
      const auth = new GoTrue({ APIUrl: 'https://paultheoctopus.netlify.com/.netlify/identity', setCookie: !isLocal });
      this.$store.commit('addAuth', auth)

      if (this.$route.hash.indexOf('#access_token') === 0) {
        const hash = this.$route.hash.replace('#', '')
        const options = {}
        hash.split('&').forEach((p) => {
          const [k, v] = p.split('=')
          options[k] = v
        })
        document.location.hash = ''

        await this.$store.state.auth.createUser(options, true)
        .then((user) => {
          Cookies.set('nf_jwt', user.token.access_token, { expires: 1 });
          this.$store.commit('addUser', user)
        })
        .catch(error => console.error(error))
      }

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