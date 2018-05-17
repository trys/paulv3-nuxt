<template>
  <div class="page">
    <header class="page-header">
      <h1>Edit challenge</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <challenge-form @submit="update" :teams="teams" :challenge="challenge" />
    </div>
  </div>
</template>

<script>
import challengeForm from '~/components/challenge-form'
export default {
  async asyncData({ params, store, payload }, callback) {
    let teams
    let challenges
    let challenge

    if (payload) {
      challenge = payload.challenge
      teams = payload.teams
    } else {
      [challenges, teams] = await Promise.all([
        store.dispatch('getChallenges'),
        store.dispatch('getTeams')
      ]);
      challenge = challenges.find(f => String(f.id) === String(params.id))
    }

    if (!challenge) return callback({ statusCode: 404, message: 'Challenge not found' })
    else return callback(null, { challenge, teams })
  },

  head() {
    return {
      title: `Edit ${this.challenge.question}`
    }
  },

  components: {
    challengeForm
  },

  methods: {
    async update (event) {
      const question = event.target.question.value;
      const answer = event.target.answer.value || null;
      const points = event.target.points.value;
      const type = event.target.type.value;
      const date = event.target.date.value;

      if (question && date) {
        try {
          const data = {
            question,
            answer,
            points,
            type,
            date
          }

          await this.$store.dispatch('api', {
            url: `/challenges/${this.challenge.id}`,
            method: 'PUT',
            data
          })

          this.$store.dispatch('build')

          await this.$store.dispatch('getChallenges', true)
          this.$router.push({ name: 'challenges' })
        } catch(e) {
          console.error(e);
        }
      }
    }
  }
}
</script>