const { Command } = require('@sapphire/framework');

class UserCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            aliases: ["gen"],
            preconditions: ["OwnerOnly"]
        });
    }

    async messageRun(message, args) {
        const command = await args.pick("string")

        var exec = require('child_process').exec;

        exec(`npx sapphire generate command ${command}`,
            function (error, stdout, stderr) {
                message.reply(stdout)
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
    }
}

exports.UserCommand = UserCommand;
