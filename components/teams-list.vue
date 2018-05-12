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
        <team-list-row
          v-for="team in orderedTeams"
          :key="team.id"
          :team="team"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TeamListRow from './team-list-row'
export default {
  components: {
    TeamListRow
  },

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
    orderedTeams () {
      const teams = this.teams.map(team => {
        const fixtures = this.fixtures.filter(f => f.score_one !== null && (f.team_one_id === team.id || f.team_two_id === team.id))
        fixtures.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        team.results = fixtures.reduce((r, f) => {
          const current = f.team_one_id === team.id ? 'score_one' : 'score_two'
          const opposition = team === 'score_one' ? 'score_two' : 'score_one'
          r.played++
          r.for += f[current]
          r.against += f[opposition]
          if (f[current] === f[opposition]) {
            r.drawn++
            r.points++
            if (r.form.length < 5) r.form.push('D')
          }

          if (f[current] > f[opposition]) {
            r.won++
            r.points += 3
            if (r.form.length < 5) r.form.push('W')
          }

          if (f[current] < f[opposition]) {
            r.lost++
            if (r.form.length < 5) r.form.push('L')
          }

          return r;
        }, { played: 0, won: 0, lost: 0, drawn: 0, for: 0, against: 0, form: [], points: 0 })

        return team
      })

      teams.sort((a, b) => {
        const points = b.results.points - a.results.points
        if (points !== 0) return points;

        const gd = b.results.for - a.results.for;
        if (gd !== 0) return gd;

        return a.name > b.name ? 1 : -1;
      })

      return teams;
    }
  }
}
</script>
