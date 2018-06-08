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
        .recover(this.token, true)
        .then(response => {
          const user = this.$store.state.auth.currentUser()
          if (user) {
            user.jwt().then(() => {
              this.$store.commit('addUser', user)
              setTimeout(() => {
                this.$router.push('/account/set-password')
              }, 100)
            })
          }
        })
        .catch(error => {
          this.error = error.json.msg
        });
    } else {
      window.location.href = '/'
    }
  }
}
</script>
