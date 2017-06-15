const Encrypt = require('../encrypt.js')
let client

module.exports = (key, fields, callback) => {
  client = client || module.exports.client
  return client.hmgetOriginal(Encrypt.hashRedisKey(key), Encrypt.encryptRedisArray(fields), (error, values) => {
    values = Encrypt.decryptRedisArray(values)
    return callback(error, values)
  })
}
