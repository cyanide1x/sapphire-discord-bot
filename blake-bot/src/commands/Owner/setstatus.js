const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');
const { MessageEmbed } = require('discord.js')

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options,
            preconditions: ["OwnerOnly"]
        });
    }

    async messageRun(message, args) {
        const type = await args.pick("string").catch(() => null)

        if (!type) return message.reply("You need to specify a **status type** | \`playing, watching, listening\`")

        const status = await args.rest('string').catch(() => null)

        if (!status) return message.reply("You need to specify a status!")

        switch (type) {
            case 'playing':
                this.container.client.user.setActivity({
                    type: "PLAYING",
                    name: `${status}`
                })
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription("<:greendot:939612762122883163> | Successfully changed status!")
                        .setColor(this.container.config.invisembed)
                    ]
                })
                break;
            case 'listening':
                this.container.client.user.setActivity({
                    type: "LISTENING",
                    name: `${status}`
                })
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription("<:greendot:939612762122883163> | Successfully changed status!")
                        .setColor(this.container.config.invisembed)
                    ]
                })
                break;
            case 'watching':
                this.container.client.user.setActivity({
                    type: "WATCHING",
                    name: `${status}`
                })
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription("<:greendot:939612762122883163> | Successfully changed status!")
                        .setColor(this.container.config.invisembed)
                    ]
                })
                break;
            case 'competing':
                this.container.client.user.setActivity({
                    type: "COMPETING",
                    name: `${status}`
                })
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setDescription("<:greendot:939612762122883163> | Successfully changed status!")
                        .setColor(this.container.config.invisembed)
                    ]
                })
                break;
        }
    }
}

exports.UserCommand = UserCommand;
