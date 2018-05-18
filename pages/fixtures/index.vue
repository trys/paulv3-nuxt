<template>
  <div class="page">
    <header class="page-header">
      <h1>Fixtures</h1>
    </header>
    <div class="page-wrapper">
      <div
        v-if="fixture_dates"
        v-for="(fixtures, k) in fixture_dates"
        :key="k"
        class="fixture-date"
      >
        <fixture-preview
          v-for="fixture in fixtures"
          :key="fixture.id"
          :fixture="fixture"
        />
      </div>
    </div>
  </div>
</template>

<script>
import fixturePreview from '~/components/fixture'
export default {
  async asyncData({ store }) {
    return {
      fixtures: await store.dispatch('getFixtures')
    }
  },

  head () {
    return {
      title: 'Fixtures',
      meta: [
        { property: 'og:url', content: `https://paultheoctop.us${this.$route.path}` },
        { property: 'og:title', content: 'Fixtures | Paul the Octopus' },
        { name: 'twitter:title', content: 'Fixtures | Paul the Octopus' }
      ]
    }
  },

  components: {
    fixturePreview
  },

  computed: {
    fixture_dates () {
      if (!this.fixtures) return null
      const fixture_groups = this.fixtures.reduce((current, fixture) => {
        const date = new Date(fixture.date)
        const key = `${date.getMonth()}${date.getDate()}`
        if (!current[key]) current[key] = []
        current[key].push(fixture)
        return current
      }, {})

      Object.keys(fixture_groups).forEach(key => {
        fixture_groups[key].sort((a, b) => new Date(a.date) > new Date(b.date));
      })

      return fixture_groups
    },

    predictions () {
      return this.$store.state.predictions
    }
  }
};
</script>
