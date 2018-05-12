<template>
  <tr>
    <th>
      <nuxt-link :to="{ name: 'teams-id', params: { id: team.slug } }">{{ team.name }}</nuxt-link>
    </th>

    <td>{{ team.results.played }}</td>
    <td>{{ team.results.won }}</td>
    <td>{{ team.results.drawn }}</td>
    <td>{{ team.results.lost }}</td>
    <td class="secondary">{{ team.results.for }}</td>
    <td class="secondary">{{ team.results.against }}</td>
    <td>{{ team.results.for - team.results.against }}</td>
    <td>{{ team.results.points }}</td>
    <td class="tertiary form">
      <span class="form--W"></span>
      <span class="form--D"></span>
      <span class="form--L"></span>
      <span class="form--W"></span>
      <span class="form--W"></span>
      <span v-for="(form, i) in team.results.form" :key="i" :class="`form--${form}`"></span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
