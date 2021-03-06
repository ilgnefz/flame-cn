const tutorials = {
    text: "教程",
    link: "/guide/tutorials/tutorials.md",
    collapsible: true,
    children: [
        {
            text: "空白的Flame游戏",
            link: "/guide/tutorials/bare_flame_game.md",
            collapsible: true,
            children: [
                {
                    text: "1. 检查Flutter安装",
                    link: "#_1-检查flutter安装"
                }, {
                    text: "2. 创建项目目录",
                    link: "#_2-创建项目目录"
                }, {
                    text: "3. 初始化空的Flutter项目",
                    link: "#_3-初始化空的flutter项目"
                }, {
                    text: "4. 在Android Studio中打开项目",
                    link: "#_4-在android-studio中打开项目"
                }, {
                    text: "5. 清理项目文件",
                    link: "#_5-清理项目文件"
                }, {
                    text: "6. 运行项目",
                    link: "#_6-运行项目"
                }, {
                    text: "7. 同步到GitHub",
                    link: "#_7-同步到github"
                }, {
                    text: "8. 完成",
                    link: "#_8-完成"
                }
            ]
        }, {
            text: "Klondike",
            link: "/guide/tutorials/klondike/klondike.md",
            collapsible: true,
            children: [
                {
                    text: "1. 准备",
                    link: "/guide/tutorials/klondike/step1.md",
                    collapsible: true,
                    children: [{
                        text: "规划",
                        link: "#规划"
                    }, {
                        text: "资源",
                        link: "#资源"
                    }]
                }, {
                    text: "2. 脚手架",
                    link: "/guide/tutorials/klondike/step2.md",
                    collapsible: true,
                    children: [{
                        text: "KlondikeGame",
                        link: "#klondikegame"
                    }, {
                        text: "其他类",
                        link: "#其他类"
                    }, {
                        text: "游戏结构",
                        link: "#游戏结构"
                    }, {
                        text: "代码",
                        link: "#代码"
                    }]
                }, {
                    text: "3. 卡片",
                    link: "/guide/tutorials/klondike/step3.md",
                    collapsible: true,
                    children: [{
                        text: "花色",
                        link: "#花色"
                    }, {
                        text: "等级",
                        link: "#等级"
                    }, {
                        text: "卡片组件",
                        link: "#卡片组件",
                        collapsible: true,
                        children: [{
                            text: "渲染",
                            link: "#渲染"
                        }, {
                            text: "renderBack()",
                            link: "#renderback"
                        }, {
                            text: "renderFront()",
                            link: "#renderfront"
                        }]
                    }, {
                        text: "代码",
                        link: "#代码"
                    }]
                }, {
                    text: "待续...",
                    link: "/guide/tutorials/klondike/tbc.md"
                }
            ]
        }
    ]
}


module.exports = tutorials