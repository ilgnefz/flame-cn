const tutorials = {
    text: "教程",
    link: "/guide/tutorials/bare_flame_game.md",
    collapsible: true,
    children: [
        {
            text: "Bare Flame game",
            link: "/guide/tutorials/bare_flame_game.md"
        }, {
            text: "Klondike",
            link: "/guide/tutorials/klondike/step1.md",
            collapsible: true,
            children: [
                {
                    text: "1.准备",
                    link: "/guide/tutorials/klondike/step1.md"
                }, {
                    text: "2.脚手架",
                    link: "/guide/tutorials/klondike/step2.md"
                }, {
                    text: "3.卡片",
                    link: "/guide/tutorials/klondike/step3.md"
                }, {
                    text: "待续...",
                    link: "/guide/tutorials/klondike/tbc.md"
                }
            ]
        }
    ]
}


module.exports = tutorials