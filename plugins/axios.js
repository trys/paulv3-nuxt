import axios from 'axios'

let baseURL = 'http://localhost:20020'
baseURL = 'https://api.paultheoctop.us';

if (process.browser && process.static) {
  baseURL = '/data'
}

const instance = axios.create({ baseURL })

if (process.browser && process.static) {
  instance.interceptors.request.use((config) => {
    config.url += '.json'
    return config
  })
}

if (process.server && process.static) {
  const mkdirp = require('mkdirp-promise')
  const { join, dirname } = require('path')
  const { writeFileSync } = require('fs')

  instance.interceptors.response.use(
    async function (response) {
      // Do something with response data
      const path = join(process.env.dataDir, response.request.path + '.json')
      await mkdirp(dirname(path))
      writeFileSync(path, JSON.stringify(response.data))
      return response
    }, function (error) {
      // Do something with response error
      return Promise.reject(error)
    }
  )
}

export default instance