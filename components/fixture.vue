<template>
  <article class="fixture">
    <time>
      <strong>{{ day }}</strong>
      <small>{{ month }}</small>
    </time>
    
    <h3> 
      <nuxt-link :to="{ name: 'fixtures-id', params: { id: fixture.id } }">
        {{ fixture.team_one.name }} vs. {{ fixture.team_two.name }}
      </nuxt-link>
    </h3>

    <small>{{ time }}
      <template v-if="fixture.score_one !== null">
        <b> | </b> Score: <strong>{{ fixture.score_one }} - {{ fixture.score_two }}</strong>
      </template>

      <template v-if="prediction">
        <b> | </b> Prediction: <strong>{{ prediction.score_one }} - {{ prediction.score_two }}</strong>
      </template>

      <no-ssr v-if="editable">
        <span><b> | </b> <span class="edit" @click="edit">{{ prediction ? 'Edit' : 'Add prediction' }}</span></span>
      </no-ssr>
    </small>
    
  </article>
</template>

<script>
export default {
  props: {
    fixture: {
      type: Object,
      required: true
    }
  },

  computed: {
    prediction () {
      return this.$store.state.predictions.find(p => p.fixture_id === this.fixture.id)
    },

    date () {
      return new Date(this.fixture.date)
    },

    day () {
      return this.date.getDate()
    },

    month () {
      const months = { 4: 'May', 5: 'Jun', 6: 'Jul' }
      return months[this.date.getMonth()]
    },

    time () {
      return this.date.getHours() + ':' + ('0' + this.date.getMinutes()).slice(-2)
    },

    editable () {
      if (!this.$store.state.user) return false
      if (this.fixture.score_one !== null) return false
      if (Date.parse(new Date(this.fixture.date)) - Date.parse(new Date()) > 0) return false
      return true
    }
  },

  methods: {
    edit () {
      this.$store.commit('updateEditing', this.fixture)
    }
  }
};
</script>

<style lang="scss" scoped>
.fixture {
  position: relative;
  padding: 20px;
  background: #FFF;
  color: #43555C;

  &:first-child time {
    opacity: 1;
  }

  & + .fixture {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}

time {
  position: absolute;
  right: 20px;
  top: -20px;
  width: 40px;
  height: 40px;
  background: #68848F;
  color: #FFF;
  text-align: center;
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 400ms opacity;
  opacity: 0;

  strong {
    font-size: 16px;
    display: block;
  }

  small {
    text-transform: uppercase;
    font-size: 12px;
    display: block;
  }
}

h3 {
  margin: 0;
}

.edit {
  color: #D95B57;
  cursor: pointer;
}

b {
  font-weight: 400;
  opacity: 0.3;
  margin: 0 2px;
}
</style>
