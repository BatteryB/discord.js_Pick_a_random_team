import { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = 'TOKEN';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let member = [];

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === '인원추가') {
        try {
            let memberName = interaction.options.getString('이름');
            if (!memberName) {
                await interaction.reply({ content: '참여 할 사람의 이름을 적어주세요.', ephemeral: true });
            } else {
                member.push(memberName);
                await interaction.reply(memberName + '이(가) 참여하였습니다.');
            }
        } catch (e) {
            await interaction.reply(memberEmbed);
        }
    }

    if (interaction.commandName === '인원확인') {
        if (member.length > 0) {
            let memberList = member.join('\n');

            let memberEmbed = new EmbedBuilder()
                .setTitle('현재 참여한 인원')
                .setDescription(memberList)
                .setColor(0x0099FF);

            await interaction.reply({ embeds: [memberEmbed] });
        } else {
            await interaction.reply({ content: '먼저 인원을 추가해주세요', ephemeral: true });
        }
    }

    if (interaction.commandName === '인원뽑기') {
        try {
            let teamNum = interaction.options.getNumber('팀_갯수');

            if (member.length < 1) {
                await interaction.reply({ content: '먼저 인원을 추가해주세요', ephemeral: true });
            } else if (!teamNum) {
                await interaction.reply({ content: '팀 갯수를 적어주세요', ephemeral: true });
            } else if (teamNum < 2) {
                await interaction.reply({ content: '팀 갯수는 최소 2개 이상이어야 합니다.', ephemeral: true });
            } else if (teamNum > member.length) {
                await interaction.reply({ content: '팀의 갯수는 인원 수 보다 적을 수 없습니다.', ephemeral: true });
            } else {
                member.sort(() => Math.random() - 0.5);
                let teamArr = Array.from({ length: teamNum }, () => []);

                for (let i = 0; i < member.length; i++) {
                    let teamIndex = i % teamNum;
                    teamArr[teamIndex].push(member[i]);
                }

                let teamPrint = '==========\n';
                for (let i = 0; i < teamArr.length; i++) {
                    teamPrint += (i + 1) + '`팀`\n' + teamArr[i].join('\n');
                    teamPrint += '\n==========\n'
                }

                let teamEmbed = new EmbedBuilder()
                    .setTitle('팀이 정해졌습니다!')
                    .setDescription(teamPrint)
                    .setColor(0x0099FFF);

                member = [];

                await interaction.reply({ embeds: [teamEmbed] });
            }
        } catch (e) {
            await interaction.reply(e);
        }
    }
});

client.login(TOKEN);