<template>
  <center-page>
    <header>
      <h1>Finish setting up your account</h1>
    </header>
    <form method="POST" action="/account/confirm/" @submit.prevent="confirm">
      <h3 v-if="error">{{ error }}</h3>
      <label>Password: <br><input type="password" name="password" required></label><br>
      <button class="button" type="submit">Set up account</button>
    </form>
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
      title: 'Finish setting up your account'
    }
  },

  components: {
    centerPage
  },

  methods: {
    confirm (event) {
      this.error = ''
      this.$store.state.auth.acceptInvite(this.token, event.target.password.value, true).then(
        user => window.location.href = '/',
        error => {
          console.log(error)
          this.error = error.json.error_description
          event.target.password.value = ''
        }
      );
    }
  },

  mounted () {
    if (this.$route.hash && this.$route.hash.indexOf('#invite_token') === 0) {
      this.token = this.$route.hash.replace('#invite_token=', '')
    } else {
      window.location.href = '/'
    }
  }
}
</script>
