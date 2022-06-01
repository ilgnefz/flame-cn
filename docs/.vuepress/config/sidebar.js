const started = {
  text: "开始使用",
  link: "/guide/started.md",
  collapsible: true,
  children: [
    // SidebarItem
    {
      text: "关于",
      link: "#关于",
    },
    {
      text: "安装",
      link: "#安装",
    },
    {
      text: "入门",
      link: "#入门",
    },
    {
      text: "其他",
      link: "#其他",
      children: [
        {
          text: "多人游戏（网络编程）",
          link: "#多人游戏（网络编程）",
        },
        {
          text: "外部资源",
          link: "#外部资源",
        },
      ],
    },
  ],
};

const flame = require('./sidebar/flame')

const flameAudio = require('./sidebar/flame_audio')

const tutorials = require('./sidebar/tutorials')

const otherModules = require('./sidebar/other_modules')


module.exports = [started, flame, flameAudio, tutorials, otherModules];
