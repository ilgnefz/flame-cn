
const started = {
  text: '开始使用',
  link: '/guide/started.md',
  collapsible: true,
  children: [
    // SidebarItem
    {
      text: '关于',
      link: '#关于',
    },
    {
      text: '安装',
      link: '#安装',
    }, {
      text: '入门',
      link: '#入门',
    }, {
      text: '其他',
      link: '#其他',
      children: [
        {
          text: '多人游戏（网络编程）',
          link: '#多人游戏（网络编程）'
        }, {
          text: '外部资源',
          link: '#外部资源',
        }
      ]
    },
  ],
}

const flame = {
  text: 'Flame',
  link: '/guide/flame/file-structure.md',
  collapsible: true,
  children: [
    {
      text: '文件结构',
      link: '/guide/flame/file-structure.md'
    }, {
      text: '游戏循环',
      link: '/guide/flame/game-loop.md'
    },
  ]
}

module.exports = [
  started,
  flame
]
