module.exports = {
  Client: require("./client.js"),
  FishClient: require("./client.js"),
  Version: require("../package.json").version,
  FishMessage: require("./base/events/message.js"),
};
