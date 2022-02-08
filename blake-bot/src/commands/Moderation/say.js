const { Command } = require('@sapphire/framework');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            aliases: ['in'],
            preconditions: ['OwnerOnly']
        });
    }

    async messageRun(message, args) {
        const content = await args.rest("string").catch(() => null)

        if(!content) return message.reply("You need to say something dipshit.")

        message.channel.send(content)
    }
}

exports.UserCommand = UserCommand;
