import axios from 'axios'

const _res = (cb, statusCode = 400, body = 'Error') => cb(null, { statusCode, body })

function fetchUser(bearer, API_URL) {
  return axios.get(API_URL + '/user', {
    headers: { Authorization: bearer }
  })
}

exports.handler = function(event, context, cb) {
  if (event.httpMethod !== 'POST')
    return _res(cb, 400, 'Only POST allowed')

  if (!event.headers.authorization)
    return _res(cb, 401, 'Please supply a token')

  const API_URL = 'https://paultheoctopus.netlify.com/.netlify/identity'

  const userPromise = fetchUser(event.headers.authorization, API_URL)
  userPromise
    .then(res => {
      return _res(cb, 200, res.data)
    })
    .catch(error => {
      return _res(cb, error.response.data.code, error.response.data.msg)
    })
}
