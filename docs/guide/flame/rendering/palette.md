---
prev:
  text: 文本渲染
  link: /guide/flame/rendering/text.md
next:
  text: 粒子
  link: /guide/flame/rendering/particles.md
---

# 调色板

在整个游戏过程中，您需要在很多地方使用颜色。 `dart:ui` 上有两个类可以使用，`Color` 和 `Paint`。

`Color` 类表示十六进制整数格式的 ARGB 颜色。因此，要创建 `Color` 实例，只需以 ARGB 格式将颜色作为整数传递即可。

您可以使用 Dart 的十六进制表示法让它变得非常简单； 例如：`0xFF00FF00` 是完全不透明的绿色（“掩码”为 `0xAARRGGBB`）。

**注意**：与常规（非A） RGB不同，前两个十六进制数字用于alpha通道（透明度）。前两个数字的最大值（FF = 255）表示完全不透明，最小值（00 = 0）表示完全透明。

在Material Flutter包中有一个 `Colors` 类，它提供常见的颜色作为常量：

```dart
import 'package:flutter/material.dart' show Colors;

const black = Colors.black;
```

一些更复杂的方法可能还需要一个 `Paint` 对象，这是一个更完整的结构，允许您配置与描边、颜色、滤镜和混合模式相关的内容。然而，通常在使用更复杂的 api 时，您只需要一个表示单一纯色的Paint对象实例。

**注意**：我们不建议您在每次需要特定的 `Paint` 时都创建一个新的 `Paint` 对象，因为它可能会导致创建大量不必要的对象。更好的方法是在某个地方定义 `Paint` 对象并重用它（但是，请注意 `Paint` 类是可变的，不像 `Color`） ，或者使用 `Palette` 类定义您想在游戏中使用的所有颜色。

您可以这样创建一个对象：

```dart
Paint green = Paint()..color = const Color(0xFF00FF00);
```

为了帮助您做到这一点，并保持您的游戏调色板的一致性，Flame 添加了调色板类。您可以使用它在需要的地方轻松访问 `Colors` 和 `Paints`，并将游戏使用的颜色定义为常量，这样您就不会将它们混淆。

`BasicPalette` 类是调色板外观的一个示例，它添加了黑色和白色作为颜色。要使用黑色或白色，您可以直接从 `BasicPalette` 访问；例如，使用 `color`：

```dart
TextConfig regular = TextConfig(color: BasicPalette.white.color);
```

或者使用 `paint`:

```dart
canvas.drawRect(rect, BasicPalette.black.paint);
```

但是，您可以按照 `BasicPalette` 示例创建自己的调色板，并添加游戏的调色板/方案。 然后，您将能够静态地访问组件和类中的任何颜色。 下面是一个 `Palette` 实现的示例，来自示例游戏 [BGUG](https://github.com/bluefireteam/bgug/blob/master/lib/palette.dart)：

```dart
import 'dart:ui';

import 'package:flame/palette.dart';

class Palette {
  static PaletteEntry white = BasicPalette.white;

  static PaletteEntry toastBackground = PaletteEntry(Color(0xFFAC3232));
  static PaletteEntry toastText = PaletteEntry(Color(0xFFDA9A00));

  static PaletteEntry grey = PaletteEntry(Color(0xFF404040));
  static PaletteEntry green = PaletteEntry(Color(0xFF54a286));
}
```

`PaletteEntry` 是一个保存颜色信息的 `const` 类，它具有以下成员：

 - `color`：返回指定的 `Color`
 - `paint`：创建一个指定颜色的新 `Paint`。`Paint` 是一个非常量类，因此每次调用它时，这个方法实际上都会创建一个全新的实例。这种级联突变是安全的。
