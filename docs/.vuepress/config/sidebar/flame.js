const gameLoop = {
    text: "游戏循环",
    collapsible: true,
    link: "/guide/flame/game-loop.md",
    children: [
      {
        text: "生命周期",
        link: "#生命周期",
      },
      {
        text: "调试模式",
        link: "#调试模式",
      },
      {
        text: "更改背景颜色",
        link: "#更改背景颜色",
      },
      {
        text: "SingleGameInstance mixin",
        link: "#singlegameinstance-mixin",
      },
      {
        text: "低级游戏API",
        link: "#低级游戏api",
      },
      {
        text: "Game Loop 游戏循环",
        link: "#game-loop-游戏循环",
      },
      {
        text: "游戏执行暂停/恢复",
        link: "#游戏执行暂停-恢复",
      },
      {
        text: "Flutter小部件和Game实例",
        link: "#flutter小部件和game实例",
      },
    ],
  };
  
  const components = {
    text: "组件",
    collapsible: true,
    link: "/guide/flame/components.md",
    children: [
      {
        text: "组件",
        link: "#组件",
      },
      {
        text: "优先权",
        link: "#优先权",
      },
      {
        text: "可组合性的组件",
        link: "#可组合性的组件",
      },
      {
        text: "确保组件有一个给定的父组件",
        link: "#确保组件有一个给定的父组件",
      },
      {
        text: "查询子组件",
        link: "#查询子组件",
      },
      {
        text: "在屏幕上的特定点查询组件",
        link: "#在屏幕上的特定点查询组件",
      },
      {
        text: "PositionType",
        link: "#positiontype",
      },
      {
        text: "PositionComponent",
        link: "#positioncomponent",
      },
      {
        text: "PositionComponent子元素",
        link: "#positioncomponent子元素",
      },
      {
        text: "渲染PositionComponent",
        link: "#渲染positioncomponent",
      },
      {
        text: "SpriteComponent",
        link: "#spritecomponent",
      },
      {
        text: "SpriteAnimationComponent",
        link: "#spriteanimationcomponent",
      },
      {
        text: "SpriteAnimationGroupComponent",
        link: "#spriteanimationgroupcomponent",
      },
      {
        text: "SpriteGroupComponent",
        link: "#spritegroupcomponent",
      },
      {
        text: "SvgComponent",
        link: "#svgcomponent",
      },
      {
        text: "FlareActorComponent",
        link: "#flareactorcomponent",
      },
      {
        text: "ParallaxComponent",
        link: "#parallaxcomponent",
      },
      {
        text: "ShapeComponents",
        link: "#shapecomponents",
      },
      {
        text: "PolygonComponent",
        link: "#polygoncomponent",
      },
      {
        text: "RectangleComponent",
        link: "#rectanglecomponent",
      },
      {
        text: "CircleComponent",
        link: "#circlecomponent",
      },
      {
        text: "SpriteBodyComponent",
        link: "#spritebodycomponent",
      },
      {
        text: "TiledComponent",
        link: "#tiledcomponent",
      },
      {
        text: "IsometricTileMapComponent",
        link: "#isometrictilemapcomponent",
      },
      {
        text: "NineTileBoxComponent",
        link: "#ninetileboxcomponent",
      },
      {
        text: "自定义绘制组件",
        link: "#自定义绘制组件",
      },
      {
        text: "特效",
        link: "#特效",
      },
    ],
  };

  const platforms = {
    text: "平台",
    collapsible: true,
    link: "/guide/flame/platforms.md",
    children: [
        {
            text: 'Flutter通道',
            link: '#flutter通道'
        },
        {
            text: 'Flame网页端',
            link: '#flame网页端'
        },
        {
            text: '部署您的游戏到Github Pages',
            link: '#部署您的游戏到github-pages'
        },
        {
            text: 'Web支持',
            link: '#web支持'
        }
    ],
  };

  const collisionDetection = {
    text: "碰撞检测",
    collapsible: true,
    link: "/guide/flame/collision-detection.md",
    children: [
        {
            text: "Mixins",
            collapsible: true,
            link: "#mixins",
            children: [
                {
                    text: "HasCollisionDetection",
                    link: "#hascollisiondetection"
                },{
                    text: "CollisionCallbacks",
                    link: "#collisioncallbacks"
                }
            ]
          },
          {
            text: "ShapeHitbox",
            collapsible: true,
            link: "#shapehitbox",
            children: [
                {
                    text: "CollisionType",
                    link: "#collisiontype"
                },{
                    text: "PolygonHitbox",
                    link: "#polygonhitbox"
                },{
                    text: "RectangleHitbox",
                    link: "#rectanglehitbox"
                },{
                    text: "CircleHitbox",
                    link: "#circlehitbox"
                }
            ]
        },{
            text: "ScreenHitbox",
            link: "#screenhitbox"
        },{
            text: "CompositeHitbox",
            link: "#compositehitbox"
        },{
            text: "BroadPhase",
            link: "#broadphase"
        },{
            text: "与 Forge2D 的比较",
            link: "#与-forge2d-的比较"
        },{
            text: "从 v1.0 中的碰撞侦测系统迁移",
            collapsible: true,
            link: "#从-v1.0-中的碰撞侦测系统迁移",
            children: [{
                text: "名称更改",
                link: "#名称更改"
            }]
        },{
            text: "示例",
            link: "#示例"
        }
    ]
  }

  const effects = {
    text: "特效",
    collapsible: true,
    link: "/guide/flame/effects.md",
    children: [
      {
        text: "概述",
        link: "#概述",
      },{
        text: "内置特效",
        collapsible: true,
        link: "#内置特效",
        children: [
          {
            text: "Effect",
            link: "#effect",
          },{
            text: "MoveByEffect",
            link: "#movebyeffect",
          },{
            text: "MoveToEffect",
            link: "#movetoeffect",
          },{
            text: "MoveAlongPathEffect",
            link: "#movealongpatheffect",
          },{
            text: "RotateEffect.by",
            link: "#rotateeffect-by",
          },{
            text: "RotateEffect.to",
            link: "#rotateeffect-to",
          },{
            text: "ScaleEffect.by",
            link: "#scaleeffect-by",
          },{
            text: "ScaleEffect.to",
            link: "#scaleeffect-to",
          },{
            text: "SizeEffect.by",
            link: "#sizeeffect-by",
          },{
            text: "SizeEffect.to",
            link: "#sizeeffect-to",
          },{
            text: "AnchorByEffect",
            link: "#anchorbyeffect",
          },{
            text: "AnchorToEffect",
            link: "#anchortoeffect",
          },{
            text: "OpacityEffect",
            link: "#opacityeffect",
          },{
            text: "SequenceEffect",
            link: "#sequenceeffect",
          },{
            text: "RemoveEffect",
            link: "#removeeffect",
          }
        ]
      },{
        text: "ColorEffect",
        link: "#coloreffect",
      },{
        text: "创建新的特效",
        link: "#创建新的特效",
      },{
        text: "特效控制器",
        collapsible: true,
        link: "#特效控制器",
        children: [
          {
            text: "EffectController",
            link: "#effectcontroller",
          },{
            text: "LinearEffectController",
            link: "#lineareffectcontroller",
          },{
            text: "ReverseLinearEffectController",
            link: "#reverselineareffectcontroller",
          },{
            text: "CurvedEffectController",
            link: "#curvedeffectcontroller",
          },{
            text: "ReverseCurvedEffectController",
            link: "#reversecurvedeffectcontroller",
          },{
            text: "PauseEffectController",
            link: "#pauseeffectcontroller",
          },{
            text: "RepeatedEffectController",
            link: "#repeatedeffectcontroller",
          },{
            text: "InfiniteEffectController",
            link: "#infiniteeffectcontroller",
          },{
            text: "SequenceEffectController",
            link: "#sequenceeffectcontroller",
          },{
            text: "SpeedEffectController",
            link: "#speedeffectcontroller",
          },{
            text: "DelayedEffectController",
            link: "#delayedeffectcontroller",
          },{
            text: "NoiseEffectController",
            link: "#noiseeffectcontroller",
          },{
            text: "RandomEffectController",
            link: "#randomeffectcontroller",
          },{
            text: "SineEffectController",
            link: "#sineeffectcontroller",
          },{
            text: "ZigzagEffectController",
            link: "#zigzageffectcontroller",
          }
        ]
      },{
        text: "参考",
        link: "#参考",
      }
    ]
  }

