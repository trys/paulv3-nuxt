const axios = require('axios')
const { join } = require('path')

module.exports = {

  // Head and global Meta tags
  head: {
    titleTemplate: '%s | Paul the Octopus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ]
  },

  // Nuxt environment variables
  env: {
    dataDir: join(__dirname, 'dist/data')
  },
  
  // Generate dynamic routes
  generate: {
    routes: () => {
      return ['/table', '/fixtures', '/teams', '/challenges']
      // return axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      //   const users = res.data
      //   return users.map(user => `/users/${user.id}`)
      // })
    }
  }

}