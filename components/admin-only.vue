<template>
  <no-ssr>
    <div v-if="active">
      <slot />
    </div>
  </no-ssr>
</template>

<script>
export default {
  computed: {
    active () {
      if (!this.$store.state.user) return false
      return this.$store.state.user.app_metadata.roles[0] === "FullAdmin"
    }
  }
}
</script>
