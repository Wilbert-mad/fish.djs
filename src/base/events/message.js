/**
 * Discord.js Message event structure.
 * @private
 * @param {FishClient} [client] - Framework client
 * @param {Message} [message] - Discord message
 */
module.exports = (client, message) => {
  if (message.author.bot) return;

  /**
   * Variables for evaluating
   * @private
   * @param {string} [prefix] Prefix set by dev and/or default.
   * @param {string} [commandName] Only the name/aliases of the command calling.
   * @param {string[]} [args] Array of the following after [commands].
   */

  let prefix = client.commandsPrefix;
  let commandName = message.content.toLowerCase().trim().split(/ +/g)[0];
  let args = message.content.trim().split(/ +/g).splice(1);
};
