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
    GatewayIntentBits.GuildVoiceStates
  ],
});
const { gamesInfo } = require("./const.js")
const dotenv = require("dotenv");
dotenv.config();

const env = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  GUILD_ID: process.env.GUILD_ID,
  WEBHOOK_URL: process.env.WEBHOOK_URL
};

const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Tìm người chơi")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("Game")
        .setRequired(true)
        .addChoices(gamesInfo.map(game => ({ name: game.name, value: game.value })))
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

(async () => {
  try {
    console.log(
      `Started refreshing application (/) commands for guild ${env.GUILD_ID}.`
    );
    await rest.put(
      Routes.applicationGuildCommands(
        env.CLIENT_ID,
        env.GUILD_ID
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

const inviteAutocompleteExecute = async (interaction) => {
  let game = gamesInfo.find(game => game.value === interaction.options.getString("game"))
  const options = interaction.options._hoistedOptions;
  const focusing = options.find(option => option.focused)
  let choices = []
  if (game) {
    choices = game[focusing.name].map(choice => ({ name: choice.name, value: choice.value }));
  } else {
    choices = [{ name: 'Tất cả', value: 'all' }]
  }
  console.log("z3no3k log: isAutocomplete --------------------------------------");
  console.log("z3no3k game: ", game);
  console.log("z3no3k options: ", options);
  console.log("z3no3k focusing: ", focusing);
  console.log("z3no3k choices: ", choices);
  console.log("z3no3k log: isAutocomplete --------------------------------------");
  await interaction.respond(choices);
}

const inviteCommandExecute = async (interaction) => {
  let result = {
    success: true,
    error: ''
  }
  let member = interaction.member;
  let memberRoles = member.roles.cache.map(role => role.name);
  let channel = member?.voice?.channel
  let category = channel?.parent?.name
  let game = gamesInfo.find(game => game.value === interaction.options.getString('game'))
  let mode = game.mode.find(mode => mode.value === (interaction.options.getString('mode') || 'all'))
  let rank = game.rank.find(rank => rank.value === (interaction.options.getString('rank') || 'all'))

  console.log("🚀  z3no3k log: isCommand --------------------------------------");
  console.log("🚀  z3no3k member: ", member);
  console.log("🚀  z3no3k voiceStates: ", member.voiceStates);
  console.log("🚀  z3no3k memberRoles: ", memberRoles);
  console.log("🚀  z3no3k channel: ", channel);
  console.log("🚀  z3no3k category: ", category);
  console.log("🚀  z3no3k game: ", game);
  console.log("🚀  z3no3k mode: ", mode);
  console.log("🚀  z3no3k rank: ", rank);
  console.log("🚀  z3no3k log: isCommand --------------------------------------");
  if (!game) {
    result.error = `Bạn chưa chọn game.`
    result.success = false
  } else if (!mode || !rank) {
    result.error = `Lỗi gọi lệnh. Vui lòng thử lại.`
    result.success = false
  } else if (!memberRoles?.includes(game.name)) {
    result.error = `Bạn chưa đăng kí vai trò người chơi game ${game.name}. Vui lòng làm theo hướng dẫn máy chủ để được cấp vai trò.`
    result.success = false
  } else if (category !== game.name && !channel) {
    result.error = `Hãy tham gia kênh thoại cho game ${game.name} trước khi tạo lời mời.`
    result.success = false
  }
  if (result.success) {
    console.log("z3no3k log: isCommand success");
    const embed = new EmbedBuilder()
      .setColor('#199980')
      .setTitle(`Lobby ${game.name} của ${member.user.username}`)
      .setThumbnail(member.user.displayAvatarURL())
      .setAuthor({
        name: game.name,
        iconURL: game.logoUrl
      })
      .addFields(
        { name: 'Mode', value: mode.name, inline: true },
        { name: 'Rank', value: rank.emojiId ? `${rank.name} <:${game.value}_${rank.value}:${rank.emojiId}>` : rank.name, inline: true },
        { name: 'Lobby', value: `${channel.members.size}/${(channel.userLimit || 'Unlimited')}`, inline: true }
      )
      .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`)
      .setTimestamp()
      .setFooter({ text: 'Sử dụng câu lệnh /invite để tạo lời mời.' });
    const button = new ButtonBuilder()
      .setLabel(`Tham gia ${channel.name}`)
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.com/channels/${interaction.guild.id}/${channel.id}`);
    const row = new ActionRowBuilder().addComponents(button);
    await interaction.reply({ embeds: [embed], components: [row] });
    const webhookPayload = {
      embeds: [embed],
      components: [row]
    };

    // Send the webhook message
    await rest.post(
      env.WEBHOOK_URL,
      { body: webhookPayload }
    );
  } else {
    console.log("z3no3k log: isCommand error: ", result.error);
    await interaction.reply(result.error);
  }
}

client.on("interactionCreate", async (interaction) => {
  try {
    const { commandName } = interaction;
    switch (commandName) {
      case "invite":
        if (interaction.isAutocomplete()) {
          await inviteAutocompleteExecute(interaction)
        } else if (interaction.isCommand()) {
          await inviteCommandExecute(interaction)
        }
        break;

      default:
        await interaction.reply('Câu lệnh không khả dụng.');
        break;
    }
  } catch (error) {
    console.log(`🚀  file: bot.js:186  client.on  error:`, error)
  }
});

client.login(env.DISCORD_TOKEN);