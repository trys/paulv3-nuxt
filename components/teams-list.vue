<template>
  <div class="table-wrapper">
    <table class="teams-list">
      <thead>
        <tr>
          <th></th>
          <th>P<span>layed</span></th>
          <th>W<span>on</span></th>
          <th>D<span>rawn</span></th>
          <th>L<span>ost</span></th>
          <th class="secondary">GF</th>
          <th class="secondary">GA</th>
          <th>GD</th>
          <th>P<span>oin</span>ts</th>
          <th class="tertiary form"></th>
        </tr>  
      </thead>
      <tbody>
        <tr
          v-for="team in orderedTeams"
          :key="team.id"
          >
          <th>
            <nuxt-link :to="{ name: 'teams-id', params: { id: team.slug } }">{{ team.name }}</nuxt-link>
          </th>

          <td>{{ team.results.played }}</td>
          <td>{{ team.results.won }}</td>
          <td>{{ team.results.drawn }}</td>
          <td>{{ team.results.lost }}</td>
          <td class="secondary">{{ team.results.for }}</td>
          <td class="secondary">{{ team.results.against }}</td>
          <td>{{ team.results.diff }}</td>
          <td>{{ team.results.points }}</td>
          <td class="tertiary form">
            <span v-for="(form, i) in team.results.form" :key="i" :class="`form--${form}`"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array,
      required: true
    },

    fixtures: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    populated () {
      return this.$store.state.predictions_populated
    },

    predictions () {
      return this.$store.state.predictions
    },

    orderedTeams () {
      const teams = this.teams.map(team => {
        const fixtures = this.fixtures.filter(f => {
          const has_team = f.team_one_id === team.id || f.team_two_id === team.id
          if (!has_team) return false;

          return f.score_one !== null || (this.populated && !!this.predictions.find(p => p.fixture_id === f.id))
        })

        fixtures.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        team.results = fixtures.reduce((r, f) => {
          const current = f.team_one_id === team.id ? 'score_one' : 'score_two'
          const opposition = current === 'score_one' ? 'score_two' : 'score_one'
          let score_for = f[current]
          let score_against = f[opposition]

          if (this.populated) {
            const prediction = this.predictions.find(p => p.fixture_id === f.id)
            if (prediction) {
              score_for = prediction[current]
              score_against = prediction[opposition]
            }
          }

          r.played++
          r.for += score_for
          r.against += score_against
          r.diff += score_for
          r.diff -= score_against
          if (score_for === score_against) {
            r.drawn++
            r.points++
            if (r.form.length < 5) r.form.push('D')
          }

          if (score_for > score_against) {
            r.won++
            r.points += 3
            if (r.form.length < 5) r.form.push('W')
          }

          if (score_for < score_against) {
            r.lost++
            if (r.form.length < 5) r.form.push('L')
          }

          return r;
        }, { played: 0, won: 0, lost: 0, drawn: 0, for: 0, against: 0, diff: 0, form: [], points: 0 })

        return team
      })

      teams.sort((a, b) => {
        const points = b.results.points - a.results.points
        if (points !== 0) return points;

        const gd = b.results.diff - a.results.diff;
        if (gd !== 0) return gd;

        const gf = b.results.for - a.results.for;
        if (gf !== 0) return gf;

        const played = b.results.played - a.results.played;
        if (played !== 0) return played;

        return a.name > b.name ? 1 : -1;
      })

      return teams;
    }
  }
}
</script>
