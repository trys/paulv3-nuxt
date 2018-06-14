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
      <div class="scorelines" v-if="prediction || fixture.score_one !== null">
        <div v-if="prediction">
          Your prediction: {{ prediction.score_one }}-{{ prediction.score_two }}
        </div>
        <div v-if="fixture.score_one !== null && `${fixture.score_one}-${fixture.score_two}` !== fixture.final_score">
          Game score: {{ fixture.score_one }}-{{ fixture.score_two }}
        </div>
        <div v-if="fixture.score_one !== null">
          Final score: {{ fixture.final_score }}
        </div>
      </div>

      <div
        v-if="orderedPredictions.length"
        class="table-wrapper"
      >
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
      <div v-else class="table-wrapper">
        <h3>Predictions will become available when the match starts</h3>
      </div>
      
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '~/plugins/time'
export default {
  async asyncData({ params, store, payload }, callback) {
    let fixture
    if (payload) {
      fixture = payload
    } else {
      if (store.state.fixtures.length) {
        const f = store.state.fixtures.find(f => f.id === Number(params.id))
        if (f.score_one === null) fixture = f
        if (fixture && new Date(fixture.date).getTime() < new Date().getTime()) {
          fixture = await store.dispatch('getFixture', Number(params.id))
        }
      }
      fixture = fixture || await store.dispatch('getFixture', Number(params.id))
    }

    if (!fixture) return callback({ statusCode: 404, message: 'Fixture not found' })    
    return callback(null, { fixture })
  },

  head () {
    const title = `${this.fixture.team_one.name} vs. ${this.fixture.team_two.name}`
    return {
      title,
      meta: [
        { property: 'og:url', content: `https://paultheoctop.us${this.$route.path}` },
        { property: 'og:title', content: `${title} | Paul the Octopus` },
        { name: 'twitter:title', content: `${title} | Paul the Octopus` }
      ]
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
      predictions.map(p => {
        p.username = p.username.replace('&#x2F;', "'")
        return p
      })

      if (this.fixture.score_one === null) {
        predictions.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1)
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

        return a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
      })

      return predictions
    }
  }
}
</script>

<style lang="scss" scoped>
.scorelines {
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
