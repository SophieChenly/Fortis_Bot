const { generateWeatherReportMessage } = require("./generateWeatherReportMessage");

const weatherCommands = (message, args, client, sharedState) => {
    try {
        if (!args[1]) {
            // Display the weekly weather forecast
            const weeklyForecast = sharedState.weeklyWeather
                .map((weather, index) => `**Day ${index}:** ${weather['Weather Name']} - ${weather['PA Grammo Announcement']}`)
                .join('\n');
            message.channel.send(`**This Week's Weather Forecast:**\n${weeklyForecast}`);
            return;
        }

        if (args[1] === "edit") {
            if (!args[2]) {
                message.reply("Please specify the day (0 for Sunday, 1 for Monday, and so on...) as the first argument.");
                return;
            }

            const dayIndex = parseInt(args[2], 10);
            if (isNaN(dayIndex) || dayIndex < 0 || dayIndex > 6) {
                message.reply("Invalid day. Please provide a number between 0 (Sunday) and 6 (Saturday).");
                return;
            }

            if (!args[3]) {
                message.reply("Please specify the season (Spring, Summer, Autumn, Winter) as the second argument.");
                return;
            }

            const season = args[3].toLowerCase();
            const validSeasons = ['spring', 'summer', 'autumn', 'winter'];
            if (!validSeasons.includes(season)) {
                message.reply("Invalid season. Please choose from Spring, Summer, Autumn, or Winter.");
                return;
            }

            if (!args[4]) {
                message.reply("Please specify the weather name as the third argument.");
                return;
            }

            const weatherName = args.slice(4).join(' '); // Handle multi-word weather names
            const seasonWeatherData = sharedState.weatherData[season];

            // Check if the weather name exists in the selected season
            const selectedWeather = seasonWeatherData.find(
                (weather) => weather['Weather Name'].toLowerCase() === weatherName.toLowerCase()
            );

            if (!selectedWeather) {
                message.reply(`The weather "${weatherName}" does not exist in the ${season} season.`);
                return;
            }

            // Update the weekly weather for the specified day
            sharedState.weeklyWeather[dayIndex] = selectedWeather;
            message.reply(`Updated day ${dayIndex} to ${selectedWeather['Weather Name']}.`);
        } else if (args[1] === "resend") {
            let currentDayIndex;
            
            try {
                currentDayIndex = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
            } catch (error) {
                console.error("Error generating daily weather report: ", error);
                return;
            }

            message.reply("Resending weather report...");
            generateWeatherReportMessage(client, sharedState, currentDayIndex);
        } else {
            message.reply("Invalid command. Use `!weather` to view the forecast or `!weather edit` to modify it.");
        }
    } catch (error) {
        console.error("Error in weatherCommands:", error);
        message.reply("An error occurred while processing your command. Please try again.");
    }
};

module.exports = { weatherCommands };