const Encrypt = require('../encrypt.js')
let client

module.exports = (key, callback) => {
  client = client || module.exports.client
  return client.existsOriginal(Encrypt.hashRedisKey(key), callback)
}
