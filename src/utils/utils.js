// eslint-disable-next-line no-unused-vars
const FishClient = require('../client');
const path = require('path');
const fs = require('fs');

const permissions = {
  // All permissions
  ADMINISTRATOR: 'Administrator',
  // Managers
  MANAGE_NICKNAMES: 'Manage nicknames',
  MANAGE_EMOJIS: 'Manage emojis',
  MANAGE_WEBHOOKS: 'Manage webhooks',
  MANAGE_GUILD: 'Manage server',
  MANAGE_ROLES: 'Manage roles',
  MANAGE_CHANNELS: 'Manage channels',
  MANAGE_MESSAGES: 'Manage messages',
  // View
  VIEW_AUDIT_LOG: 'View audit log',
  VIEW_CHANNEL: 'Read text channels and see voice channels',
  // Member
  KICK_MEMBERS: 'Kick members',
  BAN_MEMBERS: 'Ban members',
  MUTE_MEMBERS: 'Mute members',
  DEAFEN_MEMBERS: 'Deafen members',
  MOVE_MEMBERS: 'Move members',
  CHANGE_NICKNAME: 'Change nickname',
  // Misc
  ATTACH_FILES: 'Attach files',
  CONNECT: 'Connect',
  SPEAK: 'Speak',
  USE_VAD: 'Use voice activity',
  CREATE_INSTANT_INVITE: 'Create instant invite',
  // channel, message
  SEND_MESSAGES: 'Send messages',
  SEND_TTS_MESSAGES: 'Send TTS messages',
  EMBED_LINKS: 'Embed',
  READ_MESSAGE_HISTORY: 'Read message history',
  MENTION_EVERYONE: 'Mention everyone',
  USE_EXTERNAL_EMOJIS: 'Use external emojis',
  ADD_REACTIONS: 'Add reactions',
};

/**
 *
 * @param {string} [exactPath] path
 * @param {string} [relativePath] path
 * @param {FishClient} [client] fishclient
 */
function CommandsLoader(exactPath, relativePath, client) {
  // eslint-disable-next-line no-undef
  fs.readdir(path.join(__dirname, exactPath), (err, files) => {
    if (err) throw err;
    if (files === undefined) throw new TypeError('There are no files in this path');
    let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) return console.log('[logs] no commands to load!');

    jsfiles.forEach((f) => {
      let pull = require(`${relativePath}/${f}`);
      if (pull === undefined) return;
      client.commands.set(pull.name, pull);
      if (pull.aliases === undefined) return;
      pull.aliases.forEach((alias) => {
        client.aliases.set(alias, pull.name);
      });
    });
  });
}

module.exports = { permissions, CommandsLoader };
