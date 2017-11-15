const fs = require('fs')
const util = require('util')
let commands

module.exports = bindEncryptedCommands

function bindEncryptedCommands (client) {
  commands = commands || fs.readdirSync(`${__dirname}/commands`)
  for (const commandjs of commands) {
    const command = commandjs.substring(0, commandjs.length - 3)
    if (!client[command]) {
      throw new Error(`Invalid command ${command}`)
    }
    const encryptedCommand = require(`${__dirname}/commands/${command}.js`)
    encryptedCommand.client = client
    client[`${command}Original`] = client[command]
    client[`${command}Async`] = util.promisify(encryptedCommand)
    client[command] = encryptedCommand
  }
  return client
}
