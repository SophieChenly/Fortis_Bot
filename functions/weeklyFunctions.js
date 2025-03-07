const { generateWeeklyWeatherReport } = require("./generateWeeklyWeatherReport");

const weeklyFunctions = (client, sharedState) => {
    console.log("Running weekly functions!");
    
    sharedState.weeklyWeather = generateWeeklyWeatherReport(client, sharedState);
    return;
}

module.exports = { weeklyFunctions };