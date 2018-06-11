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
      <label>Username: <br><input class="input-text" type="text" autocomplete="off" name="username" required></label><br>
      <label>Email: <br><input type="email" name="email" autocomplete="email" required></label><br>
      <label>Password: <br><input type="password" name="password" autocomplete="off" required></label><br>
      <label>Confirm Password: <br><input type="password" name="confirm_password" autocomplete="off" required></label><br>
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
      
      const pw = event.target.password
      const cpw = event.target.confirm_password

      if (!pw.value || !cpw.value || pw.value !== cpw.value) {
        this.error = 'Check both passwords match'
        cpw.value = ''
        return
      }

      this.$store.state.auth.signup(
        event.target.email.value,
        pw.value,
        { full_name: event.target.username.value }
      ).then(
        response => {
          window.location.href = '/account/thank-you'
        },
        error => {
          this.error = error.json.msg
          if (this.error === 'Failed to handle signup webhook') {
            event.target.username.value = ''
            this.error = 'Someone with that username already exists'
          }
          pw.value = ''
          cpw.value = ''
        }
      )
    },

    trackSignup () {
      localStorage.setItem('providerSignup', true)
    }
  }
}
</script>
