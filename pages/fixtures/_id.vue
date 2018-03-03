<template>
  <div>
    <h1>{{ fixture.team_one.name }} vs. {{ fixture.team_two.name }}</h1>
    <h2>Kickoff: {{ gametime }}</h2>
    <nuxt-link :to="{ name: 'fixtures' }">&larr; go back</nuxt-link>
  </div>
</template>

<script>
import { formatDateTime } from '~/plugins/time'
export default {
  async asyncData({ params, store }, callback) {
    const fixtures = await store.dispatch('getFixtures')
    const fixture = fixtures.find(f => String(f.id) === String(params.id))
    if (!fixture) return callback({ statusCode: 404, message: 'Fixture not found' })
    else return callback(null, { fixture })
  },

  head() {
    return {
      title: `${this.fixture.team_one.name} vs. ${this.fixture.team_two.name}`
    }
  },

  computed: {
    gametime () {
      return formatDateTime(this.fixture.date)
    }
  }
}
</script>