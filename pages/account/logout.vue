<template>
  <div>
    <h1>Logging out...</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Logout'
    }
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
