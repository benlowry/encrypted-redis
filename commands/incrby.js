const Encrypt = require('../encrypt.js')
let client

module.exports = (key, value, callback) => {
  client = client || module.exports.client
  return client.incrbyOriginal(Encrypt.hashRedisKey(key), value, callback)
}
