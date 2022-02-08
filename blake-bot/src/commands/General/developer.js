const { Command } = require('@sapphire/framework');
const { MessageEmbed, MessageActionRow, MessageButton, } = require('discord.js')

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            aliases: ['dev']
        });
    }

    async messageRun(message) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Portfolio")
            .setURL("https://cyanide.codes")
            .setStyle("LINK")
        )
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setTitle("Developer")
                .setColor("AQUA")
                .setDescription("My **developer** is -  *cyanide#0001* | \`758456647860486144\`\n\nHe is a **Full Stack** developer fluent in \`HTML, CSS, JavaScript, and Python\`.")
            ],
            components: [
                row
            ]
        })
    }
}

exports.UserCommand = UserCommand;
