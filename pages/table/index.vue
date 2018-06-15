<template>
  <div class="page">
    <header class="page-header">
      <h1>Table</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <league-table :results="results" />
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import leagueTable from '~/components/league-table'

export default {
  async asyncData() {
    const { data } = await axios.get('/table')
    if (data && data.data && data.data.length) {
      data.data.map(r => {
        r.username = r.username.replace('&#x2F;', "'")
        return r
      })
      
      let points = 0
      data.data.forEach(r => {
        r.positionLabel = r.total === points ? '-' : r.position
        points = r.total
      })
    }

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