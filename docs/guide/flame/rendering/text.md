---
prev:
  text: 图片、精灵图和动画
  link: /guide/flame/rendering/images.md
next:
  text: 颜色和调色板
  link: /guide/flame/rendering/palette.md
---

# 文本渲染

Flame 有一些专门的类来帮助您渲染文本。

## TextRenderer

`TextRenderer` 是 Flame 用来渲染文本的抽象类。Flame 为此提供了一个名为 `TextPaint` 的实现，但任何人都可以实现这个抽象，并创建一个自定义的方式来呈现文本。

## TextPaint

`TextPaint` 是 Flame 中文本渲染的内置实现，它基于 Flutter 的 `TextPainter` 类（因此得名），它可以通过包含渲染文本所需的所有印刷信息的样式类 `TextStyle` 进行配置； 即字体大小和颜色、字体系列等。

用法示例：

```dart
const TextPaint textPaint = TextPaint(
  style: TextStyle(
    fontSize: 48.0,
    fontFamily: 'Awesome Font',
  ),
);
```

注意：有几个包包含类 `TextStyle`，确保导入 `package:flutter/material.dart` 或 `package:flutter/painting.dart`，如果还需要导入 `dart:ui`，则需要像这样导入它（因为它包含另一个名为 `TextStyle` 的类）：

```dart
import 'dart:ui' hide TextStyle;
```

TextStyle的一些常见属性如下（这里是[完整的列表](https://api.flutter.dev/flutter/painting/TextStyle-class.html)）：

 - `fontFamily`：常用字体，如 Arial（默认），或在您的 pubspec 中添加的自定义字体（参考[这里](https://flutter.io/custom-fonts/)如何操作）。
 - `fontSize`：字体大小（默认是24.0）。
 - `height`：文本行的高度，为字体大小的倍数（默认值为 null）。
 - `color`：颜色，像`ui.Color`一样（默认是白色）

有关颜色和如何创建的详细信息，请查看[颜色和调色板](/guide/flame/rendering/palette.md)指南。

创建 `TextPaint` 对象之后，您可以使用它的 `render` 方法在画布上绘制字符串：

```dart
textPaint.render(canvas, "Flame is awesome", Vector2(10, 10));
```

如果您想设置文本的锚点，您也可以在渲染调用中使用可选的`anchor`参数：

```dart
textPaint.render(canvas, 'Flame is awesome', Vector2(10, 10), anchor: Anchor.topCenter);
```

## 文本组件

Flame 提供了两个文本组件，使得在游戏中呈现文本更加容易：`TextComponent` 和 `TextBoxComponent`。

### TextComponent

`TextComponent`是一个呈现单行文本的简单组件。

使用示例：

```dart
final style = TextStyle(color: BasicPalette.white.color);
final regular = TextPaint(style: style);

class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    add(TextComponent(text: 'Hello, Flame', textRenderer: regular)
      ..anchor = Anchor.topCenter
      ..x = size.width / 2 // size is a property from game
      ..y = 32.0);
  }
}
```

### TextBoxComponent

`TextBoxComponent` 与 `TextComponent` 非常相似，但顾名思义，它用于在边界框内渲染文本，根据提供的框大小创建换行符。

您可以决定文本框是否应该随着文本的编写而增长，或者是否应该通过 `TextBoxConfig` 中的 `growingBox` 变量保持静态。

如果要更改框的边距，请使用 `TextBoxConfig` 中的 `margins` 变量。

使用示例：

```dart
class MyTextBox extends TextBoxComponent {
  MyTextBox(String text) : super(text: text, textRenderer: tiny, boxConfig: TextBoxConfig(timePerChar: 0.05));

  @override
  void drawBackground(Canvas c) {
    Rect rect = Rect.fromLTWH(0, 0, width, height);
    c.drawRect(rect, Paint()..color = Color(0xFFFF00FF));
    c.drawRect(
        rect.deflate(boxConfig.margin),
        BasicPalette.black.Paint()
          ..style = PaintingStyle.stroke,
    );
  }
}
```

[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/rendering/text.dart)的一个示例展示了这两个组件。
