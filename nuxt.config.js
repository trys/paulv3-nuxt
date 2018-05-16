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

  loading: {
    color: 'rgba(0, 0, 0, 0.2)'
  },

  css: [
    {
      src: 'assets/scss/global.scss', lang: 'scss'
    }
  ],

  // Nuxt environment variables
  env: {
    dataDir: join(__dirname, 'dist/data')
  },

  plugins: [
    { src: '~/plugins/auth', ssr: false }
  ],
  
  // Generate dynamic routes
  generate: {
    interval: 100,
    routes: async () => {
      const mkdirp = require('mkdirp-promise')
      const { join, dirname } = require('path')
      const { writeFileSync } = require('fs')

      const routes = 
      [
        '/groups/a',
        '/groups/b',
        '/groups/c',
        '/groups/d',
        '/groups/e',
        '/groups/f',
        '/groups/g',
        '/groups/h'
      ]
      const [teams, fixtures, build, challenges] = await Promise.all([
        axios.get('https://api.paultheoctop.us/teams'),
        axios.get('https://api.paultheoctop.us/fixtures'),
        axios.get('https://api.paultheoctop.us/fixtures/build'),
        axios.get('https://api.paultheoctop.us/challenges/')
      ])

      teams.data.forEach(team => routes.push({
        route: `/teams/${team.slug}`,
        payload: { team, fixtures: fixtures.data }
      }))

      build.data.forEach(fixture => routes.push({
        route: `/fixtures/${fixture.id}`,
        payload: fixture
      }))

      build.data.forEach(fixture => routes.push({
        route: `/fixtures/${fixture.id}/edit`,
        payload: {
          fixture,
          teams: teams.data
        }
      }))

      build.data.forEach(fixture => {
        const path = `dist/data/fixtures/${fixture.id}.json`
        mkdirp(dirname(path)).then(() => {
          writeFileSync(path, JSON.stringify(fixture))
        })
      })

      challenges.data.forEach(challenge => routes.push({
        route: `/challenges/${challenge.id}/edit`,
        payload: {
          teams: teams.data,
          challenge
        }
      }))

      return routes
    }
  }
}