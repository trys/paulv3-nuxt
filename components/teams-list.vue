<template>
  <ul>
    <li v-for="team in teams" :key="team.id">
      <nuxt-link :to="{ path: `/teams/${team.slug}` }">{{ team.name }}</nuxt-link>
       - <nuxt-link :to="{ name: 'groups-id', params: { 'id': team.group } }">Group {{ team.group.toUpperCase() }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      teams: {
        type: Array,
        required: true
      }
    }
  }
</script>
