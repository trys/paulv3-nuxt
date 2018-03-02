<template>
  <div>
    <h1>Confirming your account...</h1>
    <h3 v-if="error">{{ error }}</h3>
  </div>
</template>

<script>
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
