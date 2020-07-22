const { Structures } = require('discord.js');

/**
 * Discord.js Message event structure.
 * @private
 */
module.exports = Structures.extend('Message', Message => {
  class FishMessage extends Message {
    constructor(...args) {
      super(...args);
      if (this.author.bot) return;
      
      /**
       * Variables for evaluating
       * @private
       * @param {string} [prefix] Prefix set by dev and/or default.
       * @param {string} [commandName] Only the name/aliases of the command calling.
       * @param {string[]} [args] Array of the following after [commands].
       */
      let prefix = this.client.commandsPrefix;
      let commandName = this.content.toLowerCase().trim().split(/ +/g)[0];
      args = this.content.trim().split(/ +/g).splice(1);

      let cmd = this.client.commands.get(commandName.slice(prefix.length));
      if (!cmd) cmd = this.client.commands.get(this.client.aliases.get(commandName.slice(prefix.length)));
      if (cmd === undefined) return;
      const { configs } = cmd;

      if (!configs.guildOnly) configs.guildOnly = true;

      if (typeof configs.guildOnly !== 'boolean') 
        throw new TypeError(`Unexpected input in command name ${cmd.name} must be boolean`);

      if (typeof configs.args.select !== 'string')
        throw new TypeError(`Unexpected args select in command name ${cmd.name} must be string`);
      if (configs.guildOnly === true && !this.guild) 
        return this.author.send('Guild only command!').then(m => m.delete({ timeout: 5000 }));
     
      if (cmd) cmd.run(this.client, this, args);
    }
  }
  return FishMessage;
});
// So you want to log the start time and the end time of the duration of the ticket?
// Ok I want to have a way to confirm that you want to send that message so if you make a spelling mistake