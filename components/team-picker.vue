<template>
  <select
    @change="$emit('change', $event.target.value)"
    @input="$emit('input', $event.target.value)"
    :value="value"
    :name="name"
    required
  >
    <option value="">Pick a team</option>
    <option v-for="team in teams" :value="String(team.id)">{{ team.name }}</option>
  </select>
</template>

<script>
export default {
  props: {
    teams: Array,
    value: [String, Number],
    name: String
  }
}
</script>
