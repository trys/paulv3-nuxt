<template>
  <div class="page">
    <header class="page-header">
      <h1>Teams</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <p-populate />
      <teams-list :teams="teams" :fixtures="fixtures" />
    </div>
  </div>
</template>

<script>
import teamsList from '~/components/teams-list'
import pPopulate from '~/components/populate'
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

  head () {
    return {
      title: 'Teams',
      meta: [
        { property: 'og:url', content: `https://paultheoctop.us${this.$route.path}` },
        { property: 'og:title', content: 'Teams | Paul the Octopus' },
        { name: 'twitter:title', content: 'Teams | Paul the Octopus' }
      ]
    }
  },

  components: {
    teamsList,
    pPopulate
  }
}
</script>