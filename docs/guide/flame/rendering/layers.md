---
prev:
  text: 粒子
  link: /guide/flame/rendering/particles.md
next:
  text: 调试
  link: /guide/flame/other/debug.md
---

# 图层

图层允许你根据上下文对渲染进行分组，也允许你预渲染。这可以渲染游戏中在内存中变化不大的部分，例如背景。 通过这样做，您将释放处理能力来处理需要在每个游戏时间进行渲染的更多动态内容。

在 Flame 上有两种类型的图层：
 - `DynamicLayer`：用于移动或变化的事物
 - `PreRenderedLayer`：用于静态的东西。

## DynamicLayer

动态图层是每次在画布上绘制时渲染的图层。 顾名思义，它适用于动态内容，最适用于对具有相同上下文的对象进行分组渲染。

使用示例：
```dart
class GameLayer extends DynamicLayer {
  final MyGame game;

  GameLayer(this.game);

  @override
  void drawLayer() {
    game.playerSprite.render(
      canvas,
      position: game.playerPosition,
    );
    game.enemySprite.render(
      canvas,
      position: game.enemyPosition,
    );
  }
}

class MyGame extends Game {
  // Other methods omitted...

  @override
  void render(Canvas canvas) {
    gameLayer.render(canvas); // x 和 y 作为可选的位置参数提供
  }
}
```

## PreRenderedLayer

预渲染层只渲染一次就缓存到内存中，然后再复制到游戏画布上。对于在游戏过程中不会发生变化的内容（如背景），它非常有用。

使用示例：

```dart
class BackgroundLayer extends PreRenderedLayer {
  final Sprite sprite;

  BackgroundLayer(this.sprite);

  @override
  void drawLayer() {
    sprite.render(
      canvas,
      position: Vector2(50, 200),
    );
  }
}

class MyGame extends Game {
  // Other methods omitted...

  @override
  void render(Canvas canvas) {
    backgroundLayer.render(canvas); //  x 和 y 作为可选的位置参数提供
  }
}
```

## 图层处理器

Flame 还提供了一种在图层上添加处理器的方法，这是在整个图层上添加效果的方法。 目前，它是开箱即用的，只有 `ShadowProcessor` 可用，该处理器在您的图层上呈现背景阴影。
使用示例：

```dart
// DynamicLayer 和 PreRenderedLayer 的工作方式相同
class BackgroundLayer extends PreRenderedLayer {
  final Sprite sprite;

  BackgroundLayer(this.sprite) {
    preProcessors.add(ShadowProcessor());
  }

  @override
  void drawLayer() { /* omitted */ }

  // ...
```

可以通过扩展 `LayerProcessor` 类来创建自定义处理器。

你可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/rendering/layers.dart)查看一个图层工作的示例。
