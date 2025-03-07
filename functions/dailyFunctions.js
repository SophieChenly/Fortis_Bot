const { generateDailyWeatherReport } = require("./generateDailyWeatherReport");

const dailyFunctions = (client, sharedState) => {
    console.log("Running daily functions!");
    generateDailyWeatherReport(client, sharedState);
    return;
}

module.exports = { dailyFunctions };