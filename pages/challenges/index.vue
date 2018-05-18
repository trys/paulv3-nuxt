<template>
  <div class="page">
    <header class="page-header">
      <h1>Challenges</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded form-style">
      <no-ssr>
        <div>
          <ul v-if="challenges.length">
            <li
              v-for="challenge in challenges"
              :key="challenge.id"
            >
              <form method="POST" @submit.prevent="saveAnswer($event.target.answer.value, challenge.id)">
                <label>{{ challenge.question }}<br>
                  <team-picker
                    v-if="challenge.type === 'teams'"
                    :teams="teams"
                    name="answer"
                  />
                  <input
                    v-else
                    type="number"
                    max="999"
                    min="0"
                    step="1"
                    name="answer"
                    required
                  />
                </label>
                <button class="button button--left" type="submit">Save</button>
              </form>
            </li>
          </ul>
          <div v-if="answers && answers.length">
            <ul>
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
          </div>
          <template v-if="$store.state.user">
            <h3 v-if="!answers && !challenges.length">Loading challenges</h3>
          </template>
          <template v-else>
            <p>
              <nuxt-link :to="{ name: 'account-signup' }">Sign up</nuxt-link> or <nuxt-link :to="{ name: 'account-login' }">Login</nuxt-link> to view challenges.
            </p>
          </template>
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

  head () {
    return {
      title: 'Challenges',
      meta: [
        { property: 'og:url', content: `https://paultheoctop.us${this.$route.path}` },
        { property: 'og:title', content: 'Challenges | Paul the Octopus' },
        { name: 'twitter:title', content: 'Challenges | Paul the Octopus' }
      ]
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

<style lang="scss" scoped>
form {
  display: grid;
  grid-template-columns: 1fr 90px;
  grid-gap: 20px;
  align-items: end;

  label,
  input {
    margin: 0;
  }

  .button {
    margin-bottom: 5px;
  }
}

ul + div > ul,
li + li {
  margin-top: 40px;
}

h4,
p {
  margin: 0;
}

.form-style {
  margin-bottom: 30px;
}

p a {
  text-decoration: underline;
}
</style>
