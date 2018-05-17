<template>
  <div>
    <h1>Add a fixture</h1>

    <fixture-form @submit="create" :teams="teams" />

  </div>
</template>

<script>
import fixtureForm from '~/components/fixture-form'
export default {
  middleware: 'auth',

  head: {
    title: 'Add Fixture'
  },

  async asyncData ({ store }) {
    const teams = await store.dispatch('getTeams')
    return { teams }
  },

  data () {
    return {
      teams: [],
    }
  },

  components: {
    fixtureForm
  },

  methods: {
    async create (event) {
      const name = event.target.name.value;
      const team_one_id = event.target.team_one_id.value;
      const team_two_id = event.target.team_two_id.value;
      const date = event.target.date.value;

      if (name && date && team_one_id && team_two_id) {
        try {
          await this.$store.dispatch('api', {
            url: '/fixtures',
            method: 'POST',
            data: {
              name,
              team_one_id,
              team_two_id,
              date
            }
          })

          this.$store.dispatch('build')

          event.target.reset()
          event.target.name.focus()
        } catch(e) {
          console.error(e);
        }
      }
    }
  }
}
</script>