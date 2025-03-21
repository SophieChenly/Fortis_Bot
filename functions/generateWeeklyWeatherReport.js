let weatherSelection = null; // Possible weather for this season
let weeklyWeather = null; // Weather for this week

const generateWeeklyWeatherReport = (client, sharedState) => {
    setSeason(sharedState);

    weeklyWeather = [];
    let hasRare = 0;
    for (let i = 0; i < 7; i++) {
        const rarity = rollForRarity();
        if (rarity === 'veryRare' || rarity === 'rare') {
            hasRare = 1;
        }
        const dailyWeather = selectDailyWeather(rarity, weatherSelection);
        weeklyWeather.push(dailyWeather);
    }

    if (hasRare == 0) {
        console.log("No rare weather effects. Adding one at random: ");
        const roll = Math.floor(Math.random() * 6);
        const flip = Math.floor(Math.random() * 5);

        // Tweaked veryRare weather chance to 1 in 5
        if (flip != 1) {
            weeklyWeather[roll] = selectDailyWeather('rare', weatherSelection);
        } else {
            weeklyWeather[roll] = selectDailyWeather('veryRare', weatherSelection);
        }

    }

    return weeklyWeather;
};

// Sets possible weather selection based on season
const setSeason = (sharedState) => {
    switch (sharedState.currentSeason) {
        case "Spring":
            weatherSelection = sharedState.weatherData.spring;
            break;
        case "Summer":
            weatherSelection = sharedState.weatherData.summer;
            break;
        case "Autumn":
            weatherSelection = sharedState.weatherData.autumn;
            break;
        case "Winter":
            weatherSelection = sharedState.weatherData.winter;
            break;
        default:
            console.error("Error loading sharedState for weather report!");
            break;
    }
};

// Rolls a number between 1-100 to determine the rarity of the weather
const rollForRarity = () => {
    const roll = Math.floor(Math.random() * 100) + 1; // Roll between 1 and 100

    if (roll <= 50) return 'veryCommon'; // 1-50: Very Common
    if (roll <= 70) return 'common'; // 51-70: Common
    if (roll <= 85) return 'uncommon'; // 71-85: Uncommon
    if (roll <= 95) return 'rare'; // 86-95: Rare
    return 'veryRare'; // 96-100: Very Rare
};

// Selects a random weather of a certain rarity from possible weather selection
const selectDailyWeather = (rarity, weatherSelection) => {
    const weatherList = getWeatherListByRarity(rarity, weatherSelection);

    if (weatherList.length === 0) {
        console.error(`No weather conditions found for rarity: ${rarity}`);
        return null;
    }

    // Select a random weather condition from the list
    const randomIndex = Math.floor(Math.random() * weatherList.length);
    return weatherList[randomIndex];
};

// Filters weather data by rarity
const getWeatherListByRarity = (rarity, weatherData) => {
    switch (rarity) {
        case 'veryCommon':
            return weatherData.filter((weather) => weather['Weather Rarity'] === 'Very Common');
        case 'common':
            return weatherData.filter((weather) => weather['Weather Rarity'] === 'Common');
        case 'uncommon':
            return weatherData.filter((weather) => weather['Weather Rarity'] === 'Uncommon');
        case 'rare':
            return weatherData.filter((weather) => weather['Weather Rarity'] === 'Rare');
        case 'veryRare':
            return weatherData.filter((weather) => weather['Weather Rarity'] === 'Very Rare');
        default:
            return [];
    }
};

module.exports = { generateWeeklyWeatherReport };