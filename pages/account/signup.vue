<template>
  <form method="POST" action="/account/signup/" @submit.prevent="signup">
    <h1>Sign up</h1>
    <h3 v-if="error">{{ error }}</h3>
    <label>Name: <br><input type="text" name="name" required></label><br>
    <label>Email: <br><input type="email" name="email" required></label><br>
    <label>Password: <br><input type="password" name="password" required></label><br>
    <button type="submit">Sign up</button>
  </form>
</template>

<script>
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

  methods: {
    login (event) {
      this.error = ''
      this.$store.state.auth.login(event.target.email.value, event.target.password.value, true).then(
        user => {
          this.$store.commit('addUser', user)
          window.location.href = '/'
        },
        error => {
          this.error = error.json.error_description
          event.target.password.value = ''
        }
      )
    }
  }
}
</script>
