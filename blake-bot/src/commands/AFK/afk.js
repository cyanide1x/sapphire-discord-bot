const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');

class UserCommand extends SubCommandPluginCommand {
    constructor(context, options) {
        super(context, {
            ...options
        });
    }

    async messageRun(message) {
        const isAFK = this.container.db.get(`afk_${message.author.id}`)

        if(isAFK) return

        this.container.db.set(`afk_${message.author.id}`, true)

        message.reply("You have gone afk!")
    }
}

exports.UserCommand = UserCommand;
