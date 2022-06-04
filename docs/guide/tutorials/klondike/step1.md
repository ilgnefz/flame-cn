---
prev:
  text: Klondike
  link: /guide/tutorials/klondike/klondike.md
next:
  text: 2. 脚手架
  link: /guide/tutorials/klondike/step2.md
---



# 1. 准备

在您开始任何类型的游戏项目之前，您需要给它一个名字。在本教程中，名称将是简单的 `klondike`。

记住这个名字后，请前往[空白的Flame游戏](../bare_flame_game.md)教程完成必要的步骤。当您回来的时候，您应该已经有了`main.dart`文件，它包含以下内容：

```dart
import 'package:flame/game.dart';
import 'package:flutter/widgets.dart';

void main() {
  final game = FlameGame();
  runApp(GameWidget(game: game));
}
```


## 规划

T任何项目的开始通常都会让人感到压力山大。从哪里开始呢？我发现总是创建一个关于我将要编写的代码的草图很有用，这样它就可以作为一个参考点。我对`klondike`游戏的草图如下：

![](/images/tutorials/klondike-sketch.webp)

在这里您可以看到游戏的总体布局，以及各种对象的名称。这些名字是纸牌游戏的[标准术语](https://en.wikipedia.org/wiki/Solitaire_terminology)。这真的很幸运，因为通常为不同的类找出好的名字是一个相当具有挑战性的任务。

看这个草图，我们已经可以想象出游戏的高层结构了。 显然，会有一个 `Card` 类，还有 `Stock` 类、`Waste` 类、一个包含 7 个 `Piles` 和 4 个 `Foundations` 的 `Tableau`。也可能有一副牌。所有这些组件将通过派生自 `FlameGame` 的 `KlondikeGame` 绑定在一起。


## 资源

游戏开发的另一个重要方面是游戏的资产。这包括图像、精灵、动画、声音、纹理、数据文件等。在像 `Klondike` 这样简单的游戏中，我们不需要很多花哨的图像，但仍然需要一些精灵图来绘制牌面。

为了准备图文资源，我先拿了一张实体扑克牌，测出来是63mm×88mm，大概是10:14的比例。 因此，我决定我的游戏内卡片应该以 1000×1400 像素进行渲染，并且我应该以这种比例绘制所有图像。

请注意，确切的像素尺寸在这里有点无关紧要，因为图像最终会根据设备的实际分辨率向上或向下缩放。在这里，我使用的分辨率可能比手机所需要的分辨率要大，所以对于像 iPad 这样的大型设备来说，它也能很好地工作。

现在，闲话少说，下面是我在克朗代克游戏中的图形资产（我不是一个艺术家，所以不要过于苛刻地评判）：

![](/images/tutorials/klondike-sprites.png)

右键单击图像，选择“另存为...”，并将其存储在项目的 `assets/images` 文件夹中。在这一点上，我们的项目结构如下（当然还有其他文件，但这些是最重要的）：

```text
klondike/
 ├─assets/
 │  └─images/
 │     └─klondike-sprites.png
 ├─lib/
 │  └─main.dart
 └─pubspec.yaml
```

顺便说一下，这种文件被称为 `spritessheet`：它只是一个文件中多个独立图像的集合。我们在这里使用 `spritessheet` 的原因很简单: 加载一个大图像比加载许多小图像要快。另外，从单个源图像中提取的渲染精灵也可以更快，因为 Flutter 会将多个这样的绘制命令优化为单个 `drawAtlas` 命令。

以下是我的精灵表的内容：
  - 数字2,3,4，... ，k，a。理论上，我们可以在游戏中将这些字符串作为文本字符串呈现，但是我们还需要将字体作为资产包含进来——将它们作为图像来呈现似乎更简单。
  - 花色标记：♥、♦、♣、♠。 同样，我们可以为这些使用 Unicode 字符，但图像更容易精确定位。
      * 如果您想知道为什么这些颜色是黄色/蓝色而不是红色/黑色——因为，黑色符号在深色背景下看起来不是很好，所以我不得不调整配色方案。
  - Flame 标志，用在卡片的背面。
  - 杰克，王后和国王的照片。通常情况下会有四倍以上的这些，每个套件有不同的角色，但对于我来说，绘制这些太累了。

此外，您需要告诉 Flutter 这个图像（仅仅在 `assets` 文件夹中有它是不够的）。为了做到这一点，我们在 pubspec.yaml 文件中添加以下代码行：

```yaml
flutter:
  assets:
    - assets/images/
```

好了，准备工作到此为止-开始编程吧！
