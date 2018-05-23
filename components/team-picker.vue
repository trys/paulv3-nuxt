<template>
  <select
    @change="$emit('change', $event.target.value)"
    @input="$emit('input', $event.target.value)"
    :value="value"
    :name="name"
    :required="required"
  >
    <option value="">Pick a team</option>
    <option v-for="team in filteredTeams" :key="team.id" :value="String(team.id)">{{ team.name }}</option>
  </select>
</template>

<script>
export default {
  props: {
    teams: Array,
    value: [String, Number],
    name: [String, Number],
    filter: {
      type: String,
      default () {
        return ''
      }
    },
    required: {
      type: Boolean,
      default () {
        return true
      }
    }
  },

  computed: {
    filteredTeams () {
      const f = this.filter
      return this.teams.filter(team => {
        if (f) return team.group === f
        return true
      })
    }
  }
}
</script>
