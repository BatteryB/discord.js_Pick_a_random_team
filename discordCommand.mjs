import { REST, Routes, SlashCommandBuilder } from 'discord.js';
const TOKEN = 'TOKEN';
const CLIENT_ID = 'CLIENT_ID';



const commands = [
    {
        name: '인원추가',
        description: '게임 참가 인원을 추가합니다.',
        options: [
            {
                name: '이름',
                description: '이름을 입력해주세요.',
                type: 3,
                require: true
            },
        ],
    },
    {
        name: '인원확인',
        description: '참여한 인원을 확인합니다.'
    },
    {
        name: '인원뽑기',
        description: '선택한 팀 만큼 인원을 뽑습니다.',
        options: [
            {
                name: '팀_갯수',
                description: '팀 갯수를 적어주세요.',
                type: 10,
                require: true
            },
        ],
    }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
