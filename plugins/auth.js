import axios from '~/plugins/axios'
import GoTrue from 'gotrue-js';
import Cookies from 'js-cookie'
const url = 'https://paultheoctopus.netlify.com'

export default async ({ store, route }) => {

  const isLocal = document.location.host.split(':').shift() === 'localhost'
  const auth = new GoTrue({ APIUrl: url + '/.netlify/identity', setCookie: !isLocal });
  store.commit('addAuth', auth)

  if (route.hash.indexOf('#access_token') === 0) {
    const hash = route.hash.replace('#', '')
    const options = {}
    hash.split('&').forEach((p) => {
      const [k, v] = p.split('=')
      options[k] = v
    })
    document.location.hash = ''

    await store.state.auth.createUser(options, true)
    .then((user) => {
      Cookies.set('nf_jwt', user.token.access_token, { expires: 1, secure: true });
      window.location.href = '/'
    })
    .catch(console.error)
  }

  setTimeout(function() {
    const user = store.state.auth.currentUser()
    store.commit('addUser', user)
    if (user) {
      user.jwt().then(async (token) => {
        try {
          const { data } = await axios.get('predictions', {
            headers: {
              authorization: 'Bearer ' + token
            }
          })
          data.predictions.forEach(prediction => store.commit('addPrediction', prediction))
        } catch(e) {}
      }).catch(console.error);
    }
  }, 1)
}