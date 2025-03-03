require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const moment = require('moment-timezone');
const getTimeString = require('./getTimeString');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    const updateChannelName = async () => {
        try {
            const channel = await client.channels.fetch(process.env.CHANNEL_ID);
            if (!channel) return console.log("Channel not found!");

            // Format the time to show only the hour with AM/PM
            const currentTime = moment().tz("America/Los_Angeles").format('h A');
            const timeString = getTimeString(currentTime);
            await channel.setName(timeString);
            console.log(`Updated channel name to: ${timeString}`);
        } catch (error) {
            console.error("Error updating channel:", error);
        }
    };

    // Run immediately, then every hour
    updateChannelName();
    setInterval(updateChannelName, 60 * 60 * 1000);
});

client.login(process.env.TOKEN);