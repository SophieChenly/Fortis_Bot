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
            await channel.setName(`🕒 ${currentTime}`);
            console.log(`Updated channel name to: ${currentTime}`);
        } catch (error) {
            console.error("Error updating channel:", error);
        }
    };

    // Run immediately, then every hour
    updateChannelName();
    setInterval(updateChannelName, 60 * 60 * 1000);
});

// async function getChannelName(currTime) {
//     const split = currTime.split(" ");
//     const time = parseInt(split[0]);
//     const a = split[1];
    
//     // sunrise + sunset 🌄 (6am/pm)
//     // day 🏞 (7am-5pm) -> 7-11am + 12-5pm
//     // night 🌌 (7pm-5am) -> 7-11pm + 12-5am

//     if (time == 6) {
//         return `🌄 ${currTime}`;
//     } else if (time <= 11 && time >= 7 ) {
//         if (a == "AM") {
//             return `🏞 ${currTime}`;
//         } else if (a == "PM") {
//             return `🌌 ${currTime}`;
//         } else {
//             console.error("Error parsing AM/PM");
//             return "error";
//         }
//     } else if (time == 12 || time <= 5) {
//         if (a == "AM") {
//             return `🌌 ${currTime}`;
//         } else if (a == "PM") {
//             return `🏞 ${currTime}`;
//         } else {
//             console.error("Error parsing AM/PM");
//             return "error";
//         }
//     } else {
//         console.error("Error parsing time: " + currTime);
//         return "error";
//     }
// }

client.login(process.env.TOKEN);

module.exports = getChannelName;