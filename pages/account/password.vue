<template>
  <center-page>
    <header>
      <h1>Reset your password</h1>
    </header>
    <div class="center">
      <h3 v-if="error">Error: {{ error }}</h3>
      <p v-else>Loading...</p>
    </div>
  </center-page>
</template>

<script>
import centerPage from '@/components/center-page'
export default {
  data () {
    return {
      error: '',
      token: '',
      showForm: false
    }
  },

  head() {
    return {
      title: 'Reset your password'
    }
  },

  components: {
    centerPage
  },

  mounted () {
    if (this.$route.hash && this.$route.hash.indexOf('#recovery_token') === 0) {
      this.token = this.$route.hash.replace('#recovery_token=', '')
      this.$store.state.auth
        .recover(this.token)
        .then(response =>
          this.$router.push('/account/set-password')
        )
        .catch(error => {
          this.error = error.json.msg
        });
    } else {
      window.location.href = '/'
    }
  }
}
</script>
