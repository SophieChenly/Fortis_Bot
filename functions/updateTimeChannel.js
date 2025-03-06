const moment = require('moment-timezone');
const getTimeString = require('./getTimeString');

const updateChannelName = async (client) => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        if (!channel) return console.log("Channel not found!");

        const currentTime = moment().tz("America/Los_Angeles").format('h A');
        const timeString = getTimeString(currentTime);
        await channel.setName(timeString);
        console.log(`Updated channel name to: ${timeString}`);
    } catch (error) {
        console.error("Error updating channel:", error);
    }
};

module.exports = { updateChannelName };