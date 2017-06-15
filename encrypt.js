const crypto = require('crypto')
const redisKeyHash = process.env.REDIS_KEY_HASH || ''
const redisEncryptionKey = process.env.REDIS_ENCRYPTION_KEY || ''

module.exports = {
  hashRedisKey,
  encryptRedisValue,
  encryptRedisArray,
  decryptRedisArray,
  decryptRedisObject,
decryptRedisValue}

function hashRedisKey (text) {
  if (!text) {
    return text
  }
  if (!redisKeyHash) {
    return text
  }
  const hash = crypto.createHmac('sha512', redisKeyHash)
  hash.update(text)
  return hash.digest('hex')
}

function encryptRedisArray (arr) {
  const final = []
  if (!arr || !arr.length) {
    return final
  }
  if (!redisEncryptionKey) {
    return final.concat(arr)
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    if (!arr[i]) {
      final[i] = ''
      continue
    }
    final[i] = encryptRedisValue(arr[i])
  }
  return final
}

function decryptRedisObject (obj) {
  if (!obj) {
    return obj
  }
  if (!redisEncryptionKey) {
    return obj
  }
  const final = {}
  for (const field in obj) {
    const fieldName = decryptRedisValue(field)
    final[fieldName] = decryptRedisValue(obj[field])
  }
  return final
}

function decryptRedisArray (arr) {
  const final = []
  if (!arr || !arr.length) {
    return final
  }
  if (!redisEncryptionKey) {
    return final.concat(arr)
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i]) {
      final[i] = decryptRedisValue(arr[i])
    }
  }
  return final
}

function decryptRedisValue (value) {
  if (!value || value === 0 || value < 0 || value > 0) {
    return value
  }
  if (!redisEncryptionKey) {
    return value
  }
  return crypto.createDecipher('aes-256-ctr', redisEncryptionKey).update(value.toString('hex'), 'hex', 'utf-8')
}

/**
 * Encrypt.encrypts fields/values stored in Redis in production and
 * optionally in devlepment if an Encrypt.encryption key is configured.
 */
function encryptRedisValue (value) {
  if (!value || value === 0 || value < 0 || value > 0) {
    return value
  }
  if (!redisEncryptionKey) {
    return value
  }
  if (!value.substring) {
    value = value.toString()
  }
  return crypto.createCipher('aes-256-ctr', redisEncryptionKey).update(value, 'utf-8', 'hex')
}
