const Encrypt = require('../encrypt.js')
let client

module.exports = (key, callback) => {
  client = client || module.exports.client
  return client.persistOriginal(Encrypt.hashRedisKey(key), callback)
}

