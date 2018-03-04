<template>
  <div>
    <h1>{{ team.name }}</h1>
    <h2>Group {{ team.group.toUpperCase() }}</h2>
    <ol>
      <fixture-preview
        v-for="fixture in fixtures"
        :key="fixture.id"
        :fixture="fixture"
        :prediction="predictions.find(p => p.fixture.id === fixture.id)"
      ></fixture-preview>
    </ol>
    <nuxt-link :to="{ name: 'teams' }">&larr; go back</nuxt-link>
  </div>
</template>

<script>
import fixturePreview from '~/components/fixture'
export default {
  async asyncData({ params, store }, callback) {
    const [teams, allFixtures] = await Promise.all([
      store.dispatch('getTeams'),
      store.dispatch('getFixtures')
    ])
    const team = teams.find(t => t.slug === String(params.id).substring(0, 15))
    if (!team) return callback({ statusCode: 404, message: 'Team not found' })
    const fixtures = allFixtures.filter(f => f.team_one.id === team.id || f.team_two.id === team.id)
    return callback(null, { team, fixtures })
  },

  head() {
    return {
      title: `${this.team.name}`
    }
  },

  components: {
    fixturePreview
  },

  computed: {
    predictions () {
      return this.$store.state.predictions
    }
  }
}
</script>