const { Listener } = require('@sapphire/framework');

class UserEvent extends Listener {
	async run({ context, message: content }, { interaction }) {
		if (Reflect.get(Object(context), 'silent')) return;

		return interaction.reply({
			content,
			allowedMentions: { users: [interaction.member.user.id], roles: [] },
			ephemeral: true
		});
	}
}

exports.UserEvent = UserEvent;