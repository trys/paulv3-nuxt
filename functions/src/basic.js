const res = (cb, statusCode = 400, body = 'Error') => cb(null, { statusCode, body })

exports.handler = function(event, context, cb) {
  return res(cb, 200, 'Connection made')
}
