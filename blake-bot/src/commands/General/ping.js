const { Command } = require('@sapphire/framework');
const { send } = require('@sapphire/plugin-editable-commands');
const { MessageEmbed } = require('discord.js')

class UserCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			description: 'ping pong'
		});
	}

	async messageRun(message) {
		const msg = await message.reply({
			embeds: [
				new MessageEmbed()
				.setDescription('Ping?')
				.setColor(this.container.config.invisembed)
			]
		})

		const content = `Pong from JavaScript! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
			msg.createdTimestamp - message.createdTimestamp
		}ms.`;

		return msg.edit({
			embeds: [
				new MessageEmbed()
				.setDescription(content)
				.setColor(this.container.config.invisembed)
			]
		})
	}
}

exports.UserCommand = UserCommand;
