const { Command } = require('@sapphire/framework');
const { codeBlock } = require('@sapphire/utilities');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            aliases: ["sh"],
            preconditions: ["OwnerOnly"]
        });
    }

    async messageRun(message, args) {
        const command = await args.rest("string").catch(() => null)

        if(!command) return message.reply("You need to specify a command!")

        var exec = require('child_process').exec;

        exec(`${command}`,
            function (error, stdout, stderr) {
                message.reply(codeBlock('bash', stdout))
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
    }
}

exports.UserCommand = UserCommand;
