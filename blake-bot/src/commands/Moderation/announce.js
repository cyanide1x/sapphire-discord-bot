const { Command } = require('@sapphire/framework');
const Discord = require('discord.js')

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            preconditions: ['OwnerOnly']
        });
    }

    async messageRun(message, args) {
        const announcementChannelID = '938575947949568090'

        const announcementChannel = message.guild.channels.cache.get(announcementChannelID)

        const announcementMessage = await args.rest('string')

        announcementChannel.send({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle("Announcement")
                .setDescription(announcementMessage)
                .setFooter(`Announcement request by: ${message.author.tag}`)
            ]
        })
    }
}

exports.UserCommand = UserCommand;
