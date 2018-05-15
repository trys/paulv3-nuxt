<template>
  <div class="page">
    <header class="page-header">
      <h1>Challenges</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded form-style">
      <no-ssr>
        <ul v-if="challenges.length">
          <li
            v-for="challenge in challenges"
            :key="challenge.id"
          >
            {{ challenge.question }}
            <team-picker
              :teams="teams"
              @change="saveAnswer($event, challenge.id)"
            />
          </li>
        </ul>
        <div v-else>
          <ul v-if="answers.length">
            <li
              v-for="answer in answers"
              :key="answer.id"
            >
              <h4>{{ allChallenges.find(c => c.id === answer.challenge_id).question }}</h4>
              <p>{{ allChallenges.find(c => c.id === answer.challenge_id).type === 'teams' ? teams.find(t => t.id === answer.answer).name : answer.answer }}</p>
              
            </li>
          </ul>
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import teamPicker from '~/components/team-picker'
import axios from '~/plugins/axios'

export default {
  async asyncData ({ store }) {
    const [teams] = await Promise.all([
      store.dispatch('getTeams'),
      store.dispatch('getChallenges')
    ])

    return {
      teams
    }
  },

  computed: {
    answers () {
      return this.$store.state.challengePredictions
    },

    allChallenges () {
      return this.$store.state.challenges
    },

    challenges () {
      return this.allChallenges.filter(challenge => {
        if (new Date(challenge.date).getTime() < new Date().getTime()) return false
        if (this.answers.find(a => a.challenge_id === challenge.id)) return false
        return true
      })
    }
  },

  components: {
    teamPicker
  },

  head() {
    return {
      title: 'Challenges'
    }
  },

  methods: {
    async saveAnswer (answer, id) { 
      await this.$store.dispatch('addChallengePrediction', {
        id,
        answer
      });
    }
  }
}
</script>
