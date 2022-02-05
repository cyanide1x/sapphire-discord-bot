const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');
const Discord = require('discord.js')

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message) {
        return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle("test")
                .setImage("https://c.tenor.com/qozncDjmF7kAAAAC/oh-no-scared.gif")
            ]
        })
    }
}

exports.UserCommand = UserCommand;
