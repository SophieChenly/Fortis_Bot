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

    console.log("Command = ", command);
    console.log("Args = ", args);

    if (!command) return; 

    if (command === "pa") {
        if (args.length > 0) {
            console.log("Additional arguments:", args.join(", "));
        }

        switch (args[0]) {
            case "dice":
                console.log("Rolling dice");
                rollDice(message, args);
                break;
            default:
                break;
        }
    }

    return;
};

module.exports = {messageRead};