<template>
  <div>
    <h1>
      <nuxt-link :to="{ name: 'teams-id', params: { id: fixture.team_one.slug } }">{{ fixture.team_one.name }}</nuxt-link>
       vs. <nuxt-link :to="{ name: 'teams-id', params: { id: fixture.team_two.slug } }">{{ fixture.team_two.name }}</nuxt-link></h1>
    <h2>Kickoff: {{ gametime }}</h2>
    <nuxt-link :to="{ name: 'fixtures' }">&larr; go back</nuxt-link>
    <br>
    <nuxt-link :to="{ name: 'fixtures-id-edit', params: { id: fixture.id } }">edit &rarr;</nuxt-link>
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