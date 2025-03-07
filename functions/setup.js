const { loadWeatherData } = require('./importWeatherCsv');

const setup = async (client) => {

    try {
        const weatherData = await loadWeatherData();
        return { weatherData };
    } catch (error) {
        console.error('Error during setup:', error);
        throw error;
    }
};

module.exports = { setup };