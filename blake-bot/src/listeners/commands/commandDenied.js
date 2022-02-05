const { Listener } = require('@sapphire/framework');
const Discord = require('discord.js')

class UserEvent extends Listener {
	async run({ context, message: content }, { message }) {
		// `context: { silent: true }` should make UserError silent:
		// Use cases for this are for example permissions error when running the `eval` command.
		if (Reflect.get(Object(context), 'silent')) return;

		const errorEmbed = new Discord.MessageEmbed()
		.setTitle("Error")
		.setColor("RED")
		.setDescription(`\`${content}\``)
		.setFooter(`**Error:** ${message.author.tag}`)

		return message.channel.send({ embeds: [ errorEmbed ], allowedMentions: { users: [message.author.id], roles: [] } });
	}
}

exports.UserEvent = UserEvent;
