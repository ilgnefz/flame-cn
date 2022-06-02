---
prev:
  text: 调试
  link: /guide/flame/other/debug.md
next:
  text: 小部件
  link: /guide/flame/other/widgets.md
---

# 工具

在这个页面，您可以找到一些实用程序类和方法。

## 设备类

这个类可以从 `Flame.device` 访问，它有一些方法可以用来控制设备的状态，例如，您可以改变屏幕方向并设置应用程序是否应该是全屏的。

### Flame.device.fullScreen()

调用时，这会禁用所有 `SystemUiOverlay`，使应用程序全屏显示。 在 main 方法中调用时，它会使您的应用全屏显示（没有顶部或底部栏）。

**注意**：在 Web 端调用时没有效果。

### Flame.device.setLandscape()

此方法将整个应用程序（实际上也是游戏）的方向设置为横向，并且根据操作系统和设备设置，应该允许左右横向方向。 要将应用程序方向设置为特定方向的横向，请使用 `Flame.device.setLandscapeLeftOnly` 或 `Flame.device.setLandscapeRightOnly`。

**注意**：在 Web 端调用时没有效果。

### Flame.device.setPortrait()

此方法将整个应用程序（实际上也是游戏）的方向设置为纵向，并且根据操作系统和设备设置，它应该允许上下纵向方向。 要将应用程序方向设置为特定方向的纵向，请使用 `Flame.device.setPortraitUpOnly` 或 `Flame.device.setPortraitDownOnly`。

**注意**：在 Web 端调用时没有效果。

### Flame.device.setOrientation() and Flame.device.setOrientations()

如果需要对允许的方向进行更精细的控制（无需直接处理 `SystemChrome`），可以使用 `setOrientation`（接受单个 `DeviceOrientation` 作为参数）和 `setOrientations`（接受 `List<DeviceOrientation>` 以获取可能的方向）。

**注意**：在 Web 端调用时没有效果。

## 定时器

Flame 提供了一个简单的实用程序类来帮助您处理倒计时和计时器状态更改（如事件）。

倒计时示例：

```dart
import 'dart:ui';

import 'package:flame/game.dart';
import 'package:flame/text_config.dart';
import 'package:flame/timer.dart';
import 'package:flame/vector2.dart';

class MyGame extends Game {
  final TextConfig textConfig = TextConfig(color：const Color(0xFFFFFFFF));
  final countdown = Timer(2);

  @override
  void update(double dt) {
    countdown.update(dt);
    if (countdown.finished) {
      // Prefer the timer callback, but this is better in some cases
    }
  }

  @override
  void render(Canvas canvas) {
    textConfig.render(
      canvas,
      "Countdown：${countdown.current.toString()}",
      Vector2(10, 100),
    );
  }
}

```

间隔示例：

```dart
import 'dart:ui';

import 'package:flame/game.dart';
import 'package:flame/text_config.dart';
import 'package:flame/timer.dart';
import 'package:flame/vector2.dart';

class MyGame extends Game {
  final TextConfig textConfig = TextConfig(color：const Color(0xFFFFFFFF));
  Timer interval;

  int elapsedSecs = 0;

  MyGame() {
    interval = Timer(
      1,
      onTick：() => elapsedSecs += 1,
      repeat：true,
    );
  }

  @override
  void update(double dt) {
    interval.update(dt);
  }

  @override
  void render(Canvas canvas) {
    textConfig.render(canvas, "Elapsed time：$elapsedSecs", Vector2(10, 150));
  }
}

```

`Timer` 实例也可以通过 `TimerComponent` 类在 `FlameGame` 游戏中使用。

`TimerComponent` 示例：

```dart
import 'package:flame/timer.dart';
import 'package:flame/components/timer_component.dart';
import 'package:flame/game.dart';

class MyFlameGame extends FlameGame {
  MyFlameGame() {
    add(
      TimerComponent(
        period：10,
        repeat：true,
        onTick：() => print('10 seconds elapsed'),
      )
    );
  }
}
```

## 扩展

Flame 捆绑了一系列实用程序扩展，这些扩展旨在帮助开发人员提供快捷方式和转换方法，您可以在此处找到这些扩展的摘要。

它们都可以从 `package:flame/extensions.dart` 导入。

### Canvas

方法：
 - `scaleVector`：类似于 `canvas scale` 方法，但使用 `vector2` 作为参数。
 - `translateVector`：类似于 `canvas translate` 方法，但使用 vector2作为参数。
 - `renderPoint`：在画布上呈现一个点（主要用于调试目的）。
 - `renderAt` and `renderRotated`：如果直接在Canvas中呈现，可以使用这些函数轻松地操作坐标，在正确的位置呈现内容。它们改变了Canvas转换矩阵，但随后重置。

### Color

方法：
 - `darken`：通过 0 到 1 之间的数量加深颜色的阴影。
 - `brighten`：通过 0 到 1 之间的数量增亮颜色的阴影。

工厂：

- `ColorExtension.fromRGBHexString`：从有效的十六进制字符串（例如 #1C1C1C）中解析 RGB 颜色。
- `ColorExtension.fromARGBHexString`：从有效的十六进制字符串（例如 #FF1C1C1C）中解析 ARGB 颜色。

