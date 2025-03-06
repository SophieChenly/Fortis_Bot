require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { updateChannelName } = require('./functions/updateTimeChannel');
const { messageRead } = require('./functions/messageRead');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    updateChannelName(client);
    setInterval(updateChannelName, 60 * 60 * 1000);
});

client.on('messageCreate', (message) => {
    messageRead(message);
})

client.login(process.env.TOKEN);