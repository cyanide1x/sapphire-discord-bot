const { Command } = require('@sapphire/framework');
const { send } = require('@sapphire/plugin-editable-commands');
const { MessageEmbed } = require('discord.js')

class UserCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			description: 'ping pong',
			chatInputCommand: {
				register: true,
				guildIds: ["938551780512518164"]
			}
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

		const content = `Pong from JavaScript! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp
			}ms.`;

		return msg.edit({
			embeds: [
				new MessageEmbed()
					.setDescription(content)
					.setColor(this.container.config.invisembed)
			]
		})
	}

	async chatInputRun(interaction) {
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setDescription('Ping?')
					.setColor(this.container.config.invisembed)
			]
		})

		const content = `Pong from JavaScript! Bot Latency ${Math.round(this.container.client.ws.ping)}ms.`;

		return interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setDescription(content)
					.setColor(this.container.config.invisembed)
			]
		})
	}
}

exports.UserCommand = UserCommand;
