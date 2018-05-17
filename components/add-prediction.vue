<template>
  <transition name="fade">
    <aside v-show="!!active" class="add-prediction">
      <div class="wrapper">
        <span class="bg" @click="close" />
        <center-page v-if="active">
          <header>
            <h3 class="lines">Prediction</h3>
            <h4>{{ active.team_one.name }} vs. {{ active.team_two.name }}</h4>
            <h3 v-if="error" class="error">{{ error }}</h3>
          </header>
          <form method="POST" @submit.prevent="addPrediction">
            <div class="scores">
              <div>
                <label for="score_one">{{ active.team_one.name }}</label>
                <input
                  type="number"
                  :value="active_prediction ? active_prediction.score_one : null"
                  id="score_one"
                  min="0"
                  max="99"
                  step="1"
                  name="score_one"
                  required
                >
              </div>

              <div>
                <label for="score_two">{{ active.team_two.name }}</label>
                <input
                  type="number"
                  :value="active_prediction ? active_prediction.score_two : null"
                  id="score_two"
                  min="0"
                  max="99"
                  step="1"
                  name="score_two"
                  required
                >
              </div>
            </div>

            <button class="button" type="submit">{{ button }}</button>
          </form>
        </center-page>
      </div>
    </aside>
  </transition>
</template>

<script>
import centerPage from '@/components/center-page'
export default {
  components: {
    centerPage
  },

  data () {
    return {
      error: '',
      button: 'Save'
    }
  },

  computed: {
    active () {
      return this.$store.state.editing
    },

    active_prediction () {
      return this.$store.getters.editing_prediction
    }
  },

  methods: {
    async addPrediction (event) {
      this.error = ''
      this.button = 'Saving'
      try {
        await this.$store.dispatch('addPrediction', {
          id: this.active.id,
          score_one: event.target.score_one.value,
          score_two: event.target.score_two.value
        });
        
        this.$store.commit('updateEditing', false)
        this.button = 'Save'

      } catch(e) {
        this.error = 'Error adding prediction'
      }
    },

    close () {
      this.$store.commit('updateEditing', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-prediction {
  position: fixed;
  z-index: 1000;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

.error {
  color: #F56969;
}

.center-page {
  position: relative;
  z-index: 100;
  pointer-events: none;
  color: #43555C;
}

.bg {
  background: rgba(32, 31, 39, 0.6);
  position: absolute;
  cursor: pointer;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

h4 {
  font-weight: 400;
}

label {
  margin: 0;
}

input {
  color: #43555C;
  border-color: #C8C4CF;
  padding: 8px;
}

.scores {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
  margin: 0 0 15px;
}

button {
  width: 120px;
  outline: none;
}
</style>
