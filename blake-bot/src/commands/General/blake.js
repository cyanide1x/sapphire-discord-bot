const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message) {
        message.channel.send("Its wingardium leviosaaa not faggot-osa")
        return message.reply("declan is a fucking loser")
    }
}

exports.UserCommand = UserCommand;
