const { generateWeatherReportMessage } = require("./generateWeatherReportMessage");

const generateDailyWeatherReport = async (client, sharedState) => {
    let currentDayIndex;

    try {
        currentDayIndex = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
    } catch (error) {
        console.error("Error generating daily weather report: ", error);
        return;
    }

    generateWeatherReportMessage(client, sharedState, currentDayIndex);
};

module.exports = { generateDailyWeatherReport };