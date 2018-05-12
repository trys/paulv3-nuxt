<template>  
  <div class="page">
    <header class="page-header">
      <h1>Group {{ group }}</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <teams-list :teams="teams" :fixtures="fixtures" />
    </div>
  </div>
</template>

<script>
import teamsList from '~/components/teams-list'
export default {
  async asyncData({ params, store }) {
    const [teams, fixtures] = await Promise.all([
      store.dispatch('getTeams'),
      store.dispatch('getFixtures')
    ])

    return {
      teams: teams.filter(t => t.group === params.id),
      group: params.id.toUpperCase(),
      fixtures
    }
  },

  head() {
    return {
      title: `Group ${this.group}`
    }
  },

  components: {
    teamsList
  }
}
</script>
