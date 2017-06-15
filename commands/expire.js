const Encrypt = require('../encrypt.js')
let client

module.exports = (key, time, callback) => {
  client = client || module.exports.client
  return client.expireOriginal(Encrypt.hashRedisKey(key), time, callback)
}
