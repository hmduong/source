const {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});
const dotenv = require("dotenv");
dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Tìm người chơi")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("Game")
        .setRequired(true)
        .addChoices( 
          { name: "PUBG", value: "pubg" }, 
          { name: "VALORANT", value: "valorant" }
        )
    )
    .addStringOption((option) =>
      option.setName("mode").setDescription("Game mode").setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("rank")
        .setDescription("Player's rank")
        .setAutocomplete(true)
    ),
].map((command) => command.toJSON());

const gameOptions = {
  pubg: {
    mode: [{ name: 'Tất cả', value: 'all'}, { name: 'TPP', value: 'tpp'}, { name: 'FPP', value: 'fpp'}],
    rank: [{ name: 'Tất cả', value: 'all'}, { name: 'Unrank', value: 'unrank'}, { name: 'Bronze', value: 'bronze'}],
  },
  valorant: {
    mode: [{ name: 'Tất cả', value: 'all'}, { name: 'Unrate', value: 'unrate'}, { name: 'Competitive', value: 'competitive'}],
    rank: [{ name: 'Tất cả', value: 'all'}, { name: 'Unrank', value: 'unrank'}, { name: 'Iron', value: 'iron'}, { name: 'Bronze', value: 'bronze'}],
  },
};

(async () => {
  try {
    console.log(
      `Started refreshing application (/) commands for guild ${process.env.GUILD_ID}.`
    );
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands for guild.");
  } catch (error) {
    console.error(error);
  }
})();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Handle interactions
client.on("interactionCreate", async (interaction) => {
  const { commandName } = interaction;

  switch (commandName) {
    case "invite":
      if (interaction.isAutocomplete()) {
        const game = interaction.options.getString("game");
        const selectedInfo = interaction.options._hoistedOptions;
        const focusing = [...selectedInfo].pop().name;
        let choices = []
        if (game) {
            choices = gameOptions[game][focusing].map((choice) => ({ name: choice.name, value: choice.value }));
        } else {
            choices = [{ name: 'Tất cả',  value: 'all' }]
        }
        console.log("z3no3k game: ", game);
        console.log("z3no3k selectedInfo: ", selectedInfo);
        console.log("z3no3k focusing: ", focusing);
        console.log("z3no3k choices: ", choices);

        await interaction.respond(choices);
      } else if (interaction.isCommand()) {
        let member = interaction.member; 
        let memberRoles = member.roles.cache.map(role => role.name);
        let channel = member?.voice?.channel
        let category = channel?.parent
        let game = interaction.options.getString('game') || category?.name.toLowerCase() || ''
        let mode = interaction.options.getString('mode') || 'all'
        let rank = interaction.options.getString('rank') || 'all'
        let result = {
            success: false,
            error: ''
        }
        if (!game) {
            error = `Bạn chưa chọn game.`
            return
        }
        if (!Object.keys(gameOptions).includes(game)) {
            error = `Game không hợp lệ! Vui lòng chọn game trong danh sách tùy chọn.`
            return
        }
        if (!memberRoles?.includes(game)) {
            error = `Bạn chưa đăng kí vai trò người chơi game ${game.toUpperCase()}. Vui lòng làm theo hướng dẫn máy chủ để được cấp vai trò.`
            return
        }
        if (category?.name.toLowerCase() !== game && channel) {
            error = `Hãy tham gia kênh thoại cho game ${game.toUpperCase()} trước.`
            return
        }
        if (result.success) {    
            const embed = new EmbedBuilder()
            .setColor('#199980')
            .setTitle('Player Invitation')
            .setDescription('You have initiated a player invitation.')
            .addFields(
              { name: 'Game Selected', value: game, inline: true },
              { name: 'Status', value: 'Waiting for players to join...', inline: true }
            )
            .setTimestamp() 
            .setFooter({ text: 'Use /invite again to adjust your options!' }); 
            const button = new ButtonBuilder()
                .setLabel(`Join Voice Channel ${channel.name}`)
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`);
            const row = new ActionRowBuilder().addComponents(button);
            await interaction.reply({ embeds: [embed], components: [row] });
        } else {
            await interaction.reply(result.error);
        }
      }
      break;

    default:
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);
