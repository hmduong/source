const {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
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
    mode: [],
    rank: [],
  },
  valorant: {
    mode: [],
    rank: [],
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
        const options = gameOptions[game];
        let choices = options[focusing];
        console.log("z3no3k game: ", game);
        console.log("z3no3k selectedInfo: ", selectedInfo);
        console.log("z3no3k focusing: ", focusing);
        console.log("z3no3k options: ", options);
        console.log("z3no3k choices: ", choices);
        let filtered = choices.filter((choice) =>
          choice.toLowerCase().includes(focusedOption.toLowerCase())
        );
        await interaction.respond(
          filtered.map((choice) => ({ name: choice, value: choice }))
        );
      } else if (interaction.isCommand()) {
        console.log("z3no3k interaction.options: ", interaction.options);
        // const member = interaction.member; 
        // const roles = member.roles.cache.map(role => role.name);
        // if (roles?.includes(state.inviteRole)) {
        //     await interaction.reply(`Lobby ${state.inviteRole}`);
        // } else {
        //     await interaction.reply(`Bạn cần phải có vai trò là người chơi ${state.inviteRole}. Liên hệ MOD để được hỗ trợ.`);
        // }
      }
      break;

    default:
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);
