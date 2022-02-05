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
            type: "COMPETING",
            name: "in Gay Olympics"
        })
    }
}

exports.UserEvent = UserEvent