const flame = {
    text: "Flame",
    link: "/guide/flame/file-structure.md",
    collapsible: true,
    children: [
      {
        text: "文件结构",
        link: "/guide/flame/file-structure.md",
      },
      gameLoop,
      components,
      platforms,
      collisionDetection,
      effects,
      {
        text: "相机和视口",
        link: "/guide/flame/camera-and-viewport.md",
      },
      {
        text: "相机组件",
        link: "/guide/flame/camera-component.md",
      },
      {
        text: "输入",
        collapsible: true,
        link: "/guide/flame/inputs/gesture-input.md",
        children: [
          {
            text: "手势输入",
            link: "/guide/flame/inputs/gesture-input.md",
          },
          {
            text: "键盘输入",
            link: "/guide/flame/inputs/keyboard-input.md",
          },
          {
            text: "其他输入",
            link: "/guide/flame/inputs/other-inputs.md",
          },
        ],
      },
      {
        text: "渲染",
        collapsible: true,
        link: "/guide/flame/rendering/images.md",
        children: [
          {
            text: "图片、精灵图和动画",
            link: "/guide/flame/rendering/images.md",
          },
          {
            text: "文本渲染",
            link: "/guide/flame/rendering/text.md",
          },
          {
            text: "颜色和调色板",
            link: "/guide/flame/rendering/palette.md",
          },
          {
            text: "粒子",
            link: "/guide/flame/rendering/particles.md",
          },
          {
            text: "图层",
            link: "/guide/flame/rendering/layers.md",
          },
        ],
      },
      {
        text: "其他",
        collapsible: true,
        link: "/guide/flame/other/debug.md",
        children: [
          {
            text: "调试",
            link: "/guide/flame/other/debug.md",
          },
          {
            text: "实用工具",
            link: "/guide/flame/other/util.md",
          },
          {
            text: "小部件",
            link: "/guide/flame/other/widgets.md",
          },
        ],
      },
    ],
  };

module.exports = flame