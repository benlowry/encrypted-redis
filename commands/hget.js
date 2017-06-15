const Encrypt = require('../encrypt.js')
let client

module.exports = (key, field, callback) => {
  client = client || module.exports.client
  return client.hgetOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisValue(field), (error, data) => {
    return callback(error, data ? Encrypt.decryptRedisValue(data) : null)
  })
}
