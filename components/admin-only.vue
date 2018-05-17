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
      const user = this.$store.state.user
      if (!user || !user.app_metadata || !user.app_metadata.roles || !user.app_metadata.roles.length) return false
      return user && user.app_metadata.roles[0] === "FullAdmin"
    }
  }
}
</script>
