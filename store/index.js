import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      predictions: []
    },

    mutations: {
      addPredictions (state, predictions) {
        state.predictions = predictions
      },

      addPrediction (state, prediction) {
        const current = state.predictions.findIndex(p => p.fixture.id === prediction.fixture.id)
        if (current !== -1) state.predictions[current] = prediction
        else state.predictions.push(prediction)
      }
    }
  })
}

export default createStore