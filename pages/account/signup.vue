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
    signup (event) {
      this.error = ''
      this.$store.state.auth.signup(
        event.target.email.value,
        event.target.password.value,
        { full_name: event.target.name.value }
      ).then(
        response => {
          window.location.href = '/'
        },
        error => {
          this.error = error.json.msg
          event.target.password.value = ''
        }
      )
    }
  }
}
</script>
