const { Command } = require('@sapphire/framework');
const { MessageEmbed, Message } = require('discord.js')

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            aliases: ['bl'],
            preconditions: ['OwnerOnly']
        });
    }

    async messageRun(message, args) {
        const argument = await args.pick("string").catch(() => null)

        if (!argument) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle("Blacklist System")
                    .setColor("RED")
                    .setDescription("You need to specify an argument **|** \`add, remove, status\`")
                    .setFooter(`Requested by: ${message.author.tag}`)
            ]
        })

        if (argument == 'add') {
            const userToBlacklist = message.mentions.users.first() || await args.pick("string").catch(() => null)

            if (!userToBlacklist) return message.reply("You need to specify a **user** to blacklist!")

            const member = await this.container.client.users.fetch(userToBlacklist).catch(() => null)
            if (!member) return message.reply("This is not a valid user!")
            if (member.id == '758456647860486144') return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`<:BotFunction_Disabled:939605990444244993> | The **Owner** cannot be blacklisted!`)
                ]
            })

            const isBlacklisted = this.container.db.get(`blacklisted_${member.id}`)
            if (isBlacklisted) return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`<:BotFunction_Disabled:939605990444244993> | This user is already blacklisted!`)
                ]
            })

            this.container.db.set(`blacklisted_${member.id}`, true)

            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`<:BotFunction_Enabled:939606007397646387> | <@${member.id}> has successfully been blacklisted!`)
                ]
            })
        }

        if (argument == 'remove') {
            const userToBlacklist = message.mentions.users.first() || await args.pick("string").catch(() => null)

            if (!userToBlacklist) return message.reply("You need to specify a **user** to blacklist!")

            const member = await this.container.client.users.fetch(userToBlacklist).catch(() => null)
            if (!member) return message.reply("This is not a valid user!")
            if (member.id == '758456647860486144') return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`<:BotFunction_Disabled:939605990444244993> | The **Owner** cannot be blacklisted!`)
                ]
            })

            const isBlacklisted = this.container.db.get(`blacklisted_${member.id}`)
            if (!isBlacklisted) return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`<:BotFunction_Disabled:939605990444244993> | This user is not blacklisted!`)
                ]
            })

            this.container.db.delete(`blacklisted_${member.id}`)

            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`<:BotFunction_Enabled:939606007397646387> | <@${member.id}> has successfully been unblacklisted!`)
                ]
            })
        }

        if (argument == 'status') {
            const userToBlacklist = message.mentions.users.first() || await args.pick("string").catch(() => null)

            if (!userToBlacklist) return message.reply("You need to specify a **user** to blacklist!")

            const member = await this.container.client.users.fetch(userToBlacklist).catch(() => null)
            if (!member) return message.reply("This is not a valid user!")

            const isBlacklisted = this.container.db.get(`blacklisted_${member.id}`)

            const statusmsg = await message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription(`<a:Loading:939607489127809064> | Fetching Status...`)
                ]
            })

            if (!isBlacklisted) return setTimeout(() => {
                statusmsg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RED")
                            .setDescription(`<:BotFunction_Disabled:939605990444244993> | This user is not blacklisted!`)
                    ]
                })
            }, 750);

            if (isBlacklisted) return setTimeout(() => {
                statusmsg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("GREEN")
                            .setDescription(`<:BotFunction_Enabled:939606007397646387> | This user is blacklisted!`)
                    ]
                })
            }, 750);
        }
    }
}

exports.UserCommand = UserCommand;
