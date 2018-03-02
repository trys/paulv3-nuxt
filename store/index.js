import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      predictions: [],
      user: null,
      auth: null
    },

    mutations: {
      addPredictions (state, predictions) {
        state.predictions = predictions
      },

      addPrediction (state, prediction) {
        const current = state.predictions.findIndex(p => p.fixture.id === prediction.fixture.id)
        if (current !== -1) state.predictions[current] = prediction
        else state.predictions.push(prediction)
      },

      addAuth (state, auth) {
        state.auth = auth
      },

      addUser (state, user) {
        state.user = user
      },

      removeUser (state) {
        state.user = null
      }
    }
  })
}

export default createStore