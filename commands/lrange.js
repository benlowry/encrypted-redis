const Encrypt = require('../encrypt.js')
let client

module.exports = (key, start, end, callback) => {
  client = client || module.exports.client
  return client.lrangeOriginal(Encrypt.hashRedisKey(key), start, end, callback)
}

