const { Command } = require('@sapphire/framework');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            description: "This is a slash command",
            chatInputCommand: {
                register: true,
                guildIds: ["938551780512518164"]
            }
        });
    }

    async messageRun(message) {
        return message.channel.send('Hello world!');
    }

    async chatInputRun(interaction) {
        return interaction.reply("This is a slash command")
    }
}

exports.UserCommand = UserCommand;
