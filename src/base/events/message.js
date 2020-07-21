const { Structures } = require('discord.js');

/**
 * Discord.js Message event structure.
 * @private
 */
module.exports = Structures.extend('Message', Message => {

  class FishMessage extends Message {
    constructor() {
      super();

      /**
       * @privet
       */
      this._configs = null;

    }
    run() {
      /**
       Error:
        return this.channel.guild || null;
                            ^
        TypeError: Cannot read property 'guild' of undefined
            at FishMessage.get guild [as guild] (E:\clients\projects\js\fish\node_modules\discord.js\src\structures\Message.js:285:25)
            at FishMessage.get member [as member] (E:\clients\projects\js\fish\node_modules\discord.js\src\structures\Message.js:258:17)
            at MessageCreateAction.handle (E:\clients\projects\js\fish\node_modules\discord.js\src\client\actions\MessageCreate.js:15:28)
            at Object.module.exports [as MESSAGE_CREATE] (E:\clients\projects\js\fish\node_modules\discord.js\src\client\websocket\handlers\MESSAGE_CREATE.js:4:32)
            at WebSocketManager.handlePacket (E:\clients\projects\js\fish\node_modules\discord.js\src\client\websocket\WebSocketManager.js:386:31)
            at WebSocketShard.onPacket (E:\clients\projects\js\fish\node_modules\discord.js\src\client\websocket\WebSocketShard.js:436:22)
            at WebSocketShard.onMessage (E:\clients\projects\js\fish\node_modules\discord.js\src\client\websocket\WebSocketShard.js:293:10)
            at WebSocket.onMessage (E:\clients\projects\js\fish\node_modules\ws\lib\event-target.js:125:16)
            at WebSocket.emit (events.js:311:20)
            at Receiver.receiverOnMessage (E:\clients\projects\js\fish\node_modules\ws\lib\websocket.js:797:20)
        End of error:
       */
      console.log(this);
    }
  }

  return FishMessage;
});


// if (this.author.bot) return;

// /**
//  * Variables for evaluating
//  * @private
//  * @param {string} [prefix] Prefix set by dev and/or default.
//  * @param {string} [commandName] Only the name/aliases of the command calling.
//  * @param {string[]} [args] Array of the following after [commands].
//  */

// let prefix = this.client.commandsPrefix;
// let commandName = this.content.toLowerCase().trim().split(/ +/g)[0];
// let args = this.content.trim().split(/ +/g).splice(1);

// let cmd = this.client.commands.get(commandName.slice(prefix.length)) ||
//   this.client.commands.get(this.client.aliases.get(commandName.slice(prefix.length)));
// if (cmd === undefined) return;
// console.log(cmd.configs);
// if (cmd) cmd.run(this.client, this, args);