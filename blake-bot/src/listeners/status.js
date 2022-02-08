const { Listener } = require("@sapphire/framework");

class UserEvent extends Listener {
    constructor(context, options = { }) {
        super(context, {
            ...options,
            once: true,
            event: "ready"
        })
    }

    run() {
        this.setStatus()
    }

    setStatus() {
        const { client } = this.container

        client.user.setActivity({
            type: "WATCHING",
            name: "@Sapphire/framework"
        })
    }
}

exports.UserEvent = UserEvent