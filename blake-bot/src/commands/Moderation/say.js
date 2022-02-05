const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message, args) {
        const content = await args.rest("string").catch(() => null)

        if(!content) return message.reply("You need to say something dipshit.")

        message.channel.send(content)
    }
}

exports.UserCommand = UserCommand;
