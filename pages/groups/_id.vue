<template>
  <div>
    <h1>Group {{ group }}</h1>
    <teams-list :teams="teams" />
    <nuxt-link :to="{ name: 'groups' }">&larr; go back</nuxt-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import teamsList from '~/components/teams-list'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`/teams`)
    return {
      teams: data.filter(t => t.group === params.id),
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
