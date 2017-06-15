const Encrypt = require('../encrypt.js')
let client

module.exports = (key, field, value, callback) => {
  client = client || module.exports.client
  return client.setOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisValue(value), callback)
}
