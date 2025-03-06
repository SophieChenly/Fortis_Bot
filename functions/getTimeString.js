// getChannelName.js
const moment = require('moment-timezone');

function getTimeString(currTime) {
    const split = currTime.split(" ");
    const time = parseInt(split[0]);
    const a = split[1];

    // sunrise + sunset 🌄 (6am/pm)
    // day 🏞 (7am-5pm) -> 7-11am + 12-5pm
    // night 🌌 (7pm-5am) -> 7-11pm + 12-5am

    if (time == 6) {
        return `🌄 ${time}${a}`;
    } else if (time <= 11 && time >= 7 ) {
        if (a == "AM") {
            return `🏞 ${time}${a}`;
        } else if (a == "PM") {
            return `🌌 ${time}${a}`;
        } else {
            console.error("Error parsing AM/PM: " + a);
            return "error";
        }
    } else if (time == 12 || time <= 5) {
        if (a == "AM") {
            return `🌌 ${time}${a}`;
        } else if (a == "PM") {
            return `🏞 ${time}${a}`;
        } else {
            console.error("Error parsing AM/PM");
            return "error";
        }
    } else {
        console.error("Error parsing time: " + currTime);
        return "error";
    }
}

module.exports = getTimeString;