<template>
  <button type="button" @click="loginWithGoogle">{{ label }}</button>
</template>

<script>
export default {
  props: {
    provider: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: () => 'Login with Google'
    }
  },

  methods: {
    loginWithGoogle () {
      const url = this.$store.state.auth.loginExternalUrl(this.provider)
      const url2 = this.$store.state.auth.acceptInviteExternalUrl(this.provider, 123)
      window.location.href = url
    }
  }
}
</script>
