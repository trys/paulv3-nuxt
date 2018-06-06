<template>
  <center-page>
    <header>
      <h1>Reset your password</h1>
    </header>
    <no-ssr>
      <form v-if="showForm" method="POST" action="/account/password/" @submit.prevent="reset">
        <h3 v-if="error">{{ error }}</h3>
        <label>Password: <br><input type="password" name="password" required></label><br>
        <button class="button" type="submit">Reset</button>
      </form>
      <p v-else class="center">Loading...</p>
    </no-ssr>
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
      title: 'Reset your password'
    }
  },

  components: {
    centerPage
  },

  computed: {
    showForm () {
      return this.$store.state.user
    }
  },

  methods: {
    reset (event) {
      this.error = ''
      if (!event.target.password.value) return
      this.$store.state.user.update({ password: event.target.password.value }).then(
        user => window.location.href = '/',
        error => {
          console.log(error)
          this.error = error.json.error_description
          event.target.password.value = ''
        }
      );
    }
  }
}
</script>
