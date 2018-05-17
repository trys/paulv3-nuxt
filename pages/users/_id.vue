<template>
  <no-ssr>
    <p-user v-if="$store.state.user" />
  </no-ssr>
</template>

<script>
import PUser from '~/components/user'
export default {
  components: {
    PUser
  },

  head: {
    title: 'User'
  }
}
</script>

