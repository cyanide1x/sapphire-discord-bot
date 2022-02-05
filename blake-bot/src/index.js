require('./lib/setup');
const { LogLevel, SapphireClient, container } = require('@sapphire/framework');
const config = require('./config.json');
const db = require('quick.db')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')

const client = new SapphireClient({
	defaultPrefix: config.prefix,
	regexPrefix: /^(hey +)?retard[,! ]/i,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS'
	],
	fetchPrefix: fetchPrefix
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login(config.discord_token);
		client.emotes = config.emoji
		client.logger.info('logged in');
		container.config = config
		container.db = db
		client.distube = new DisTube(client, {
			leaveOnStop: false,
			emitNewSongOnly: true,
			emitAddSongWhenCreatingQueue: false,
			emitAddListWhenCreatingQueue: false,
			plugins: [
				new SpotifyPlugin({
					emitEventsAfterFetching: true
				}),
				new SoundCloudPlugin()
			]
		})
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();

async function fetchPrefix() {
	return ['declan?', 'j?', '..', 'penis', 'dickweed', '?']
}