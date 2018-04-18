<template>
  <div>
    <h1>Table</h1>
    <league-table :results="results" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import leagueTable from '~/components/league-table'

export default {
  async asyncData() {
    const { data } = await axios.get('/table')
    return {
      results: data.data || []
    }
  },

  head: {
    title: 'League Table'
  },

  components: {
    leagueTable
  }
}
</script>