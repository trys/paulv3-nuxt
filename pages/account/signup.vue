<template>
  <center-page>
    <header>
      <provider-login provider="google" @click="trackSignup" label="Sign up with Google" />
      <br>
      - or -
      <br>
      <h1>Sign up</h1>
    </header>
    <form method="POST" action="/account/signup/" @submit.prevent="signup" autocomplete="off">
      <h3 v-if="error">{{ error }}</h3>
      <label>Username: <br><input type="text" name="name" required></label><br>
      <label>Email: <br><input type="email" name="email" required></label><br>
      <label>Password: <br><input type="password" name="password" required></label><br>
      <button class="button" type="submit">Sign up</button>
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
      title: 'Sign up'
    }
  },

  components: {
    centerPage,
    providerLogin
  },

  methods: {
    signup (event) {
      this.error = ''
      this.$store.state.auth.signup(
        event.target.email.value,
        event.target.password.value,
        { full_name: event.target.name.value }
      ).then(
        response => {
          window.location.href = '/account/thank-you'
        },
        error => {
          this.error = error.json.msg
          if (this.error === 'Failed to handle signup webhook') {
            event.target.name.value = ''
            this.error = 'Someone with that username already exists'
          }
          event.target.password.value = ''
        }
      )
    },

    trackSignup () {
      localStorage.setItem('providerSignup', true)
    }
  }
}
</script>
