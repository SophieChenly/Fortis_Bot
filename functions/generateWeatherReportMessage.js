const { AttachmentBuilder } = require('discord.js');
const moment = require('moment-timezone'); // If using moment.js
const fs = require('fs'); // Import fs for file system operations

const getCurrentDayAndDate = () => {
    return moment().tz("America/Los_Angeles").format('dddd, MMMM D');
};


const generateWeatherReportMessage = async (client, sharedState, currentDayIndex) => {
    try {
        console.log("Generating...");
        // Get the current day's weather from the weekly weather report
        

        const dailyWeather = sharedState.weeklyWeather[currentDayIndex];

        if (!dailyWeather) {
            console.error("No weather data found for today!");
            return;
        }

        // Extract weather details
        const weatherName = dailyWeather['Weather Name'];
        const weatherEffects = dailyWeather['Weather Effects (if any)'];
        const tempRange = dailyWeather['Temp Range (Celsius)'];
        const paGrammoAnnouncement = dailyWeather['PA Grammo Announcement'];

        const currentDayAndDate = getCurrentDayAndDate();

        // Format the weather report message
        const message = `
# **🎶G-G-GOOD MORNING, CITIZENS O-O-OF FORTIS CASTELLUM!🎶**
***Toda-a-ay is ${currentDayAndDate}, and he-ere is your DAILY fore-fore-forecast!***
**${paGrammoAnnouncement}**
*Weather: ${weatherName}*
*Effects: ${weatherEffects || 'None'}*
*Temperature Range (Celsius): ${tempRange}*
        `;

        // Send the message to the weather report channel
        const weatherChannel = await client.channels.fetch(process.env.WEATHER_CHANNEL_ID);

        const imageFileName = weatherName.toLowerCase().replace(/ /g, '_') + '.jpg';
        const imagePath = `./weather_assets/images/${imageFileName}`; // Path to the image file
        console.log("image path:", imagePath);

        // Check if the image file exists
        if (!fs.existsSync(imagePath)) {
            console.error(`Image file not found: ${imagePath}`);
            return;
        }

        // Create an attachment
        const attachment = new AttachmentBuilder(imagePath);

        if (weatherChannel) {
            await weatherChannel.send({ content: message, files: [attachment]});
            console.log("Daily weather report sent successfully!");
        } else {
            console.error("Weather channel not found!");
        }
    } catch (error) {
        console.error("Error generating weather report message:", error);
    }
};

module.exports = { generateWeatherReportMessage };