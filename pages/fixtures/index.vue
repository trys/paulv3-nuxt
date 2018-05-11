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
          :prediction="predictions.find(p => p.fixture_id === fixture.id)"
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

  head: {
    title: 'Fixtures'
  },

  components: {
    fixturePreview
  },

  computed: {
    fixture_dates () {
      if (!this.fixtures) return null
      return this.fixtures.reduce((current, fixture) => {
        const date = new Date(fixture.date)
        const key = `${date.getDate()}${date.getMonth()}`
        if (!current[key]) current[key] = []
        current[key].push(fixture)
        return current;
      }, {});
    },

    predictions () {
      return this.$store.state.predictions
    }
  }
};
</script>
