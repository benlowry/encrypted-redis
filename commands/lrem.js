const Encrypt = require('../encrypt.js')
let client

module.exports = (key, count, value, callback) => {
  client = client || module.exports.client
  return client.lremOriginal(Encrypt.hashRedisKey(key), count, Encrypt.encryptRedisValue(value), callback)
}
