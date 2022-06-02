const gameLoop = require('./game_loop')

const components = require('./components')

const platforms = require('./platforms')

const collisionDetection = require('./collision_detection')

const effects = require('./effects')

const cameraAndViewport = require('./camera_and_viewport')

const cameraComponent = require('./camera_component')

const gestureInput = require('./input/gesture_input')

const keyboardInput = require('./input/keyboard_input')

const otherInputs = require('./input/other_inputs')

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
    cameraAndViewport,
    cameraComponent,
    {
      text: "输入",
      collapsible: true,
      link: "/guide/flame/inputs/gesture-input.md",
      children: [
        gestureInput,
        keyboardInput,
        otherInputs,
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