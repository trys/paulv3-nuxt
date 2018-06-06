<template>
  <center-page>
    <header>
      <h1>Forgotten your password?</h1>
    </header>
    <form method="POST" action="/account/reset/" @submit.prevent="reset">
      <h3 v-if="error">{{ error }}</h3>
      <label>Email: <br><input type="email" name="email" required></label><br>
      <button class="button" type="submit">Send reset email</button>
    </form>
  </center-page>
</template>

<script>
import centerPage from '@/components/center-page'
export default {
  data () {
    return {
      error: ''
    }
  },

  head() {
    return {
      title: 'Forgotten your password?'
    }
  },

  components: {
    centerPage
  },

  methods: {
    reset (event) {
      this.error = ''
      this.$store.state.auth.requestPasswordRecovery(event.target.email.value).then(
        user => window.location.href = '/account/reset-thanks/',
        error => {
          this.error = error.json.error_description
          event.target.password.value = ''
        }
      )
    }
  }
}
</script>
