<template>
  <div>
    <h1>Group {{ group }}</h1>
    <teams-list :teams="teams" />
    <nuxt-link :to="{ name: 'groups' }">&larr; go back</nuxt-link>
  </div>
</template>

<script>
import teamsList from '~/components/teams-list'
export default {
  async asyncData({ params, store }) {
    const teams = await store.dispatch('getTeams')
    return {
      teams: teams.filter(t => t.group === params.id),
      group: params.id.toUpperCase()
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
