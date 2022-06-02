---
prev:
  text: 图层
  link: /guide/flame/render/layers.md
next:
  text: 实用工具
  link: /guide/flame/other/util.md
---

# 调试功能

## 帧数

Flame 提供了 `FPSCounter` mixin 来记录 fps； 这个 mixin 可以应用于从 `Game` 扩展的任何类。 应用后，您可以使用 `fps` 方法访问当前帧数，如下例所示：

```dart
class MyGame extends FlameGame with FPSCounter {
  static final fpsTextConfig = TextConfig(color: BasicPalette.white.color);

  @override
  void render(Canvas canvas) {
    super.render(canvas);
    final fpsCount = fps(120); // 在过去120微秒内的平均FPS
    fpsTextConfig.render(canvas, fpsCount.toString(), Vector2(0, 50));
  }
}
```

## FlameGame特性

Flame 为 `FlameGame` 类提供了一些调试功能。 这些功能在 `debugMode` 属性设置为 `true`（或被覆盖为 `true`）时启用。 启用 `debugMode` 后，每个 `PositionComponent`  将以其边界大小呈现，并将其位置写入屏幕上。 这样，您可以直观地验证组件的边界和位置。

要查看 FlameGame 调试特性的工作示例，请点击[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/components/debug_example.dart)。
