const { Structures } = require('discord.js');

module.exports = Structures.extend('Message', Message => {
  /**
   * Discord.js Message event structure.
   * @extends Message
   */
  class FishMessage extends Message {
    constructor(...args) {
      super(...args);
      this.Message = this.content;
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

      /** @type {string} */
      let command = this.client.commands.get(commandName.slice(prefix.length));
      if (!command) command = this.client.commands.get(this.client.aliases.get(commandName.slice(prefix.length)));
      if (command === undefined) return;
      let { configs } = command;

      /*
       configs: {
        DevOnly: Boolean,
        guildOnly: Boolean,
        messageType: '',
        permissions: [''],
        args: {
          select: '',
          required: Boolean
        },
      },
       */

      if (!configs || configs === undefined || typeof configs !== 'object') configs = {};
      if (!configs.DevOnly) configs.DevOnly = false; 
      if (!configs.guildOnly) configs.guildOnly = true;
      if (!configs.messageType) configs.messageType = 'chat';
      if (!configs.args) configs.args = {};
      if (configs.args) {
        if (!configs.args.select) configs.args.select = 'all';
        if (typeof configs.args.select !== 'string')
          throw new TypeError(`Unexpected args select in command name ${command.name} must be string`);
      }

      if (typeof configs.guildOnly !== 'boolean') 
        throw new TypeError(`Unexpected guildOnly in "${command.name}" must be boolean`);
      if (typeof configs.DevOnly !== 'boolean')
        throw new TypeError(`Unexpected DevOnly type in "${command.name}" must be boolean`);
      if (typeof configs.args !== 'object')
        throw new TypeError(`Unexpected args in command name ${command.name} must be object`);
      if (typeof configs.messageType !== 'string')
        throw new TypeError(`Unexpected input in command name ${command.name} must be string`);

      if (configs.guildOnly === true && !this.guild) 
        return this.author.send('Guild only command!').then(m => m.delete({ timeout: 5000 }));
      console.log(configs);
      if (command) command.run(this.client, this, args);
    }
  }
  return FishMessage;
});
