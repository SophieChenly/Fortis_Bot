const rollDice = (message, args) => {
    let diceRoll = "1d6"; 
    let rollResult = 0;
    let rollString = "🎲 R-r-rolling " + diceRoll;

    if (!args[1]) {
        rollResult = Math.floor(Math.random() * 6) + 1;
    } else {
        const dicePattern = /^(\d+)d(\d+)$/;
        const match = args[1].match(dicePattern);

        if (match) {
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            diceRoll = `${x}d${y}`;
            rollString = `🎲 R-r-rolling ${diceRoll}`;

            const rolls = [];
            for (let i = 0; i < x; i++) {
                const roll = Math.floor(Math.random() * y) + 1;
                rolls.push(roll);
                rollResult += roll;
            }

            rollString += `: ${rolls.join(", ")}`;
        } else {
            return message.reply("❌ I-i-innnvalid dice fo-o-ormat. Use 'xdy' (e.g., '2d6')!");
        }

        if (args[2]) {
            const bonusPattern = /^([+-]\d+)$/; 
            const bonusMatch = args[2].match(bonusPattern);

            if (bonusMatch) {
                const z = parseInt(bonusMatch[1], 10);
                rollResult += z;
                rollString += ` ${z >= 0 ? "+" : "-"} ${Math.abs(z)}`;
            } else {
                return message.reply("❌ I-i-innnvalid modifier fo-o-ormat. Use '+z' or '-z' (e.g., '+5' or '-3')!");
            }
        }
    }

    message.reply(`${rollString} = **${rollResult}**`);
};

module.exports = { rollDice };