const moment = require('moment-timezone');
const getTimeString = require('./getTimeString');

const updateTimeChannelName = async (client) => {
    try {
        const channel = await client.channels.fetch(process.env.TIME_CHANNEL_ID);

        if (!channel) return console.log("Weather channel not found! Check channel ID in the env file!");

        const currentTime = moment().tz("America/Los_Angeles").format('h A');
        const timeString = getTimeString(currentTime);

        await channel.setName(timeString);
        
        console.log(`Updated channel name to: ${timeString}`);
    } catch (error) {
        console.error("Error updating channel:", error);
    }
};

const checkTimeAndUpdateChannel = async (client) => {
    const now = new Date();
    const minutes = now.getMinutes();

    console.log("Checking time and updating channel");

    try {
        if (minutes >= 0 && minutes <= 60) {
            updateTimeChannelName(client);
        }
    } catch (error) {
        console.error("Error checking time and updating channel: ", error);
    }
}

module.exports = { updateTimeChannelName, checkTimeAndUpdateChannel };