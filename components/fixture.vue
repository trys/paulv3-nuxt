<template>
  <div class="fixture">
    <ul>
      <li>
        <nuxt-link :to="{ name: 'fixtures-id', params: { id: fixture.id } }">
          {{ fixture.team_one.name }} vs. {{ fixture.team_two.name }}
        </nuxt-link>
      </li>
      <li>
        {{ gametime }}
      </li>
      <li>
        Score: <strong v-if="fixture.score_one === null">&nbsp;</strong>
        <strong v-else>{{ fixture.score_one }} - {{ fixture.score_two }}</strong>
      </li>
      <li>
        Prediction: <strong v-if="!prediction">&nbsp;</strong>
        <strong v-else>{{ prediction.score_one }} - {{ prediction.score_two }}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDateTime } from '~/plugins/time'
export default {
  props: {
    fixture: {
      type: Object,
      required: true
    },
    prediction: {
      type: Object
    }
  },

  computed: {
    gametime () {
      return formatDateTime(this.fixture.date)
    }
  }
}
</script>

<style scoped>
.fixture {
  margin: 10px 0;
}
</style>
