---
prev:
  text: 1. 准备
  link: /guide/tutorials/klondike/step1.md
next:
  text: 3. 卡片
  link: /guide/tutorials/klondike/step3.md
---



# 2. 脚手架

在这一部分，我们将用粗线条勾勒出游戏的主要元素。这包括游戏的主类和总体布局。


## KlondikeGame

在 Flame 宇宙中，**FlameGame** 是大多数游戏的基石。这个类运行游戏循环，调度事件，拥有组成游戏的所有组件(组件树) ，通常还充当游戏状态的中心存储库。

因此，在 `lib/` 文件夹中创建一个名为 `KlondikeGame. dart` 的新文件，并在其中声明 `KlondikeGame` 类：

```dart
import 'package:flame/game.dart';

class KlondikeGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    await Flame.images.load('klondike-sprites.png');
  }
}
```

现在我们只声明了 `onLoad` 方法，这是一个特殊的处理程序，当游戏实例第一次附加到 Flutter 小部件树时调用它。您可以将其看作一个延迟的异步构造函数。目前，`onLoad` 唯一做的事情就是将精灵图像加载到游戏中; 但是我们很快就会添加更多的精灵图像。要在游戏中使用的任何图像或其他资源都需要首先加载，这是一个相对缓慢的 i/o 操作，因此需要使用 `await` 关键字。

我正在将图像加载到全局 `Flame.images` 缓存中。另一种方法是将其加载到游戏中的` images` 缓存中，但是从其他类访问这个映像会更加困难。

还要注意的是，在初始化游戏中的其他内容之前，我正在 `await` 图像完成加载。这是为了方便：这意味着在初始化所有其他组件时，它们可以假定已经加载了精灵表。我们甚至可以添加一个辅助函数来从普通的精灵表中提取精灵图：
```dart
Sprite klondikeSprite(double x, double y, double width, double height) {
  return Sprite(
    Flame.images.fromCache('klondike-sprites.png'),
    srcPosition: Vector2(x, y),
    srcSize: Vector2(width, height),
  );
}
```
这个辅助函数在本章中不需要，但在下一章中将被广泛使用。

让我们把这个类合并到项目中，这样它就不会被孤立。打开 `main.dart` 找到写着 `final game = FlameGame()` 的行; 并用 `KlondikeGame` 替换 `FlameGame`。您还需要导入类。完成所有操作之后，文件应该是这样的：

```dart
import 'package:flame/game.dart';
import 'package:flutter/widgets.dart';
import 'klondike_game.dart';

void main() {
  final game = KlondikeGame();
  runApp(GameWidget(game: game));
}
```


## 其他类

到目前为止，我们已经有了主要的 `KlondikeGame` 类，现在我们需要创建要添加到游戏中的对象。 在 `Flame` 中，这些对象称为组件，当添加到游戏中时，它们会形成“游戏组件树”。 游戏中存在的所有实体都必须是组件。

正如我们在上一章中已经提到的，我们的游戏主要由卡片组件组成。 然而，由于绘制卡片需要一些努力，我们将把该类的实现推迟到下一章。

现在，让我们创建容器类，如草图所示。这些是：`Stock`、`Waste`、`Pile` 和 `Foundation`。在项目目录中创建一个子目录组件，然后创建文件 `components/stock.dart`。在该文件中写入：

```dart
import 'package:flame/components.dart';

class Stock extends PositionComponent {
  @override
  bool get debugMode => true;
}
```

在这里，我们将 `Stock` 类声明为 `PositionComponent`（这是一个具有位置和大小的组件）。我们还打开了这个类的调试模式，以便我们可以在屏幕上看到它，即使我们还没有任何呈现逻辑。

同样地，在相应的文件中创建另外三个类 `Foundation`、 `Pile` 和 `Waste`。现在所有四个类的内部逻辑完全相同，我们将在后面的章节中为这些类添加更多的功能。

现在您游戏的目录结构应该是这样的：
```text
klondike/
 ├─assets/
 │  └─images/
 │     └─klondike-sprites.png
 ├─lib/
 │  ├─components/
 │  │  ├─foundation.dart
 │  │  ├─pile.dart
 │  │  ├─stock.dart
 │  │  └─waste.dart
 │  ├─klondike_game.dart
 │  └─main.dart
 ├─analysis_options.yaml
 └─pubspec.yaml
```

## 游戏结构

一旦我们拥有了一些基本组件，我们便需要将它们添加到游戏中。是时候决定游戏的高级结构了。

这里存在多种方法，它们在复杂性、可扩展性和总体原理方面有所不同。我们将在本教程中采用的方法是基于使用 [World] 组件和 [Camera]。

