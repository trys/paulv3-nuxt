<template>
  <center-page>
    <header>
      <h1>Confirming your account...</h1>
      <h3 v-if="error">{{ error }}</h3>
    </header>
  </center-page>
</template>

<script>
import centerPage from '@/components/center-page'
export default {
  data () {
    return {
      error: '',
      token: ''
    }
  },

  head() {
    return {
      title: 'Confirming your account'
    }
  },

  components: {
    centerPage
  },

  mounted () {
    setTimeout(this.confirm, 100)
  },

  methods: {
    confirm () {
      if (this.$store.state.auth === null) return setTimeout(this.confirm, 500)

      if (this.$route.hash && this.$route.hash.indexOf('#confirmation_token') === 0) {
        this.token = this.$route.hash.replace('#confirmation_token=', '')
        this.$store.state.auth.confirm(this.token, true).then(
          user => window.location.href = '/',
          error => {
            this.error = error.json.msg
            setTimeout(() => window.location.href = '/', 2000)
          }
        );

      } else {
        window.location.href = '/'
      }
    }
  }
}
</script>