### Image

方法：
 - `pixelsInUint8`：以 `ImageByteFormat.rawRgba` 像素格式的 `Uint8List` 形式检索图像的像素数据。
 - `getBoundingRect`：以 `Rect` 形式获取 `Image` 的边界矩形。
 - `size`：以 `Vector2` 作为图像的大小。
 - `darken`：使图像的每个像素变暗 0 到 1 之间的量。
 - `brighten`：使图像的每个像素变亮 0 到 1 之间的量。

### Offset

方法：
 - `toVector2`：从 `Offset` 创建一个 `Vector2`。
 - `toSize`：从 `Offset` 创建一个 `Size`。
 - `toPoint`：从 `Offset` 创建一个 `Point`。
 - `toRect`：创建一个从 (0, 0) 开始的 `Rect`，它的右下角是 `Offset`。

### Rect

方法：
 - `toOffset`：从 `Rect` 创建一个 `Offset`。
 - `toVector2`：创建一个从 (0, 0) 开始的 `Vector2` 并达到 `Rect` 的大小。
 - `containsPoint`：这个 `Rect` 是否包含一个 `Vector2` 点。
 - `intersectsSegment`：两个 `Vector2` 形成的线段是否与这个 `Rect` 相交。
 - `intersectsLineSegment`：`LineSegment` 是否与 `Rect` 相交。
 - `toVertices`：将 `Rect` 的四个角变成 `Vector2` 的列表。
 - `toMathRectangle`：将此 `Rect` 转换为 `math.Rectangle`。
 - `toGeometryRectangle`：将此 `Rect` 从 flame-geom 转换为 `Rectangle`。
 - `transform`：使用 `Matrix4` 转换 `Rect`。

工厂：
 - `RectExtension.getBounds`：构造一个表示 `Vector2` 列表边界的 `Rect`。
 - `RectExtension.fromCenter`：从中心点构造一个 `Rect`（使用 `Vector2`）。

### math.Rectangle

方法：
 - `toRect`：将这个数学 `Rectangle` 转换成一个用户界面 `Rect`。

### Size

方法：
 - `toVector2`：从 `Size` 创建一个 `Vector2`。
 - `toOffset`：从 `Offset` 创建一个 `Vector2`。
 - `toPoint`：从 `Point` 创建一个 `Vector2`。
 - `toRect`：从 (0, 0) 开始创建一个大小为 `Size` 的 `Rect`。

### Vector2

这个类来自 [vector_math](https://pub.dev/packages/vector_math) 包，我们在该包提供的基础上提供了一些有用的扩展方法。

方法：
 - `toOffset`：从 `Vector2` 创建一个 `Offset`。
 - `toPoint`：从 `Vector2` 创建一个 `Point`。
 - `toRect`：创建一个从 (0, 0) 开始、大小为 `Vector2` 的 `Rect`。
 - `toPositionedRect`：在 `Vector2` 中创建一个从 [ x，y ] 开始的 `Rect`，其大小与 `Vector2 `参数相同。
 - `lerp`：线性插值` Vector2` 到另一个 `Vector2`。
 - `rotate`：以弧度指定的角度旋转 `Vector2`，它围绕可选定义的 `Vector2` 旋转，否则围绕中心旋转。
 - `scaleTo`：将 `Vector2` 的长度更改为提供的长度，而不改变方向
 - `moveToTarget`：将 `Vector2` 沿目标方向平滑移动给定距离。

工厂：
 - `Vector2Extension.fromInts`：创建一个以整数作为输入的 `Vector2`。

运算符：
 - `&`：将两个 `Vector2` 组合成一个 `Rect`，原点在左边，大小在右边。
 - `%`：两个 Vector2 的 x 和 y 的模/余数。

### Matrix4

这个类来自 [vector_math](https://pub.dev/packages/vector_math) 包。 我们在 vector_math 已经提供的基础上创建了一些扩展方法。

方法：
  - `translate2`：通过给定的 `Vector2` 转换 `Matrix4`。
  - `transform2`：通过使用 `Matrix4` 转换给定的 `Vector2` 来创建一个新的 `Vector2`。
  - `transformed2`：将输入 `Vector2` 转换为输出 `Vector2`。

接收器：
  - `m11`：第一行和第一列。
  - `m12`：第一行和第二列。
  - `m13`：第一行和第三列。
  - `m14`：第一行和第四列。
  - `m21`：第二行和第一列。
  - `m22`：第二行和第二列。
  - `m23`：第二行和第三列。
  - `m24`：第二行和第四列。
  - `m31`：第三行和第一列。
  - `m32`：第三行和第二列。
  - `m33`：第三行和第三列。
  - `m34`：第三行和第四列。
  - `m41`：第四行和第一列。
  - `m42`：第四行和第二列。
  - `m43`：第四行和第三列。
  - `m44`：第四行和第四列。

工厂：
 - `Matrix4Extension.scale`：创建一个缩放的 `Matrix4`。 通过传递 `Vector4` 或 `Vector2` 作为它的第一个参数，或者传递 x y z 双精度值。
