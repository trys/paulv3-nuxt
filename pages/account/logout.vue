<template>
  <center-page>
    <header>
      <h1>Logging out...</h1>
    </header>
  </center-page>
</template>

<script>
import centerPage from '@/components/center-page'
export default {
  head() {
    return {
      title: 'Logout'
    }
  },

  components: {
    centerPage
  },

  mounted () {
    if (!this.$store.state.user) return window.location.href = '/account/login'

    this.$store.state.user.logout().then(
      response => window.location.href = '/account/login',
      error => window.location.href = '/account/login'
    );
  }
}
</script>
