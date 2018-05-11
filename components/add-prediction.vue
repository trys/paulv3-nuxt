<template>
  <aside :class="{
    'add-prediction': true,
    active: !!active
  }">
    <div class="wrapper">
      <center-page v-if="active">
        <header>
          <h1>Prediction for {{ active.team_one.name }} vs. {{ active.team_two.name }}</h1>
        </header>
        <form method="POST" @submit.prevent="addPrediction">
          <h3 v-if="error">{{ error }}</h3>
          <label>Email: <br><input type="email" name="email" required></label><br>
          <button class="button" type="submit">Save</button>
        </form>
      </center-page>
    </div>
    <span class="bg" @click="close" />
  </aside>
</template>

<script>
import centerPage from '@/components/center-page'
export default {
  components: {
    centerPage
  },

  data () {
    return {
      error: ''
    }
  },

  computed: {
    active () {
      return this.$store.state.editing
    }
  },

  methods: {
    addPrediction (event) {
      this.error = ''
      
    },

    close () {
      this.$store.commit('updateEditing', false) 
    }
  }
}
</script>

<style lang="scss" scoped>
.add-prediction {
  transition: 300ms opacity, 300ms visibility;
  visibility: hidden;
  opacity: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.center-page {
  position: relative;
  z-index: 1;
  pointer-events: none;

  &__container {
    pointer-events: auto;
  }
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
</style>
