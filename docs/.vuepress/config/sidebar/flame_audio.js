module.exports = {
    text: "Flame音频",
    link: "/guide/flame_audio/audio.md",
    collapsible: true,
    children: [
        {
            text: "一般音频",
            link: "/guide/flame_audio/audio.md",
        }, {
            text: "背景音乐",
            link: "/guide/flame_audio/bgm.md",
            collapsible: true,
            children: [
                {
                    text: "缓存音乐文件",
                    link: "#缓存音乐文件",
                }, {
                    text: "方法",
                    link: "#方法",
                    collapsible: true,
                    children: [{
                        text: "播放",
                        link: "#播放",
                    }, {
                        text: "停止",
                        link: "#停止",
                    }, {
                        text: "暂停和恢复",
                        link: "#暂停和恢复",
                    },]
                }
            ]
        }
    ]
}