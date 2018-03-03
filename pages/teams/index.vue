<template>
  <div>
    <h1>Teams</h1>
    <teams-list :teams="teams" />
  </div>
</template>

<script>

import teamsList from '~/components/teams-list'

export default {
  async asyncData({ store }) {
    return {
      teams: await store.dispatch('getTeams')
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