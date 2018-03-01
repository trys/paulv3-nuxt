<template>
  <div>
    <h1>Teams</h1>
    <teams-list :teams="teams" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import teamsList from '~/components/teams-list'

export default {
  async asyncData() {
    const { data } = await axios.get('/teams')
    return {
      teams: data
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