这种方法背后的想法是这样的：想象您的游戏世界独立于设备存在，它已经存在于我们的头脑中，存在于草图中，即使我们还没有做任何编码。这个世界将有一定的大小，世界上的每个元素将有一定的坐标。这取决于我们来决定世界的大小，以及这个大小的度量单位是什么。重要的是，世界是独立于设备存在的，它的尺寸同样不依赖于屏幕的像素分辨率。

所有属于世界的元素都将被添加到 `World` 组件中，然后 `World` 组件也将被添加到游戏中。

整个结构的第二部分是一个相机（`CamerComponent`）。相机的目的是观察世界，确保在用户设备的屏幕上以正确的尺寸呈现。

因此，组件树的总体结构大致如下：
```text
KlondikeGame
 ├─ World
 │   ├─ Stock
 │   ├─ Waste
 │   ├─ Foundation (×4)
 │   └─ Pile (×7)
 └─ CameraComponent
```

::: warning 注意

本教程中描述的 Camera 系统不同于作为 FlameGame 类属性可用的“official” Camera。后者在未来可能会被弃用。

:::

对于这个游戏，我一直在绘制我的图像资产，考虑到一张卡的尺寸为 1000 * 1400 像素。因此，这将作为确定整体布局的参考大小。另一个影响布局的重要度量是卡间距离。它似乎应该在 150 到 200 个单元之间(相对于卡宽度)，因此我们将它声明为一个变量 `cardGap`，如果需要的话，可以在以后进行调整。为简单起见，垂直和水平的卡片间距将相同，并且卡片与屏幕边缘之间的最小填充也将等于 `cardGap`。

好了，让我们把这些放在一起，实现我们的 `KlondikeGame` 类。

首先，我们声明几个全局常量描述尺寸和卡片之间的距离。我们将它们声明为常量，因为我们不打算在游戏中更改这些值：
```dart
  static const double cardWidth = 1000.0;
  static const double cardHeight = 1400.0;
  static const double cardGap = 175.0;
  static const double cardRadius = 100.0;
  static final Vector2 cardSize = Vector2(cardWidth, cardHeight);
```

接下来，我们将创建一个 `Stock` 组件、`Waste`、4个 `Foundations `和七个 `pile`，设置它们在世界中的大小和位置。 使用简单的算术计算位置。 这一切都应该发生在 `onLoad` 方法中，在加载 spritesheet 之后：
```dart
    final stock = Stock()
      ..size = cardSize
      ..position = Vector2(cardGap, cardGap);
    final waste = Waste()
      ..size = cardSize
      ..position = Vector2(cardWidth + 2 * cardGap, cardGap);
    final foundations = List.generate(
      4,
      (i) => Foundation()
        ..size = cardSize
        ..position =
            Vector2((i + 3) * (cardWidth + cardGap) + cardGap, cardGap),
    );
    final piles = List.generate(
      7,
      (i) => Pile()
        ..size = cardSize
        ..position = Vector2(
          cardGap + i * (cardWidth + cardGap),
          cardHeight + 2 * cardGap,
        ),
    );
```

然后我们创建主要的 `World` 组件，添加我们刚刚创建的所有组件，最后将 `World` 添加到游戏中。
```dart
    final world = World()
      ..add(stock)
      ..add(waste)
      ..addAll(foundations)
      ..addAll(piles);
    add(world);
```

```{note}
You may be wondering when you need to `await` the result of `add()`, and when
you don't. The short answer is: usually you don't need to wait, but if you want
to, then it won't hurt either.

If you check the documentation for `.add()` method, you'll see that the returned
future only waits until the component is finished loading, not until it is
actually mounted to the game. As such, you only have to wait for the future from
`.add()` if your logic requires that the component is fully loaded before it can
proceed. This is not very common.

If you don't `await` the future from `.add()`, then the component will be added
to the game anyways, and in the same amount of time.
```

::: warning 注意

您可能想知道什么时候需要等待 `add()` 的结果，什么时候不需要。 简短的回答是：通常您不需要等待，但如果您愿意，那么也不会有什么问题。

如果您查看 `.add()` 方法的文档，您会看到返回的 future 只等到组件完成加载，而不是直到它实际安装到游戏中。 因此，如果您的逻辑要求组件在继续之前完全加载，您只需等待 `.add()` 的 Future。 这种情况并不常见。

:::

最后，我们创建一个摄像机对象来观察这个世界。在内部，相机由两部分组成：视口和取景器。默认的视口是 `MaxViewport`，它占用了整个可用的屏幕大小——这正是我们的游戏所需要的，所以不需要改变任何东西。另一方面，取景器的设置需要考虑到底层世界的尺寸。

我们希望整个卡片布局在屏幕上可见，而无需滚动。 为了实现这一点，我们指定我们希望整个世界大小（即 `7*cardWidth + 8*cardGap x 4*cardHeight + 3*cardGap`）能够适应屏幕。 `.visibleGameSize` 设置确保无论设备大小如何，缩放级别都将被调整，以便游戏世界的指定块可见。

