<template>
  <div class="page" v-if="user">
    <header class="page-header">
      <h1>{{ user.username }}</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      
      <div class="table-wrapper" v-if="fixtures.length">
        <h3>Predictions</h3>
        <table>
          <thead>
            <tr>
              <th class="user">Game</th>
              <th class="prediction">Score</th>
              <th class="prediction">Prediction</th>
              <th class="points">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fixture in fixtures" :key="fixture.id">
              <td class="user">
                <nuxt-link :to="{ name: 'fixtures-id', params: { id: fixture.id } }">
                  {{ fixture.team_one.name }} vs. {{ fixture.team_two.name }}
                </nuxt-link>
              </td>
              <td class="prediction">{{ fixture.score_one }}-{{ fixture.score_two }}</td>
              <td class="prediction">{{ fixture.prediction.score_one }}-{{ fixture.prediction.score_two }}</td>
              <td class="points">{{ fixture.prediction.points || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="user.challenges && user.challenges.length" class="table-wrapper">
        <ul>
          <li
            v-for="answer in user.challenges"
            :key="answer.id"
          >
            <h4>{{ challenges.find(c => c.id === answer.challenge_id).question }} <admin-only>
              <nuxt-link :to="{ name: 'challenges-id-edit', params: { id: answer.challenge_id } }">Edit</nuxt-link>
            </admin-only></h4>
            <p>{{ challenges.find(c => c.id === answer.challenge_id).type === 'teams' ? teams.find(t => t.id === answer.answer).name : answer.answer }}</p>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: null,
      allFixtures: [],
      challenges: [],
      teams: []
    }
  },

  async mounted () {
    try {
      const [user, fixtures, challenges, teams] = await Promise.all([
        this.$store.dispatch('api', {
          url: `/users/${Number(this.$route.params.id)}`,
          method: 'get',
          data: {}
        }),
        this.$store.dispatch('getFixtures'),
        this.$store.dispatch('getChallenges'),
        this.$store.dispatch('getTeams')
      ])

      this.user = user.data
      this.allFixtures = fixtures
      this.challenges = challenges
      this.teams = teams
    } catch(e) {}
  },

  computed: {
    fixtures () {
      return this.allFixtures.filter(f => {
        const prediction = this.user.predictions.find(p => p.fixture_id === f.id)
        if (prediction) {
          f.prediction = prediction
          return true;
        }

        return false
      })
    }
  }
}
</script>

<style scoped>
.points {
  text-align: right;
}

.prediction {
  width: 70px;
  text-align: right;
}
</style>
