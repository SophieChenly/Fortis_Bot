require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { messageRead } = require('./functions/messageRead');
const { frequentFunctions } = require('./functions/frequentFunctions');
const { dailyFunctions } = require('./functions/dailyFunctions');
const { weeklyFunctions } = require('./functions/weeklyFunctions');
const { setup } = require('./functions/setup');

const FREQUENT_INTERVAL = 5 * 60 * 1000; // 5 minutes
const DAILY_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
const WEEKLY_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 1 week

const sharedState = {
    weatherData: null, // populated during setup
    currentSeason: "Spring",
    weeklyWeather: null,
};

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const scheduleWeeklyAndDailyFunctions = (client, sharedState) => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to next midnight

    const timeUntilMidnight = midnight - now;

    setTimeout(() => {
        setInterval(() => dailyFunctions(client, sharedState), DAILY_INTERVAL);
        setInterval(() => weeklyFunctions(client, sharedState), WEEKLY_INTERVAL);
    }, timeUntilMidnight);
};

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
        const { weatherData } = await setup(client);
        sharedState.weatherData = weatherData;

        weeklyFunctions(client, sharedState);
        console.log("Shared state: ", sharedState);
        dailyFunctions(client, sharedState);

        setInterval(() => frequentFunctions(client), FREQUENT_INTERVAL);
        scheduleWeeklyAndDailyFunctions(client, sharedState);
    } catch (error) {
        console.error('Failed to complete setup:', error);
        process.exit(1);
    }
});

client.on('messageCreate', (message) => {
    messageRead(message);
})

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    client.destroy();
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    client.destroy();
    process.exit();
});

client.login(process.env.TOKEN);