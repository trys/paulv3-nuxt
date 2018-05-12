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
      menu: false,
      editing: false,
      predictions_populated: false
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

      async getFixture (store, id) {
        if (!id || isNaN(id)) return null
        try {
          const { data } = await axios.get(`/fixtures/${id}`)
          return data
        } catch(e) {
          return null
        }
      },

      async addPrediction({ state, commit, getters }, payload) {
        const user = state.auth.currentUser()
        if (user) {
          const token = await user.jwt();

          try {
            const { data } = await axios({
              url: `/predictions/${payload.id}`,
              method: 'put',
              headers: {
                authorization: 'Bearer ' + token
              },
              data: {
                score_one: payload.score_one,
                score_two: payload.score_two
              }
            });

            commit('addPrediction', data)

          } catch (e) {
            console.log(e)
            throw new Error(JSON.stringify(e.response.data.error));
          }

        }
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

    getters: {
      editing_prediction: state => {
        return state.editing && state.predictions.length ? state.predictions.find(p => p.fixture_id === state.editing.id) : null;
      }
    },

    mutations: {
      addPredictions (state, predictions) {
        state.predictions = predictions
      },

      addPrediction (state, prediction) {
        const current = state.predictions.findIndex(p => p.fixture_id === prediction.fixture_id)
        if (current !== -1) {
          const c = state.predictions[current]
          c.score_one = prediction.score_one
          c.score_two = prediction.score_two
        } else {
          state.predictions.push(prediction)
        }
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
      },

      togglePopulate(state) {
        if (!state.predictions.length) return
        state.predictions_populated = !state.predictions_populated
      },

      updateEditing (state, data) {
        state.editing = data
      }
    }
  })
}

export default createStore