<template>
  <div>
    <h1>Fixtures</h1>
    <ul>
      <li v-for="fixture in fixtures" :key="fixture.id">
        <nuxt-link :to="{ name: 'fixtures-id', params: { id: fixture.id } }">
          {{ fixture.team_one.name }} vs. {{ fixture.team_two.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData({ store }) {
    return {
      fixtures: await store.dispatch('getFixtures')
    }
  },

  head: {
    title: 'Fixtures'
  }
}
</script>