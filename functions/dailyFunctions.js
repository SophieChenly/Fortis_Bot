const { generateWeatherReportMessage } = require("./generateWeatherReportMessage");

const dailyFunctions = (client, sharedState) => {
    // stub
    console.log("Running daily functions!");
    generateWeatherReportMessage(client, sharedState);
    return;
}

module.exports = { dailyFunctions };