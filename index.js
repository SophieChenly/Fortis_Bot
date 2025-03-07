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

// Function to calculate the time until the next midnight
const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to next midnight
    return midnight - now;
};

// Schedule daily and weekly functions to run at midnight
const scheduleDailyAndWeeklyFunctions = (client, sharedState) => {
    const timeUntilMidnight = getTimeUntilMidnight();

    setTimeout(() => {
        console.log("Midnight. Running daily and weekly functions.");
        // Set up with initial functions
        dailyFunctions(client, sharedState);
        // Run the weekly function if today is the start of the week (Sunday)
        const today = new Date().getDay();
        if (today === 0) {
            weeklyFunctions(client, sharedState);
        }

        // Schedule the next run at the next midnight
        setInterval(() => {
            console.log("Midnight. Running daily and weekly functions.");

            // Run the daily function
            dailyFunctions(client, sharedState);

            // Run the weekly function if today is the start of the week (Sunday)
            const today = new Date().getDay();
            if (today === 0) { // 0 = Sunday
                weeklyFunctions(client, sharedState);
            }
        }, DAILY_INTERVAL);
    }, timeUntilMidnight);
};

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    try {
        const { weatherData } = await setup(client);
        sharedState.weatherData = weatherData;

        // Initial setup
        weeklyFunctions(client, sharedState);
        dailyFunctions(client, sharedState);

        // Start frequent functions
        setInterval(() => frequentFunctions(client), FREQUENT_INTERVAL);

        // Schedule daily and weekly functions to run at midnight
        scheduleDailyAndWeeklyFunctions(client, sharedState);
    } catch (error) {
        console.error('Failed to complete setup:', error);
        process.exit(1);
    }
});

client.on('messageCreate', (message) => {
    messageRead(message, client, sharedState);
});

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