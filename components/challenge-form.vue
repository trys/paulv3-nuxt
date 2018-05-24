<template>
  <admin-only>
    <form @submit.prevent="$emit('submit', $event)" class="form-style">
      <div>
        <label for="question">Question</label>
        <input class="input-text" type="text" name="question" :value="challenge.question || ''" id="question" required />
      </div>

      <div>
        <label for="type">Type</label>
        <select name="type" id="type" v-model="question_type">
          <option value="teams">Teams</option>
          <option value="number">Number</option>
        </select>
      </div>

      <div v-if="question_type === 'teams'">
        <label>Answer
          <team-picker :teams="teams" v-model="answer" name="answer" :required="false" />
        </label>
      </div>
      <div v-else>
        <label for="type">Answer</label>
        <input type="number" min="1" max="10" step="1" name="answer" :value="challenge.answer || ''" id="answer" />
      </div>

      <div>
        <label for="type">Points</label>
        <input type="number" min="1" max="10" step="1" name="points" :value="challenge.points || ''" id="points" required />
      </div>

      <div>
        <label>Date</label>
        <flat-pickr
          v-model="date"
          :config="{
            enableTime: true,
          }"
          name="date"
          required
        ></flat-pickr>
      </div>

      <div>
        <input type="submit" class="button" value="Save">
      </div>
    </form>
  </admin-only>
</template>

<script>
import teamPicker from '~/components/team-picker'
import adminOnly from '~/components/admin-only'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  data () {
    const challenge = this.challenge || {}
    const date = new Date(challenge.date);
    date.setHours(date.getHours() - 1);

    return {
      date: challenge.date ? date : '2018-06-14 12:00',
      answer: challenge.team_one_id || '',
      question_type: challenge.type || 'teams'
    }
  },

  props: {
    teams: Array,
    challenge: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  components: {
    flatPickr,
    teamPicker,
    adminOnly
  }
}
</script>
