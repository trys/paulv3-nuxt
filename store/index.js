import Vuex from 'vuex'
import axios from '~/plugins/axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      predictions: [],
      user: false,
      auth: null,
      teams: [],
      fixtures: [],
      menu: false
    },

    actions: {
      async getTeams ({ state, commit }) {
        if (state.teams.length) return state.teams

        const { data } = await axios.get('/teams')
        commit('addTeams', data)
        return data
      },

      async getFixtures ({ state, commit }, force = false) {
        if (state.fixtures.length && !force) return state.fixtures

        const { data } = await axios.get('/fixtures')
        commit('addFixtures', data)
        return data
      },

      async api ({ state }, { url, method, data }) {
        if (!state.user) throw new Error('Please log in');
        await state.user.jwt();

        return await axios({
          url,
          method,
          data,
          headers: {
            authorization: 'Bearer ' + state.user.token.access_token
          }
        })
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
      },

      toggleMenu (state) {
        state.menu = !state.menu
      },

      closeMenu (state) {
        state.menu = false
      }
    }
  })
}

export default createStore