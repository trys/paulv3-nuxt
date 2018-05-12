<template>
  <div class="page">
    <header class="page-header">
      <h1>
        <nuxt-link :to="{ name: 'teams-id', params: { id: fixture.team_one.slug } }">{{ fixture.team_one.name }}</nuxt-link>
        vs. <nuxt-link :to="{ name: 'teams-id', params: { id: fixture.team_two.slug } }">{{ fixture.team_two.name }}</nuxt-link>
      </h1>
      <h2>{{ gametime }}</h2>
    </header>
    <div class="page-wrapper page-wrapper--padded">
      <!-- <div class="scorelines" v-if="prediction || fixture.score_one !== null">
        <div v-if="prediction">
          Your prediction: {{ prediction.score_one }}-{{ prediction.score_two }}
        </div>
        <div v-if="fixture.score_one !== null && `${fixture.score_one}-${fixture.score_two}` !== fixture.final_score">
          Game score: {{ fixture.score_one }}-{{ fixture.score_two }}
        </div>
        <div v-if="fixture.score_one !== null">
          Final score: {{ fixture.final_score }}
        </div>
      </div> -->

      <div class="table-wrapper" v-if="orderedPredictions.length">
        <h3>Predictions</h3>
        <table>
          <thead>
            <tr>
              <th class="user">User</th>
              <th class="prediction">Prediction</th>
              <th class="points">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prediction in orderedPredictions" :key="prediction.name">
              <td class="user">{{ prediction.username }}</td>
              <td class="prediction">{{ prediction.score_one }}-{{ prediction.score_two }}</td>
              <td class="points">{{ prediction.points || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '~/plugins/time'
export default {
  async asyncData({ params, store }, callback) {
    const fixture = await store.dispatch('getFixture', Number(params.id))

    if (!fixture) return callback({ statusCode: 404, message: 'Fixture not found' })    
    return callback(null, { fixture })
  },

  head() {
    return {
      title: `${this.fixture.team_one.name} vs. ${this.fixture.team_two.name}`
    }
  },

  computed: {
    gametime () {
      return formatDateTime(this.fixture.date)
    },

    prediction () {
      return this.$store.state.predictions.find(p => p.fixture_id === this.fixture.id)
    },

    orderedPredictions () {
      const predictions = this.fixture.predictions || []
      if (this.fixture.score_one === null) {
        predictions.sort((a, b) => a.username > b.username ? 1 : -1)
        return predictions
      }

      const calculate_result = (s1, s2) => s1 === s2 ? 0 : s1 > s2 ? 1 : 2;
      const result = calculate_result(this.fixture.score_one, this.fixture.score_two);
  
      predictions.forEach(p => {
        if (p.score_one === this.fixture.score_one && p.score_two === this.fixture.score_two) {
          p.points = 3
        } else if (result === calculate_result(p.score_one, p.score_two)) {
          p.points = 1
        }
      })

      predictions.sort((a, b) => {
        const points = b.points - a.points;
        if (points !== 0) return points;

        return a.username > b.username ? 1 : -1;
      })

      return predictions
    }
  }
}
</script>

<style lang="scss" scoped>
.scorelines {
  border-bottom: 2px solid;
  margin-bottom: 30px;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > * {
    margin: 0 5px;
  }
}

.prediction,
.points {
  width: 60px;
  text-align: right;
}
</style>
