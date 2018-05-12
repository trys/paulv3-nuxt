<template>
  <admin-only>
    <form @submit.prevent="$emit('submit', $event)" class="form-style">
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" :value="fixture.name || ''" id="name" required />
      </div>

      <div>
        <label>Team One
          <team-picker :teams="teams" v-model="team_one_id" name="team_one_id" />
        </label>
      </div>

      <div>
        <label>Team Two
          <team-picker :teams="teams" v-model="team_two_id" name="team_two_id" />
        </label>
      </div>

      <div>
        <label>Fixture date</label>
        <no-ssr>
          <flat-pickr
            v-model="date"
            :config="{
              enableTime: true,
            }"
            name="date"
            required
          ></flat-pickr>
        </no-ssr>
      </div>

      <template v-if="fixture">
        <div>
          <label for="score_one">Score One</label>
          <input type="number" min="0" max="100" step="1" name="score_one" :value="score_one" id="score_one" />
        </div>

        <div>
          <label for="score_two">Score Two</label>
          <input type="number" min="0" max="100" step="1" name="score_two" :value="score_two" id="score_two" />
        </div>

        <div>
          <label for="final_score">Final Score</label>
          <input type="text" name="final_score" :value="final_score" id="final_score" />
        </div>
      </template>

      <div>
        <input type="submit" class="button" value="Save">
      </div>
    </form>
  </admin-only>
</template>

<script>
import noSsr from 'vue-no-ssr'
import teamPicker from '~/components/team-picker'
import adminOnly from '~/components/admin-only'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  data () {
    const fixture = this.fixture || {}
    const date = new Date(fixture.date);
    date.setHours(date.getHours() - 1);

    return {
      date: fixture.date ? date : '2018-06-15 12:00',
      team_one_id: fixture.team_one_id || '',
      team_two_id: fixture.team_two_id || '',
      score_one: fixture.score_one !== undefined ? fixture.score_one : null,
      score_two: fixture.score_two !== undefined ? fixture.score_two : null,
      final_score: fixture.final_score || ''
    }
  },

  props: {
    teams: Array,
    fixture: Object
  },

  components: {
    flatPickr,
    teamPicker,
    adminOnly,
    noSsr
  }
}
</script>
