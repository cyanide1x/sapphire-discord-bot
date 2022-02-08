const { Command } = require('@sapphire/framework');
const Discord = require('discord.js')

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message) {
        const user = message.mentions.users.first() || message.author

        const member = message.guild.members.cache.get(user.id)

        const embed = new Discord.MessageEmbed()
        .setTitle("Avatar")
        .setImage(member.displayAvatarURL())

        message.reply({
            embeds: [embed]
        })
    }
}

exports.UserCommand = UserCommand;
