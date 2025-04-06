const pubgLogoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ku7ynjD6DIcRDtkYeBOxnFABgi_AcmWAYA&s'
const valorantLogoUrl = 'https://i.pinimg.com/736x/39/dc/66/39dc66a4fbaa85dcd12a49f216b60ead.jpg'
const tftLogoUrl = 'https://static.wikia.nocookie.net/leagueoflegends/images/0/09/Runeterra_Reforged_TFT_set_icon.png/revision/latest?cb=20230708150356&path-prefix=ru'

const gamesInfo = [
    {
        value: 'pubg',
        name: 'PUBG',
        logoUrl: pubgLogoUrl,
        mode: [
            { name: "TPP", value: "tpp" },
            { name: "FPP", value: "fpp" },
            { name: "Tất cả", value: "all" },
        ],
        rank: [
            { name: "Unrank", value: "unr", emojiId: "1301079922629935165" },
            { name: "Bronze", value: "bro", emojiId: "1301077593675534398" },
            { name: "Silver", value: "sil", emojiId: "1301077788585099295" },
            { name: "Gold", value: "gol", emojiId: "1301077904960262174" },
            { name: "Platinum", value: "pla", emojiId: "1301078489679532123" },
            { name: "Diamond", value: "dia", emojiId: "1301079027129253948" },
            { name: "Crown", value: "cro", emojiId: "1301079138731429920" },
            { name: "Ace", value: "ace", emojiId: "1301079234092990534" },
            { name: "Tất cả", value: "all", emojiId: "1301082303921131520" },
        ],
    }, {
        value: 'val',
        name: 'VALORANT',
        logoUrl: valorantLogoUrl,
        mode: [
            { name: "Unrate", value: "unr" },
            { name: "Competitive", value: "com" },
            { name: "Tất cả", value: "all" },
        ],
        rank: [
            { name: "Unrank", value: "unr", emojiId: "1301076065141129307" },
            { name: "Iron", value: "iro", emojiId: "1301076003317092375" },
            { name: "Bronze", value: "bro", emojiId: "1301075981649449034" },
            { name: "Silver", value: "sil", emojiId: "1301076063362744331" },
            { name: "Gold", value: "gol", emojiId: "1301075994899255296" },
            { name: "Platinum", value: "pla", emojiId: "1301076055011889183" },
            { name: "Diamond", value: "dia", emojiId: "1301075988595347457" },
            { name: "Ascedant", value: "asc", emojiId: "1301075974376390656" },
            { name: "Immortal", value: "imm", emojiId: "1301076126940008489" },
            { name: "Radiant", value: "rad", emojiId: "1301076056731684874" },
            { name: "Tất cả", value: "all", emojiId: "1301081968431206482" },
        ],
    }, {
        value: 'tft',
        name: 'TFT',
        logoUrl: tftLogoUrl,
        mode: [
            { name: "Thường", value: "unrank" },
            { name: "Hạng", value: "rank" },
            { name: "Tất cả", value: "all" },
        ],
        rank: [
            { name: "Unrank", value: "unr", emojiId: "1358434518419378326" },
            { name: "Iron", value: "iro", emojiId: "1358433284010409995" },
            { name: "Bronze", value: "bro", emojiId: "1358433644925943838" },
            { name: "Silver", value: "sil", emojiId: "1358433765311119470" },
            { name: "Gold", value: "gol", emojiId: "1358433958320275530" },
            { name: "Platinum", value: "pla", emojiId: "1358434070723563634" },
            { name: "Emerald", value: "eme", emojiId: "1301075974376390656" },
            { name: "Master", value: "mas", emojiId: "1358434261845147698" },
            { name: "Grandmaster", value: "gra", emojiId: "1358433141194493983" },
            { name: "Challenger", value: "cha", emojiId: "1358434347580915834" },
            { name: "Tất cả", value: "all", emojiId: "1358436591898726531" },
        ],
    },
];

module.exports = { gamesInfo }
