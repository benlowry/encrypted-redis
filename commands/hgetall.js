const Encrypt = require('../encrypt.js')
let client

module.exports = (key, callback) => {
  client = client || module.exports.client
  return client.hgetallOriginal(Encrypt.hashRedisKey(key), (error, data) => {
    return callback(error, data ? Encrypt.decryptRedisObject(data) : null)
  })
}
