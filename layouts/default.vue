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
  const url = 'https://paultheoctopus.netlify.com'
  export default {
    async mounted () {
      const isLocal = document.location.host.split(':').shift() === 'localhost'
      const auth = new GoTrue({ APIUrl: url + '/.netlify/identity', setCookie: !isLocal });
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
          Cookies.set('nf_jwt', user.token.access_token, { expires: 1, secure: true });
          window.location.href = '/'
        })
        .catch(console.error)
      }

      const user = this.$store.state.auth.currentUser()
      this.$store.commit('addUser', user)
      if (user) {
        user.jwt().then(async (token) => {
          console.log(token)
          try {
            const { data } = await axios.get('predictions', {
              headers: {
                authorization: 'Bearer ' + token
              }
            })
            data.predictions.forEach(prediction => this.$store.commit('addPrediction', prediction))
          } catch(e) {}
        }).catch(console.error);
      }

    },

    components: {
      SiteMenu
    }
  }
</script>

<style>
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  background: #F56969;
  margin: 0;
  color: #FFF;
  font: 16px /1.4 'Avenir';
}

h1 {
  font-size: 1.5em;
  margin: 0 0 30px;
}

h2 {
  font-size: 1.125em;
  margin: 0 0 20px;
}

h3, h4, h5 {
  margin: 0 0 20px;
}

a {
  text-decoration: none;
  color: inherit;
}

.button {
  background: #FFF;
  border: 2px solid #F56969;
  color: #F56969;
  font-size: 12px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  padding: 0.9em 1.1em 0.8em 1.6em;
  border-radius: 2em;
  font-weight: 700;
  transition: 300ms color, 300ms background;
  text-align: center;
  cursor: pointer;
}

.button:hover {
  background: #F56969;
  color: #FFF;
}

ol,
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>