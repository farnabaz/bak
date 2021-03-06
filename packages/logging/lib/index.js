const consola = require('consola')

exports.register = function (server, options) {
  server.events.on(
    { name: 'request', channels: ['error', 'internal'] }, (_, { error, timestamp }, tags) => {
      if (
        (!error) ||
        (tags.unauthenticated) ||
        (error.output && error.output.statusCode === 404) ||
        (typeof options.filter === 'function' && !options.filter(error, tags))
      ) {
        return
      }

      consola.error({
        message: error,
        tag: Object.keys(tags).join(','),
        time: timestamp
      })
    }
  )
}

exports.pkg = require('../package.json')
exports.once = true
exports.configKey = 'logging'
