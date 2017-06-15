const fs = require('fs')
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
    const original = `${command}Original`
    client[original] = client[command]
    client[command] = encryptedCommand
  }
  return client
}
