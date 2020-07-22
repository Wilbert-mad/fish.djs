// eslint-disable-next-line no-unused-vars
const { Client, User, Collection } = require('discord.js');
const { join } = require('path');
const fs = require('fs');

/**
 * Discord.js Client framework
 */
module.exports = class FishClient extends Client {
  /**
   * Options for a Client
   * @typedef {import('discord.js').ClientOptions} FishClientOptions
   * @property {string} [clientPrefix=;] - Default command prefix.
   * @property {string} [dev] - ID of the bot owner/developer Discord user.
   * @property {string} [invite] - Invite URL to the bot's support server.
   */

  /**
   * @param {FishClientOptions} [options] - Options for the client.
   */
  constructor(options = {}) {
    if (typeof options.commandsPrefix === 'undefined') options.commandsPrefix = ';';
    if (options.commandsPrefix === null) options.commandsPrefix = '';
    super(options);

    /**
     * @private
     */
    this._commandsPrefix = null;

    /**
     * @private
     */
    this.commands = new Collection();

    /**
     * @private
     */
    this.aliases = new Collection();

    // gets the developer.
    if (options.dev) {
      this.on('ready', () => {
        if (typeof options.dev !== 'string')
          throw new TypeError('Owner options is not string Unable to fetch.');
        this.users.fetch(options.dev).catch((err) => {
          this.emit('warn', `Unable to fetch developer ${options.dev}.`);
          this.emit('error', err);
        });
      });
    }
  }

  /**
   * @type {string}
   * @emits {@link FishClient#PrefixChange}
   */
  get commandsPrefix() {
    if (typeof this._commandsPrefix === 'undefined' || this._commandsPrefix === null)
      return this.options.commandsPrefix;
    return this._commandsPrefix;
  }

  set commandsPrefix(prefix) {
    this._commandsPrefix = prefix;
    this.emit('PrefixChange', null, this._commandsPrefix);
  }

  /**
   * This path is used to load all your custome commands;
   * @param {string} [path] The path to the commands folder.
   */
  claim(path) {
    if (typeof path !== 'string') throw new TypeError('Unexpected file Path type is not string');
  }

  /**
   * Developer of the bot, set by the {@link FishClientOptions#dev} option
   * @returns {string} developer public user info
   */
  get dev() {
    if (!this.options.dev) return null;
    if (typeof this.options.dev === 'string') return this.users.cache.get(this.options.dev);
    return null;
  }

  /**
   * @param {User} [user] - The user thats is being checked.
   * @returns {boolean}
   */
  isDev(user) {
    if (!this.options.dev) return false;
    user = this.users.resolve(user);
    if (!user) throw new RangeError('Unable to resolve user spesefied.');
    if (typeof this.options.dev === 'string') return user.id === this.options.dev;
    throw new RangeError('The client\'s "dev" option is an unknown.');
  }

  /**
   * Registers the default commands
   */
  registerDefaults() {
  /* eslint-disable no-undef */
    let command = [];
    fs.readdir(join(__dirname, './base/commands'), (err, files) => {
      if (err) throw err;
      let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
      if (jsfiles.length <= 0) return console.log('[logs] no commands to load!');
      jsfiles.forEach((f, i) => {
        let pull = require(join(__dirname, `../src/base/commands/${f}`));
        /* eslint-enable no-undef */
        if (pull === undefined) return;
        this.commands.set(pull.name, pull);
        if (pull.aliases === undefined) return;
        pull.aliases.forEach((alias) => this.aliases.set(alias, pull.name));
        command.push(f.split('.')[0]);
        if (i + 1 === jsfiles.length) this.emit('RegisterDefaults', command, this);
      });
    });
  }

  destroy() {
    super.destroy();
  }
};
