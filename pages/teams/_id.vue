<template>
  <div>
    <h1>{{ team.name }}</h1>
    <h2>Group {{ team.group.toUpperCase() }}</h2>
    <nuxt-link to="/teams">&larr; go back</nuxt-link>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData({ params }, callback) {
    const { data } = await axios.get(`/teams`)
    const team = data.find(t => t.slug === params.id)
    if (team === -1) return callback({ statusCode: 404, message: 'Team not found' })
    else return callback(null, { team })
  },

  head() {
    return {
      title: `${this.team.name}`
    }
  }
}
</script>