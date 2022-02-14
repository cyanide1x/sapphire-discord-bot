const { Command } = require("@sapphire/framework");

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            description: "This is a testing command"
        })
    }

    async messageRun(message) {
        return message.reply("This is a testing command.")
    }
}

exports.UserCommand = UserCommand;