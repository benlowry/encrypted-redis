const Encrypt = require('../encrypt.js')
let client

module.exports = (key, value, callback) => {
  client = client || module.exports.client
  return client.rpushOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisValue(value), callback)
}
