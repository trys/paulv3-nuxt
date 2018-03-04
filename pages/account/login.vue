<template>
  <div>
    <br>
    <provider-login provider="google" />
    <br>
    - or -
    <form method="POST" action="/account/login/" @submit.prevent="login">
      <h1>Login</h1>
      <h3 v-if="error">{{ error }}</h3>
      <label>Email: <br><input type="email" name="email" required></label><br>
      <label>Password: <br><input type="password" name="password" required></label><br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import providerLogin from '~/components/provider-login'
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
    providerLogin
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
