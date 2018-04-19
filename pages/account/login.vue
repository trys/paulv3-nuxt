<template>
  <center-page>
    <header>
      <provider-login provider="google" />
      <br>
      - or -
      <br>
      <h1>Login</h1>
    </header>
    <form method="POST" action="/account/login/" @submit.prevent="login">
      <h3 v-if="error">{{ error }}</h3>
      <label>Email: <br><input type="email" name="email" required></label><br>
      <label>Password: <br><input type="password" name="password" required></label><br>
      <button class="button" type="submit">Login</button>
    </form>
  </center-page>
</template>

<script>
import centerPage from '@/components/center-page'
import providerLogin from '@/components/provider-login'
export default {
  data () {
    return {
      error: ''
    }
  },

  head() {
    return {
      title: 'Login'
    }
  },

  components: {
    providerLogin,
    centerPage
  },

  methods: {
    login (event) {
      this.error = ''
      this.$store.state.auth.login(event.target.email.value, event.target.password.value, true).then(
        user => window.location.href = '/',
        error => {
          this.error = error.json.error_description
          event.target.password.value = ''
        }
      )
    }
  }
}
</script>
