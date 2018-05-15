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
              v-if="challenge.type === 'teams'"
              :teams="teams"
              @change="saveAnswer($event, challenge.id)"
            />
            <form @submit.prevent="saveAnswer($event.target.answer.value, challenge.id)" class="number-answer">
              <input type="number" min="0" max="999" step="1" required name="answer" />
              <button type="submit">Save answer</button>
            </form>
          </li>
        </ul>
        <div v-else>
          <ul v-if="answers && answers.length">
            <li
              v-for="answer in answers"
              :key="answer.id"
            >
              <h4>{{ allChallenges.find(c => c.id === answer.challenge_id).question }} <admin-only>
                <nuxt-link :to="{ name: 'challenges-id-edit', params: { id: answer.challenge_id } }">Edit</nuxt-link>
              </admin-only></h4>
              <p>{{ allChallenges.find(c => c.id === answer.challenge_id).type === 'teams' ? teams.find(t => t.id === answer.answer).name : answer.answer }}</p>
            </li>
          </ul>
          <h3 v-else>Loading challenges</h3>
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import teamPicker from '~/components/team-picker'
import adminOnly from '~/components/admin-only'

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
        if (this.answers === false) return false
        if (new Date(challenge.date).getTime() < new Date().getTime()) return false
        if (this.answers.find(a => a.challenge_id === challenge.id)) return false
        return true
      })
    }
  },

  components: {
    teamPicker,
    adminOnly
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
