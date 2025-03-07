const fs = require('fs');
const csv = require('csv-parser');

const filePaths = {
    spring: './weather_assets/weather_report_spring.csv',
    summer: './weather_assets/weather_report_summer.csv',
    autumn: './weather_assets/weather_report_autumn.csv',
    winter: './weather_assets/weather_report_winter.csv',
};

const loadWeatherData = async () => {
    const weatherData = {
        spring: [],
        summer: [],
        autumn: [],
        winter: [],
    };

    const loadFile = (filePath) => {
        return new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => data.push(row))
                .on('end', () => resolve(data))
                .on('error', (error) => reject(error));
        });
    };

    try {
        const [springData, summerData, autumnData, winterData] = await Promise.all([
            loadFile(filePaths.spring),
            loadFile(filePaths.summer),
            loadFile(filePaths.autumn),
            loadFile(filePaths.winter),
        ]);

        weatherData.spring = springData;
        weatherData.summer = summerData;
        weatherData.autumn = autumnData;
        weatherData.winter = winterData;

        return weatherData;
    } catch (error) {
        console.error('Error loading weather data:', error);
    }
};

module.exports = { loadWeatherData };