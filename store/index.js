import Vuex from 'vuex'
import axios from '~/plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      predictions: [],
      user: false,
      auth: null,
      teams: [],
      fixtures: []
    },

    actions: {
      async getTeams ({ state, commit }) {
        if (state.teams.length) return state.teams

        const { data } = await axios.get('/teams')
        commit('addTeams', data)
        return data
      },

      async getFixtures ({ state, commit }) {
        if (state.fixtures.length) return state.fixtures

        const { data } = await axios.get('/fixtures')
        commit('addFixtures', data)
        return data
      }
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

      addTeams (state, teams) {
        state.teams = teams
      },

      addFixtures (state, fixtures) {
        state.fixtures = fixtures
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