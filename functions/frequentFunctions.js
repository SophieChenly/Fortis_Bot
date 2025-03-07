const { checkTimeAndUpdateChannel } = require("./updateTimeChannel");

const frequentFunctions = (client) => {
    console.log("Running frequent functions!");
    checkTimeAndUpdateChannel(client);
    return;
}

module.exports = { frequentFunctions };