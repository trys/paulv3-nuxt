<template>
  <div class="page">
    <header class="page-header">
      <h1>Add a challenge</h1>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <challenge-form @submit="create" :teams="teams" />
    </div>
  </div>
</template>

<script>
import challengeForm from '~/components/challenge-form'
export default {
  middleware: 'auth',

  head: {
    title: 'Add Challenge'
  },

  async asyncData ({ store }) {
    const teams = await store.dispatch('getTeams')
    return { teams }
  },

  data () {
    return {
      teams: [],
    }
  },

  components: {
    challengeForm
  },

  methods: {
    async create (event) {
      const question = event.target.question.value;
      const answer = event.target.answer.value || null;
      const points = event.target.points.value;
      const type = event.target.type.value;
      const date = event.target.date.value;

      if (question && date) {
        try {
          await this.$store.dispatch('api', {
            url: '/challenges',
            method: 'POST',
            data: {
              question,
              answer,
              points,
              type,
              date
            }
          })

          event.target.reset()
          event.target.question.focus()
        } catch(e) {
          console.error(e);
        }
      }
    }
  }
}
</script>