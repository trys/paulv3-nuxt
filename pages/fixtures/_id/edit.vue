<template>
  <div class="page">
    <header class="page-header">
      <h1>Edit fixture</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <fixture-form @submit="update" :teams="teams" :fixture="fixture" />
    </div>
  </div>
</template>

<script>
import fixtureForm from '~/components/fixture-form'
export default {
  async asyncData({ params, store, payload }, callback) {
    let fixture
    let fixtures
    let teams

    if (payload) {
      fixture = payload.fixture
      teams = payload.teams
    } else {
      [fixtures, teams] = await Promise.all([
        store.dispatch('getFixtures'),
        store.dispatch('getTeams')
      ]);
      fixture = fixtures.find(f => String(f.id) === String(params.id))
    }

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

            if (!data.final_score) {
              data.final_score = score_one + '-' + score_two
            }
          }

          await this.$store.dispatch('api', {
            url: `/fixtures/${this.fixture.id}`,
            method: 'PUT',
            data
          })

          this.$store.dispatch('build')

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