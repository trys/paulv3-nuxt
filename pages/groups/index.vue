<template>  
  <div class="page">
    <header class="page-header">
      <h1>Groups</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <div v-for="group in groups" :key="group[0].group">
        <h2>
          <nuxt-link :to="{ name: 'groups-id', params: { id: group[0].group } }">
            Group {{ group[0].group.toUpperCase() }}
          </nuxt-link>
        </h2>
        <teams-list :teams="group" :fixtures="fixtures" />
      </div>
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
      groups: teams.reduce((c, t) => {
        if (!c[t.group]) c[t.group] = []
        c[t.group].push(t)
        return c
      }, {}),
      fixtures
    }
  },

  head: {
    title: 'Groups'
  },

  components: {
    teamsList
  }
}
</script>