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
      window.location.href = this.$store.state.auth.loginExternalUrl(this.provider)
    }
  }
}
</script>
