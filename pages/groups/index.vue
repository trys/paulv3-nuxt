<template>
  <div>
    <h1>Groups</h1>
    <div v-for="group in groups" :key="group[0].group">
      <h2>Group {{ group[0].group.toUpperCase() }}</h2>
      <teams-list :teams="group" />
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import teamsList from '~/components/teams-list'

export default {
  async asyncData() {
    const { data } = await axios.get('/teams')
    return {
      groups: data.reduce((c, t) => {
        if (!c[t.group]) c[t.group] = []
        c[t.group].push(t)
        return c
      }, {})
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