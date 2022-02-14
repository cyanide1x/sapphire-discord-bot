const { Command } = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js')

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            preconditions: ["OwnerOnly"],
            description: "Reload the bot's commands."
        });
    }

    async messageRun(message) {
        try {
            const reloadMsg = await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription("<a:Loading:939607489127809064> | Reloading...")
                        .setColor(this.container.config.invisembed)
                ]
            })

            await this.container.stores.get('commands').loadAll().then(() => {
                reloadMsg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setDescription("<a:yes:939603920861413386> | Successfully Reloaded All Commands!")
                            .setColor(this.container.config.invisembed)
                    ]
                })
            })
        } catch (err) {
            message.reply("There was an error reloading the commands!")
        }
    }
}

exports.UserCommand = UserCommand;
