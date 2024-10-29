const { Client, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent
    ]
});
const dotenv = require('dotenv');
dotenv.config();

const state = (() => {
    const _state = {
        invite: {
            role: ''
        }
    };

    return {
        get inviteRole() {
            return _state.invite.role;
        },
        set inviteRole(value) {
            _state.invite.role = value;
        },
        resetInviteRole() {
            _state.invite.role = '';
        }
    };
})();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

const commands = [
    new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Shows a selection menu')
        .addStringOption(option =>
            option
                .setName('pubg')
                .setAutocomplete(true) // Enable autocomplete for category
                .setDescription('.')
        )
        .addStringOption(option =>
            option
                .setName('valorant')
                .setAutocomplete(true) // Enable autocomplete for item
                .setDescription('.')
        )
].map(command => command.toJSON());

(async () => {
    try {
        console.log(`Started refreshing application (/) commands for guild ${process.env.GUILD_ID}.`);
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands for guild.');
    } catch (error) {
        console.error(error);
    }
})();

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Handle interactions
client.on('interactionCreate', async interaction => {
    const { commandName } = interaction

    switch (commandName) {
        case 'invite':
            if (interaction.isAutocomplete()) {
                const focusedOption = interaction.options.getFocused();
                const role = interaction.options._hoistedOptions.pop().name
                let choices = [];

                if (role === 'pubg') {
                    state.inviteRole = role
                    choices = ['Chicken Dinner', 'Battle Royale', 'Sniper Mode'];
                } else if (role === 'valorant') {
                    state.inviteRole = role
                    choices = ['Spike Rush', 'Deathmatch', 'Unrated'];
                }
                let filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.toLowerCase()));

                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            } else if (interaction.isCommand()) {
                const member = interaction.member; // This gives the guild member who executed the command

                // Get the roles
                const roles = member.roles.cache.map(role => role.name);
                if (roles?.includes(state.inviteRole)) {
                    await interaction.reply(`Lobby ${state.inviteRole}`);
                } else {
                    await interaction.reply(`Bạn cần phải có vai trò là người chơi ${state.inviteRole}. Liên hệ MOD để được hỗ trợ.`);
                }
                state.resetInviteRole();
            }
            break;

        default:
            break;
    }
});
client.login(process.env.DISCORD_TOKEN);
