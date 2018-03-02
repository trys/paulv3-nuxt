const axios = require('../plugins/axios')

module.exports = async function static(moduleOptions) {
  this.options.generate.routes = ['/table', '/fixtures', '/teams', '/challenges']
}