const { Command } = require('@sapphire/framework');
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message, args) {
        let query = await args.pick('string').catch(() => null)
        if (!query) query = await awaitMessages(message);
        if (!query) return;
        const res = await fetch(`https://registry.npmjs.com/${encodeURIComponent(query)}`).catch(err => console.log(err));
        if (res.status === 404) return message.channel.send('No search results found, maybe try searching for something that exists.');
        const body = await res.json();
        const embed = new MessageEmbed()
            .setColor(0xde2c2c)
            .setTitle(body.name)
            .setURL(`https://www.npmjs.com/package/${body.name}`)
            .setDescription(body.description || 'No description.')
            .addField('❯ Version', body['dist-tags'].latest, true)
            .addField('❯ License', body.license || 'None', true)
            .addField('❯ Author', body.author ? body.author.name : '???', true)
            .addField('❯ Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
            .addField('❯ Modification Date', body.time.modified ? moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss') : 'None', true)
            .addField('❯ Repository', body.repository ? `[View Here](${body.repository.url.split('+')[1]})` : 'None', true)
            .addField('❯ Maintainers', body.maintainers.map(user => user.name).join(', '))
        message.channel.send({
            embeds: [
                embed
            ]
        });


        async function awaitMessages(message) {
            try {
                let npmmodule;

                const askMsg = await message.channel.send('**What do you want to search for?** \nType `cancel` to cancel the command.');

                const filter = (user) => {
                    if (message.author.bot) return
                    if (message.author.id === user.author.id) return true
                };

                const response = await askMsg.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ["time"] })
                    .then((collected) => {
                        if (collected.first().content === 'cancel') return collected.first().react('👍')
                        return npmmodule = collected.first().content
                    })

                return npmmodule;
            } catch (err) {
                console.log(err)
            }
        }
    }
}

exports.UserCommand = UserCommand;
