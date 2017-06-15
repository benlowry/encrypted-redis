const Encrypt = require('../encrypt.js')
let client

module.exports = (key, value, callback) => {
  client = client || module.exports.client
  return client.setnxOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisValue(value), callback)
}
