const Encrypt = require('../encrypt.js')
let client

module.exports = (key, field, callback) => {
  client = client || module.exports.client
  return client.hexistsOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisValue(field), callback)
}

