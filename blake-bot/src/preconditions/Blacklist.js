const { Precondition } = require('@sapphire/framework');

class UserPrecondition extends Precondition {
	constructor(context, options) {
		super(context, {
			...options,
			position: 11
		})
	}
	messageRun(message) {
		const isBlacklisted = this.container.db.get(`blacklisted_${message.author.id}`)

		if(isBlacklisted) return this.error({ message: "You are blacklisted from using me!" })

		if(!isBlacklisted) return this.ok()
	}

	chatInputRun(interaction) {
		const isBlacklisted = this.container.db.get(`blacklisted_${interaction.user.id}`)

		if(isBlacklisted) return this.error({ message: "You are blacklisted from using me!" })

		if(!isBlacklisted) return this.ok()
	}
}

module.exports.UserPrecondition = UserPrecondition;
