const { Command } = require('@sapphire/framework');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message, args) {
        const string = args.rest('string').catch(() => null)
        if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
        this.container.client.distube.play(message.member.voice.channel, string, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}

exports.UserCommand = UserCommand;
