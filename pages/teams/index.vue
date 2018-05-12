<template>
  <div class="page">
    <header class="page-header">
      <h1>Teams</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <teams-list :teams="teams" :fixtures="fixtures" />
    </div>
  </div>
</template>

<script>
import teamsList from '~/components/teams-list'
export default {
  async asyncData({ store }) {
    const [teams, fixtures] = await Promise.all([
      store.dispatch('getTeams'),
      store.dispatch('getFixtures')
    ])

    return {
      teams,
      fixtures
    }
  },

  head: {
    title: 'Teams'
  },

  components: {
    teamsList
  }
}
</script>