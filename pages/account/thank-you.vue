<template>
  <center-page>
    <header>
      <h1>Thank you for signing up</h1>
      <p>We've sent you a confirmation email. Please visit your inbox and click the link</p>
      <nuxt-link :to="{ name: 'index' }" class="button">Home</nuxt-link>
    </header>
  </center-page>  
</template>

<script>
import centerPage from '@/components/center-page'
export default {
  head() {
    return {
      title: 'Thank you'
    }
  },

  components: {
    centerPage
  }
}
</script>
