<template>
  <div>
    <h1>Fixtures</h1>
    <div class="fixtures">
      <fixture-preview
        v-for="fixture in fixtures"
        :key="fixture.id"
        :fixture="fixture"
        :prediction="predictions.find(p => p.fixture_id === fixture.id)"
      ></fixture-preview>
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
    predictions () {
      return this.$store.state.predictions
    }
  }
}
</script>