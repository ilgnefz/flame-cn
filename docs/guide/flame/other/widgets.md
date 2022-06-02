---
prev:
  text: 实用工具
  link: /guide/flame/other/util.md
next:
  text: 一般音频
  link: /guide/flame_audio/audio.md
---

# 小部件

使用 Flutter 开发游戏的一个优势是可以使用 Flutter 广泛的工具集来构建 UI，Flame 试图通过引入游戏中的小部件来扩展这一功能。

在这里您可以找到所有由Flame提供的小部件。

您还可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/widgets)看到 [Dashbook](https://github.com/erickzanardo/dashbook) 沙箱中显示的所有小部件。

## NineTileBox

`NineTileBox` 是一个使用网格精灵绘制的矩形。

网格精灵是一个 3x3 的网格，有 9 个方块，分别代表 4 个角、4 个边和中间。

角以相同的尺寸绘制，边沿侧向拉伸，中间向两边展开。

`NineTileBox` 小部件使用该标准实现了一个容器。 这个模式也被实现为 `NineTileBoxComponent `中的一个组件，因此您可以直接将此功能添加到您的 `FlameGame`。 要了解更多信息，请在[这里](../components.md#ninetileboxcomponent)查看组件文档。

这里您可以找到一个如何使用它的例子（不使用 `NineTileBoxComponent`）：

```dart
import 'package:flame/widgets/nine_tile_box.dart';

NineTileBox.asset(
    image: image, // dart:ui 图像实例
    tileSize: 16, // 网格图像上平铺的宽度/高度
    destTileSize: 50, // 在画布上绘制瓷砖时要使用的尺寸
    child: SomeWidget(), // 任何 Flutter 小部件
)
```

## SpriteButton

`SpriteButton` 是一个基于 Flame 精灵创建按钮的简单小部件。这在创建非默认外观按钮时非常有用。例如，在图形编辑器中绘制按钮比在Flutter中直接制作按钮更容易实现您想要的外观。

```dart
SpriteButton.asset(
    onPressed: () {
      print('Pressed');
    },
    label: const Text('Sprite Button', style: const TextStyle(color: const Color(0xFF5D275D))),
    sprite: _spriteButton,
    pressedSprite: _pressedSprite,
)
```

## SpriteWidget

`SpriteWidget` 是用于在小部件树中显示 [Sprite](../rendering/images.html#精灵图) 的小部件。

以下是如何使用它：

```dart
SpriteWidget.asset(
    sprite: yourSprite,
    anchor: Anchor.center,
)
```

## SpriteAnimationWidget

`SpriteAnimationWidget` 是一个用于在小部件树中显示 [SpriteAnimations](../rendering/images.md#动画) 的小部件。

以下是如何使用它：

```dart
SpriteAnimationWidget.asset(
    animation: _animation,
    playing: true,
    anchor: Anchor.center,
)
```
