// eslint-disable-next-line no-unused-vars
const { Client, User } = require("discord.js");
const { readdir } = require("fs").promises;

/**
 * Discord.js Client framework
 */
module.exports = class FishClient extends Client {
  /**
   * Options for a FishClient
   * @typedef {ClientOptions} FishClientOptions
   * @property {string} [clientPrefix=;] - Default command prefix.
   * @property {string} [dev] - ID of the bot owner/developer Discord user.
   * @property {string} [invite] - Invite URL to the bot's support server.
   */

  /**
   * @param {FishClientOptions} [options] - Options for the client.
   */
  constructor(options = {}) {
    if (typeof options.commandsPrefix === "undefined") options.commandsPrefix = ";";
    if (options.commandsPrefix === null) options.commandsPrefix = "";
    super(options);

    /**
     * @private
     */
    this._commandsPrefix = null;

    // gets the developer.
    if (options.dev) {
      this.on("ready", () => {
        if (typeof options.dev !== "string") throw new TypeError("Owner options is not string Unable to fetch.");
        this.users.fetch(options.dev).catch((err) => {
          if (err) console.log(err);
          this.emit("warn", `Unable to fetch developer ${options.dev}.`);
          this.emit("error", err);
        });
      });
    }
  }

  /**
   * @type {string}
   * @emits {@link FishClient#commandPrefixChange}
   */
  get commandsPrefix() {
    if (typeof this._commandsPrefix === "undefined" || this._commandsPrefix === null)
      return this.options.commandsPrefix;
    return this._commandsPrefix;
  }

  set commandsPrefix(prefix) {
    this._commandsPrefix = prefix;
    this.emit("commandPrefixChange", null, this._commandsPrefix);
  }

  /**
   * Developer of the bot, set by the {@link FishClientOptions#dev} option
   * @returns {string} developer public user info
   */
  get dev() {
    if (!this.options.dev) return null;
    if (typeof this.options.dev === "string") return this.users.cache.get(this.options.dev);
    return null;
  }
  /**
   *
   * @param {User} [user] - The user thats is being checked.
   * @returns {boolean}
   */
  isDev(user) {
    if (!this.options.dev) return false;
    user = this.users.resolve(user);
    if (!user) throw new RangeError("Unable to resolve user spesefied.");
    if (typeof this.options.dev === "string") return user.id === this.options.dev;
    throw new RangeError("The client's 'dev' option is an unknown.");
  }
  /**
   * @returns {Promise<VoidFunction>}
   */
  get register() {
    async function run() {
      // eslint-disable-next-line no-undef
      (await readdir(`${__dirname}/base/events`))
        .filter((e) => e.includes("message.js"))
        .forEach((f) => this.on("message", require(`../src/base/events/${f}`).bind(null, this)));
    }
    return run;
  }

  async destroy() {
    await super.destroy();
  }
};
