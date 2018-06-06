<template>
  <center-page>
    <header>
      <h1>Password reset email sent</h1>
      <p>Check your inbox and click the link.</p><br>
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
