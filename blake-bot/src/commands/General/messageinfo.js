const { Command } = require('@sapphire/framework');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message, args) {
        const option = await args.pick("string").catch(() => null)

        if (!option) {
            message.reply("Use the args **|** \`send, reply\`")
        }

        if (option == 'send') {
            return message.channel.send(`This is using \`message.channel.send("message")\``)
        }

        if (option == 'reply') {
            return message.reply(`This is using \`message.reply("reply")\``)
        }
    }
}

exports.UserCommand = UserCommand;
