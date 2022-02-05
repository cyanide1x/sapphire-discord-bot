const { Listener } = require('@sapphire/framework');

class UserEvent extends Listener {
    constructor(context, options = {}) {
        super(context, {
            ...options
        });
    }

    run(message) {
        if (message.author.bot) return
        
        const isAFK = this.container.db.get(`afk_${message.author.id}`)

        if (isAFK) {
            this.container.db.delete(`afk_${message.author.id}`)

            return message.reply("Welcome back, I have removed your AFK")
        }

        const mentionedMember = message.mentions.users.first()

        if(!mentionedMember) return

        const isMentionAFK = this.container.db.get(`afk_${mentionedMember.id}`)

        if (isMentionAFK) {
            return message.reply(`${mentionedMember} is AFK!`)
        }
    }
}

exports.UserEvent = UserEvent;
