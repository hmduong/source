const pubgLogoUrl = 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/444920409_763813159289164_2056353831933342571_n.jpg?stp=dst-jpg_s160x160&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeEq7dQRpHVD-eQHvrCAyEbf3BYMGX6Xiq7cFgwZfpeKrljua_K1wO_Dw6QPcKFRdqGOW7n31kTtt4DgnakDknlT&_nc_ohc=gzFpXJdYlbIQ7kNvgEufysZ&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AmgEuYT0uU_C8ZqMtCsLvVR&oh=00_AYDwS_GSMiaiaj_ggthGhgeWNRYbB0c5VCKwGUpS4OhKUw&oe=67276F23'
const valorantLogoUrl = 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/464337140_986559060152378_8740385744773564702_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFDkjlf5lc2uBixmNtOHfD6TajcdE-LQ5RNqNx0T4tDlOoPLvsTp3YSp5HRNmZxFpI8bcqhdG-Odmuk83URrsWi&_nc_ohc=mIbS4_sNY6cQ7kNvgEza4IE&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=Azq0bIL1CnXT2YDFbxPMoFV&oh=00_AYBDdgQBuccJ01cXXQxXeB-6NjwqheYsImWqy7drCFtNUw&oe=6727946B'

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
    },
];

module.exports = { gamesInfo }