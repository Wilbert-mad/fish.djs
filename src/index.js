module.exports = {
  Client: require('./client.js'),
  FishClient: require('./client.js'),
  FishMessage: require('./base/events/message.js'),

  Version: require('../package.json').version,
};
