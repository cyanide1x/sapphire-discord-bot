const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message) {

        const member = message.mentions.users.first()

        if(!member) return

        return message.reply(`${message.author} just fucked ${member}`)
    }
}

exports.UserCommand = UserCommand;