游戏大小的计算方法是这样的: 画面中有 7 张卡片，它们之间有 6 个间隙，再加上 2 个“间隙”来填充，您就得到了 `7 * cardWidth + 8 * cardGap` 的宽度。垂直方向上有两排牌，但是在底下一排我们需要一些额外的空间来显示一堆高的牌——据我粗略估计，一张牌的高度三倍就足够了——这就给出了游戏世界的总高度为 `4 * cardHeight + 3 * cardGap`。

接下来，我们指定世界的哪一部分将位于视区的“中心”。在这种情况下，我指定视图端口的“中心”应该位于屏幕的顶部中心，游戏世界中的对应点位于坐标 `[(7*cardWidth + 8*cardGap)/2, 0]`.

这样选择取景器的位置和锚点的原因是，如果游戏尺寸变得太宽或太高，我们希望它的反应：如果太宽，我们希望它居中在屏幕上，但如果屏幕太高，我们希望内容在顶部对齐。
```dart
    final camera = CameraComponent(world: world)
      ..viewfinder.visibleGameSize =
          Vector2(cardWidth * 7 + cardGap * 8, 4 * cardHeight + 3 * cardGap)
      ..viewfinder.position = Vector2(cardWidth * 3.5 + cardGap * 4, 0)
      ..viewfinder.anchor = Anchor.topCenter;
    add(camera);
```

如果您现在运行游戏，您应该会看到不同组件的占位符。如果您是在浏览器中运行游戏，试着调整窗口大小，看看游戏对此有何反应。

## 代码

*components/foundation.dart*

```dart
import 'package:flame/components.dart';

class Foundation extends PositionComponent {
  @override
  bool get debugMode => true;
}
```

*components/pile.dart*

```dart
import 'package:flame/components.dart';

class Pile extends PositionComponent {
  @override
  bool get debugMode => true;
}
```

*components/stock.dart*

```dart
import 'package:flame/components.dart';

class Stock extends PositionComponent {
  @override
  bool get debugMode => true;
}
```

*components/waste.dart*

```dart
import 'package:flame/components.dart';

class Waste extends PositionComponent {
  @override
  bool get debugMode => true;
}
```

*klondike_game.dart*

```dart
import 'package:flame/components.dart';
import 'package:flame/experimental.dart';
import 'package:flame/flame.dart';
import 'package:flame/game.dart';

import 'components/foundation.dart';
import 'components/pile.dart';
import 'components/stock.dart';
import 'components/waste.dart';

class KlondikeGame extends FlameGame {
  static const double cardGap = 175.0;
  static const double cardWidth = 1000.0;
  static const double cardHeight = 1400.0;
  static const double cardRadius = 100.0;
  static final Vector2 cardSize = Vector2(cardWidth, cardHeight);

  @override
  Future<void> onLoad() async {
    await Flame.images.load('klondike-sprites.png');

    final stock = Stock()
      ..size = cardSize
      ..position = Vector2(cardGap, cardGap);
    final waste = Waste()
      ..size = cardSize
      ..position = Vector2(cardWidth + 2 * cardGap, cardGap);
    final foundations = List.generate(
      4,
      (i) => Foundation()
        ..size = cardSize
        ..position =
            Vector2((i + 3) * (cardWidth + cardGap) + cardGap, cardGap),
    );
    final piles = List.generate(
      7,
      (i) => Pile()
        ..size = cardSize
        ..position = Vector2(
          cardGap + i * (cardWidth + cardGap),
          cardHeight + 2 * cardGap,
        ),
    );

    final world = World()
      ..add(stock)
      ..add(waste)
      ..addAll(foundations)
      ..addAll(piles);
    add(world);

    final camera = CameraComponent(world: world)
      ..viewfinder.visibleGameSize =
          Vector2(cardWidth * 7 + cardGap * 8, 4 * cardHeight + 3 * cardGap)
      ..viewfinder.position = Vector2(cardWidth * 3.5 + cardGap * 4, 0)
      ..viewfinder.anchor = Anchor.topCenter;
    add(camera);
  }
}

Sprite klondikeSprite(double x, double y, double width, double height) {
  return Sprite(
    Flame.images.fromCache('klondike-sprites.png'),
    srcPosition: Vector2(x, y),
    srcSize: Vector2(width, height),
  );
}
```

*main.dart*

```dart
import 'package:flame/game.dart';
import 'package:flutter/widgets.dart';

import 'klondike_game.dart';

void main() {
  final game = KlondikeGame();
  runApp(GameWidget(game: game));
}
```


通过这一步，我们已经创建了基本的游戏结构，其他所有内容都将基于此构建。在下一步中，我们将学习如何渲染卡片对象，这是游戏中最重要的视觉对象。

[World]: ../../flame/camera-component.md#world
[Camera]: ../../flame/camera-component.md#cameracomponent
