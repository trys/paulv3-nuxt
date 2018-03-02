<template>
  <div>
    <h1>Challenges</h1>
    <ul>
      <li v-for="challenge in challenges" :key="challenge.id">
        {{ challenge.question }}
        <team-picker :teams="teams" v-model="answers[challenge.id]" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import teamPicker from '~/components/team-picker'

export default {
  async asyncData() {
    const challengePromise = axios.get('/challenges')
    const teamPromise = axios.get('/teams')
    const results = await Promise.all([challengePromise, teamPromise])
    const answers = {}
    results[0].data.forEach(c => answers[c.id] = '')
    return {
      challenges: results[0].data,
      teams: results[1].data,
      answers
    }
  },

  async mounted () {
    const { data } = await axios.get('/challenge-predictions')
    data.forEach(c => {
      console.log(this.answers)
      this.answers[c.question] = String(c.answer)
    })
  },

  components: {
    teamPicker
  },

  head: {
    title: 'Challenges'
  }
}
</script>