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

<style scoped>
[type="button"] {
  background: #F2F2F2;
  padding: 0.6em 1.5em;
  border: 1px solid #E2E2E2;
  font: inherit;
  color: #777;
  cursor: pointer;
  margin: 0 0 1rem;
  font-size: 14px;
}
</style>
