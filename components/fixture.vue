<template>
  <ul>
    <li>
      <h3>
        <nuxt-link :to="{ name: 'fixtures-id', params: { id: fixture.id } }">
          {{ fixture.team_one.name }} vs. {{ fixture.team_two.name }}
        </nuxt-link>
      </h3>
    </li>
    <li>
      {{ gametime }}
    </li>
    <li>
      <strong v-if="fixture.score_one === null">&nbsp;</strong>
      <strong v-else>{{ fixture.score_one }} - {{ fixture.score_two }}</strong>
    </li>
    <li>
      <strong v-if="!prediction">&nbsp;</strong>
      <strong v-else>{{ prediction.score_one }} - {{ prediction.score_two }}</strong>
    </li>
  </ul>
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
