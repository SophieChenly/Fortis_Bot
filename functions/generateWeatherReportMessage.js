const generateWeatherReportMessage = async (client, sharedState) => {
    try {
        console.log("Generating...");
        // Get the current day's weather from the weekly weather report
        const currentDayIndex = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)

        console.log("Shared state: ", sharedState);
        const dailyWeather = sharedState.weeklyWeather[currentDayIndex];

        if (!dailyWeather) {
            console.error("No weather data found for today!");
            return;
        }

        console.log("Current Day Index: ", currentDayIndex);
        console.log("Daily weather: ", dailyWeather);

        // Extract weather details
        const weatherName = dailyWeather['Weather Name'];
        const weatherEffects = dailyWeather['Weather Effects (if any)'];
        const tempRange = dailyWeather['Temp Range (Celsius)'];
        const paGrammoAnnouncement = dailyWeather['PA Grammo Announcement'];

        // Format the weather report message
        const message = `
# **G-G-GOOD MORNING, CITIZENS O-O-OF FORTIS CASTELLUM!**
**${paGrammoAnnouncement}**
*Weather: ${weatherName}*
*Effects: ${weatherEffects || 'None'}*
*Temperature Range (Celsius): ${tempRange}*
        `;

        // Send the message to the weather report channel
        const weatherChannel = await client.channels.fetch(process.env.WEATHER_CHANNEL_ID);

        const imageFileName = weatherName.toLowerCase().replace(/ /g, '_') + '.png';
        const imagePath = `./weather_assets/images/${imageFileName}`; // Path to the image file

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