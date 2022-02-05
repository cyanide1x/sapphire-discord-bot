require('./lib/setup');
const { LogLevel, SapphireClient, container } = require('@sapphire/framework');
const { prefix, discord_token, emoji } = require('./config.json');
const db = require('quick.db')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')

const client = new SapphireClient({
	defaultPrefix: prefix,
	regexPrefix: /^(hey +)?bot[,! ]/i,
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
	]
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login(discord_token);
		client.emotes = emoji
		client.logger.info('logged in');
		container.ownerName = "Blake"
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
		const status = queue =>
			`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
			}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
		client.distube
			.on('playSong', (queue, song) =>
				queue.textChannel.send(
					`${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user
					}\n${status(queue)}`
				)
			)
			.on('addSong', (queue, song) =>
				queue.textChannel.send(
					`${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
				)
			)
			.on('addList', (queue, playlist) =>
				queue.textChannel.send(
					`${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length
					} songs) to queue\n${status(queue)}`
				)
			)
			.on('error', (channel, e) => {
				channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
				console.error(e)
			})
			.on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
			.on('searchNoResult', (message, query) =>
				message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
			)
			.on('finish', queue => queue.textChannel.send('Finished!'))
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
