
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
      text: '文件结构', link: '/guide/flame/file-structure.md'
    }, {
      text: '游戏循环', collapsible: true,
      link: '/guide/flame/game-loop.md',
      children: [
        {
          text: '生命周期', link: '#生命周期'
        }, {
          text: '调试模式', link: '#调试模式'
        }, {
          text: '更改背景颜色', link: '#更改背景颜色'
        }, {
          text: 'SingleGameInstance mixin', link: '#singlegameinstance-mixin'
        }, {
          text: '低级游戏API', link: '#低级游戏api'
        }, {
          text: 'Game Loop 游戏循环', link: '#game-loop-游戏循环'
        }, {
          text: '游戏执行暂停/恢复', link: '#游戏执行暂停-恢复'
        }, {
          text: 'Flutter小部件和Game实例', link: '#flutter小部件和game实例'
        }
      ]
    }, {
      text: '组件', link: '/guide/flame/components.md'
    }, {
      text: '平台', link: '/guide/flame/platforms.md'
    }, {
      text: '碰撞检测', link: '/guide/flame/collision-detection.md'
    }, {
      text: '效果', link: '/guide/flame/effects.md'
    }, {
      text: '相机和视图', link: '/guide/flame/camera-and-viewport.md'
    }, {
      text: '相机组件', link: '/guide/flame/camera-component.md'
    }, {
      text: '输入', collapsible: true,
      link: '/guide/flame/inputs/gesture-input.md',
      children: [
        {
          text: '手势输入', link: '/guide/flame/inputs/gesture-input.md'
        }, {
          text: '键盘输入', link: '/guide/flame/inputs/keyboard-input.md'
        }, {
          text: '其他输入', link: '/guide/flame/inputs/other-inputs.md'
        }
      ],
    }, {
      text: '渲染', collapsible: true,
      link: '/guide/flame/rendering/images.md',
      children: [
        {
          text: '图片、精灵图和动画', link: '/guide/flame/rendering/images.md'
        }, {
          text: '文本渲染', link: '/guide/flame/rendering/text.md'
        }, {
          text: '颜色和调色板', link: '/guide/flame/rendering/palette.md'
        }, {
          text: '粒子', link: '/guide/flame/rendering/particles.md'
        }, {
          text: '图层', link: '/guide/flame/rendering/layers.md'
        }
      ],
    }, {
      text: '其他', collapsible: true,
      link: '/guide/flame/other/debug.md',
      children: [
        {
          text: '调试', link: '/guide/flame/other/debug.md'
        }, {
          text: '实用工具', link: '/guide/flame/other/util.md'
        }, {
          text: '小部件', link: '/guide/flame/other/widgets.md'
        }
      ],
    }
  ]
}

module.exports = [
  started,
  flame
]
