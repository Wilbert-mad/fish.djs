const fish = require('../src');
const client = new fish.FishClient();

client.on('ready', () => console.log('ready')).register();

client.login('NzMxOTc2OTEyMDM2OTU0MTE1.S0Aus.3gAd6o3-uag3DU83Aj2sb');
