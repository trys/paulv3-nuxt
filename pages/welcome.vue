<template>
  <center-page>
    <header>
      <h1>Welcome to Paul the Octopus</h1>
      <p>Get started with your predictions, or answer the challenges for some extra bonus points!</p>
      <nuxt-link :to="{ name: 'fixtures' }" class="button">Predict</nuxt-link>
      <nuxt-link :to="{ name: 'challenges' }" class="button">Challenges</nuxt-link>
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

<style scoped>
.button {
  letter-spacing: 2px;
  padding-right: 10px;
  padding-left: 10px;
}

p {
  margin-bottom: 30px;
}

.button + .button {
  margin-left: 10px;
}
</style>
