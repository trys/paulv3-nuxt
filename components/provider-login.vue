<template>
  <button type="button" @click="login">{{ label }}</button>
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
    },
    appId: {
      type: String
    }
  },

  methods: {
    login () {
      window.location.href = this.$store.state.auth.loginExternalUrl(this.provider)
    }
  }
}
</script>
