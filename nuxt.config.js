const axios = require('axios')
const { join } = require('path')

module.exports = {

  // Head and global Meta tags
  head: {
    titleTemplate: '%s | Paul the Octopus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Welcome to Paul the Octopus - the prediction game created in homage to the clever little critter that became world famous for his footballing foresight.' },
      { property: 'og:description', content: 'Welcome to Paul the Octopus - the prediction game created in homage to the clever little critter that became world famous for his footballing foresight.' },
      { name: 'twitter:description', content: 'Welcome to Paul the Octopus - the prediction game created in homage to the clever little critter that became world famous for his footballing foresight.' },
      { name: 'apple-mobile-web-app-title', content: 'Paul the Octopus' },
      { name: 'application-name', content: 'Paul the Octopus' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ed645f' },
      { property: 'og:site_name', content: 'Paul the Octopus' },
      { property: 'og:locale', content: 'en_GB' },
      { property: 'article:publisher', content: 'https://www.facebook.com/tomangoUK' },
      { name: 'twitter:site', content: '@tomangoUK' },
      { name: 'twitter:creator', content: '@tomangoUK' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image:alt', content: 'Paul the Octopus' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:image', content: 'https://paultheoctop.us/og.jpg' },
      { name: 'twitter:image', content: 'https://paultheoctop.us/og.jpg' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ],
    script: [
      { type: 'application/ld+json', innerHTML: '{"@context": "http:\/\/schema.org","@type":"WebSite","@id":"#website","url":"https:\/\/paultheoctop.us","name":"Paul the Octopus"}' },
      { type: 'application/ld+json', innerHTML: '{"@context": "http:\/\/schema.org","@type":"Organization","url":"https:\/\/paultheoctop.us","@id":"#organization","name":"Paul the Octopus","logo":"https://paultheoctop.us/og.jpg"}' }
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
    fallback: true,
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