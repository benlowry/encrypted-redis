const Encrypt = require('../encrypt.js')
let client

module.exports = (key, fieldsAndValues, callback) => {
  client = client || module.exports.client
  return client.hmsetOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisArray(fieldsAndValues), callback)
}
