<template>
  <div>
    <h1>{{ fixture.team_one.name }} vs. {{ fixture.team_two.name }}</h1>
    <nuxt-link :to="{ name: 'fixtures' }">&larr; go back</nuxt-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`/fixtures/${params.id}`)
    return {
      fixture: data
    }
  },

  head() {
    return {
      title: `${this.fixture.team_one.name} vs. ${this.fixture.team_two.name}`
    }
  }
}
</script>