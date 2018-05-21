<template>
  <no-ssr>
    <p-user v-if="$store.state.user" />
    <div
      v-else
      class="page"
    >
      <div class="page-wrapper page-wrapper--padded form-style">
        <nuxt-link :to="{ name: 'account-signup' }">Sign up</nuxt-link> or <nuxt-link :to="{ name: 'account-login' }">Login</nuxt-link> to view this profile.
      </div>
    </div>
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

