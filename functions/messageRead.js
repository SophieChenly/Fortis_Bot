const { rollDice } = require("./rollDice");

const prefix = '!';

const processMessage =  (message) => {
    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    return { command, args };
}

const messageRead = (message) => {
    const { command, args } = processMessage(message) || {};

    if (!command) return; 

    if (command === "pa") {
        if (args.length > 0) {
            console.log("Additional arguments:", args.join(", "));
        }

        switch (args[0]) {
            case "dice":
                rollDice(message, args);
                break;
            case "encounter":
                message.channel.send("SUMMONING MO-O-ONSTERS!");
                break;
            default:
                break;
        }
    }

    return;
};

module.exports = {messageRead};