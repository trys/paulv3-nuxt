<template>
  
  <div class="page">
    <header class="page-header">
      <h1>{{ team.name }}</h1>
      <h2>
        <nuxt-link :to="{ name: 'groups-id', params: { id: team.group } }">
          Group {{ team.group.toUpperCase() }}
        </nuxt-link>
      </h2>
    </header>
    <div class="page-wrapper">
      <div
        v-for="fixture in fixtures"
        :key="fixture.id"
        class="fixture-date">
          <fixture-preview :fixture="fixture"/>
      </div>
    </div>
  </div>
</template>

<script>
import fixturePreview from '~/components/fixture'
export default {
  async asyncData({ params, store, payload}, callback) {
    let allFixtures
    let team

    if (payload) {
      allFixtures = payload.fixtures
      team = payload.team
    } else {
      const [teams, fixtures] = await Promise.all([
        store.dispatch('getTeams'),
        store.dispatch('getFixtures')
      ])

      allFixtures = fixtures
      team = teams.find(t => t.slug === String(params.id).substring(0, 15))
      if (!team) return callback({ statusCode: 404, message: 'Team not found' })
    }

    const fixtures = allFixtures.filter(f => f.team_one.id === team.id || f.team_two.id === team.id)
    fixtures.sort((a, b) => new Date(a.date) > new Date(b.date));
    return callback(null, { team, fixtures })
  },

  head() {
    return {
      title: `${this.team.name}`
    }
  },

  components: {
    fixturePreview
  }
}
</script>