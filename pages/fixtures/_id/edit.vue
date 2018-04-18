<template>
  <div>
    <fixture-form @submit="update" :teams="teams" :fixture="fixture" />

    <nuxt-link :to="{ name: 'fixtures-id', params: { id: fixture.id } }">&larr; go back</nuxt-link>
  </div>
</template>

<script>
import fixtureForm from '~/components/fixture-form'
export default {
  async asyncData({ params, store }, callback) {
    const [fixtures, teams] = await Promise.all([
      store.dispatch('getFixtures'),
      store.dispatch('getTeams')
    ]);
    const fixture = fixtures.find(f => String(f.id) === String(params.id))
    if (!fixture) return callback({ statusCode: 404, message: 'Fixture not found' })
    else return callback(null, { fixture, teams })
  },

  head() {
    return {
      title: `Edit ${this.fixture.team_one.name} vs. ${this.fixture.team_two.name}`
    }
  },

  components: {
    fixtureForm
  },

  methods: {
    async update (event) {
      const name = event.target.name.value;
      const team_one_id = event.target.team_one_id.value;
      const team_two_id = event.target.team_two_id.value;
      const date = event.target.date.value;
      const score_one = event.target.score_one.value;
      const score_two = event.target.score_two.value;
      const final_score = event.target.final_score.value;

      if (name && date && team_one_id && team_two_id) {
        try {
          const data = {
            name,
            team_one_id,
            team_two_id,
            date
          }

          if (score_one !== '') {
            data.score_one = score_one
            data.score_two = score_two
            data.final_score = final_score
          }

          await this.$store.dispatch('api', {
            url: `/fixtures/${this.fixture.id}`,
            method: 'PUT',
            data
          })

          await this.$store.dispatch('getFixtures', true)
          this.$router.push({ name: 'fixtures-id', params: { id: this.fixture.id } })
        } catch(e) {
          console.error(e);
        }
      }
    }
  }
}
</script>