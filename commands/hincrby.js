const Encrypt = require('../encrypt.js')
let client

module.exports = (key, field, value, callback) => {
  client = client || module.exports.client
  return client.hincrbyOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisValue(field), value, callback)
}
