---
prev:
  text: 其他输入
  link: /guide/flame/inputs/other-inputs.md
next:
  text: 文本渲染
  link: /guide/flame/rendering/text.md
---

# 图片

首先，您必须有一个合适的文件夹结构，并将这些文件添加到 `pubspec.yaml` 文件中，如下所示：

```yaml
flutter:
  assets:
    - assets/images/player.png
    - assets/images/enemy.png
```

图像可以是 Flutter 支持的任何格式，包括: JPEG、 WebP、 PNG、 GIF、 GIF 动画、 WebP 动画、 BMP 和 WBMP。其他格式将需要额外的库。例如，可以通过 [flame_svg](https://pub.dev/packages/flame_svg) 库加载 SVG 图像。


## 载入图片

Flame 捆绑了一个名为 `Images` 的实用程序类，它允许您轻松地从资产目录加载和缓存映像到内存中。

Flutter 有一些与图像相关的类型，将所有内容从本地资源正确转换为可以在 `Canvas`上绘制的图像有点复杂。 此类允许您使用 `drawImageRect` 方法获取可以在 `Canvas` 上绘制的图像。

它会自动缓存按文件名加载的任何图像，因此您可以安全地多次调用它。

加载和清除缓存的方法有：`load`、`loadAll`、`clear`和`clearCache`。 他们返回 `Futures `以加载图像。 在这些图像以任何方式使用之前，必须等待这些 `Future`。如果您不想立即等待这些`Future`，可以启动多个 `load()` 操作，然后使用 `Image.ready()` 方法一次等待所有的这些操作。

要同步检索以前缓存的映像，可以使用 `fromCache` 方法。如果以前没有加载具有该键的映像，则将引发异常。

若要将已加载的图像添加到缓存中，可以使用 `add` 方法，并可以设置图像在缓存中应该具有的键。

您还可以使用 `ImageExtension.fromPixels()` 在游戏期间动态创建图像。

对于 `clear` 和 `clearCache`，请务必注意，对于每个从缓存中删除的图像，都会调用 `dispose`，因此请确保事后不使用该图像。

### 单独使用

它可以通过实例化来手动使用：

```dart
import 'package:flame/images.dart';
final imagesLoader = Images();
Image image = await imagesLoader.load('yourImage.png');
```

但是 Flame 也提供了两种不需要自己实例化就可以使用这个类的方法。

### Flame.images

这是一个单例模式，由 Flame 类提供，可以用作全局图像缓存。

示例：

```dart
import 'package:flame/flame.dart';
import 'package:flame/sprite.dart';

// inside an async context
Image image = await Flame.images.load('player.png');

final playerSprite = Sprite(image);
```

### Game.images

`Game` 类也提供了一些处理图像加载的实用方法。它捆绑了一个 `Images` 类的实例，可以用来加载在游戏中使用的图像资源。当游戏小部件从小部件树中移除时，游戏将自动释放缓存。

`Game `类中的 `onLoad` 方法是装载初始资源的好地方。

示例：

```dart
class MyGame extends Game {

  Sprite player;

  @override
  Future<void> onLoad() async {
    final playerImage = await images.load('player.png'); // Note that you could also use Sprite.load for this
    player = Sprite(playerImage);
  }
}
```

当游戏运行时，也可以通过 `images.fromCache` 检索已加载的资产，例如：

```dart
class MyGame extends Game {

  // attributes omitted

  @override
  Future<void> onLoad() async {
    // other loads omitted
    await images.load('bullet.png');
  }

  void shoot() {
    // This is just an example, in your game you probably don't want to instantiate new [Sprite]
    // objects every time you shoot.
    final bulletSprite = Sprite(images.fromCache('bullet.png'));
    _bullets.add(bulletSprite);
  }
}
```

## 精灵图

Flame 提供了一个`Sprite`类，用于表示图像或图像区域。

您可以通过提供一个`Image`和坐标来定义精灵图所代表的图像部分来创建一个`Sprite`。

例如，这将创造一个代表所传递文件的整个图像的精灵图：

```dart
final image = await images.load('player.png');
Sprite player = Sprite(image);
```

您还可以在原始图像中指定精灵所在的坐标。这允许您使用精灵表并减少内存中的图像数量，例如：

```dart
final image = await images.load('player.png');
final playerFrame = Sprite(
  image,
  srcPosition: Vector2(32.0, 0),
  srcSize: Vector2(16.0, 16.0),
);
```

`srcPosition` 的默认值为`(0.0,0.0)` ，`srcSize` 的默认值为 `null` (这意味着它将使用源图像的全部宽度/高度)。

`Sprite` 类有一个 `render` 方法，允许您将精灵渲染到 `Canvas` 上：

```dart
final image = await images.load('block.png');
Sprite block = Sprite(image);

// in your render method
block.render(canvas, 16.0, 16.0); //canvas, width, height
```

您必须将大小传递给渲染方法，图像将相应地调整大小。

所有来自 `Sprite` 类的渲染方法都可以接收一个 `Paint` 实例作为可选的命名参数 `overridePaint`，该参数将覆盖当前渲染调用的 `Sprite` 绘制实例。

`Sprites` 也可以用作小部件，只需要使用 `SpriteWidget ` 类即可。

[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/widget/sprite_widget.dart)有一个使用精灵图作为窗口小部件的完整示例。

## SpriteBatch

如果您有一个精灵表（也称为图像图集，它是一个内部包含较小图像的图像），并且想要有效地渲染它 — `SpriteBatch `会为您处理这项工作。

给出图像的文件名，然后添加描述图像各个部分的矩形，以及变换（位置、缩放和旋转）和可选颜色。

您可以使用 `Canvas` 和可选的 `Paint`、`BlendMode` 和 `CullRect ` 来渲染它。

为了方便起见，还提供了一个 `SpriteBatchComponent`。

请看[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/sprites/spritebatch.dart)的示例。

## ImageComposition

在某些情况下，您可能希望将多个图像合并到一个图像中； 这就是所谓的[合成](https://en.wikipedia.org/wiki/Compositing)。例如，在使用  [SpriteBatch](#spritebatch) API 优化绘图调用时，这可能非常有用。

对于这种情况，Flame 自带 `ImageComposition` 类。这允许您在一个新图像上添加多个图像，每个图像的位置都不同：

```dart
final composition = ImageComposition()
  ..add(image1, Vector2(0, 0))
  ..add(image2, Vector2(64, 0));
  ..add(image3,
    Vector2(128, 0),
    source: Rect.fromLTWH(32, 32, 64, 64),
  );

Image image = await composition.compose();
```

**注意**：合成图像代价昂贵，我们不建议您每次运行都运行它，因为它会严重影响性能。 相反，我们建议您预先渲染您的作品，以便您可以重复使用输出图像。

## Svg

Flame 提供了一个简单的 API 来在游戏中渲染 SVG 图像。

对 Svg 的支持是由 [flame_svg](https://pub.dev/packages/flame_svg) 外部包提供的，一定要把它放在您的 pubspec 文件中使用。

要使用它，只需从 `'package:flame_svg/flame_svg.dart'` 导入 Svg 类。使用下面的代码片段在画布上渲染它：

```dart
Svg svgInstance = Svg('android.svg');

final position = Vector2(100, 100);
final size = Vector2(300, 300);

svgInstance.renderPosition(canvas, position, size);
```

或者使用 `SvgComponent`：

```dart
class MyGame extends FlameGame {
    Future<void> onLoad() async {
      final svgInstance = await Svg.load('android.svg');
      final size = Vector2.all(100);
      final svgComponent = SvgComponent.fromSvg(size, svgInstance);
      svgComponent.x = 100;
      svgComponent.y = 100;

      add(svgComponent);
    }
}
```

## 动画

Animation 类可以帮助您创建一个循环的精灵图动画。

您可以通过传递相同大小的精灵列表和 stepTime（即移动到下一帧所需的秒数）来创建它：

```dart
final a = SpriteAnimation.spriteList(sprites, stepTime: 0.02);
```

在动画创建之后，您需要调用它的 `update` 方法并在您的游戏实例上渲染当前帧的精灵图。

示例：

```dart
class MyGame extends Game {
  SpriteAnimation a;

  MyGame() {
    a = SpriteAnimation(...);
  }

  void update(double dt) {
    a.update(dt);
  }

  void render(Canvas c) {
    a.getSprite().render(c);
  }
}
```

一个更好的生成子图标列表的方法是使用 `fromFrameData` 构造器：

```dart
const amountOfFrames = 8;
final a = SpriteAnimation.fromFrameData(
    imageInstance,
    SpriteAnimationFrame.sequenced(
      amount: amountOfFrames,
      textureSize: Vector2(16.0, 16.0),
      stepTime: 0.1,
    ),
);
```

当使用精灵表时，这个构造函数使创建动画变得非常容易。

在构造函数中，传递一个图像实例和帧数据，其中包含一些可用于描述动画的参数。请查看 `SpriteAnimationFrameData` 类中可用的构造函数的文档，以查看所有参数。

如果您的动画使用了 Aseprite，那么 Flame 确实为 Aseprite 动画的 JSON 数据提供了一些支持。要使用这个功能，您需要导出精灵表的 JSON 数据，并使用如下代码片段：

```dart
final image = await images.load('chopper.png');
final jsonData = await assets.readJson('chopper.json');
final animation = SpriteAnimation.fromAsepriteData(image, jsonData);
```

**注意**：Flame 不支持修剪的精灵表，所以如果您将精灵表导出到这个 kway，它将具有修剪后的大小，而不是精灵的原始大小。

动画在创建之后，有一个更新和渲染方法；后者渲染当前帧，而前者通过内部计时来更新帧。

动画通常在 `SpriteAnimationComponents` 中使用，但也可以创建具有多个动画的自定义组件。

使用动画作为小部件的完整示例可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/widgets/sprite_animation_widget.dart)找到。

## FlareAnimation

Flame 提供了一个简单的 [Flare](https://rive.app/#LearnMore) 动画包装器，因此您可以在 Flame 游戏中使用它们。

查看下面的代码片段了解如何使用这个包装器：

```dart
class MyGame extends Game {
  FlareAnimation flareAnimation;
  bool loaded = false;

  MyGame() {
    _start();
  }

  void _start() async {
    flareAnimation = await FlareAnimation.load("assets/FLARE_FILE.flr");
    flareAnimation.updateAnimation("ANIMATION_NAME");

    flareAnimation.width = 306;
    flareAnimation.height = 228;

    loaded = true;
  }

  @override
  void render(Canvas canvas) {
    if (loaded) {
      flareAnimation.render(canvas, x: 50, y: 50);
    }
  }

  @override
  void update(double dt) {
    if (loaded) {
      flareAnimation.update(dt);
    }
  }
}
```

`FlareAnimations` 通常在 `FlareComponents` 中使用，这样 `FlameGame` 将自动处理调用 `render` 和 `update`。

您可以在[这里](https://github.com/flame-engine/flame_flare/tree/main/example)看到如何将 Flare 与 Flame 一起使用的完整示例。

## SpriteSheet

精灵表是带有若干帧相同精灵的大图像，是组织和保存动画的好方法。Flame 提供了一个非常简单的实用程序类来处理 SpriteSheets，有了它，您可以加载您的精灵表图像，并从中提取动画。下面是如何使用它的一个非常简单的例子：

```dart
import 'package:flame/sprite.dart';

final spritesheet = SpriteSheet(
  image: imageInstance,
  srcSize: Vector2.all(16.0),
);

final animation = spritesheet.createAnimation(0, stepTime: 0.1);
```

现在您可以直接使用动画或在动画组件中使用它。

您也可以使用 `getSprite` 方法得到精灵表的某个单帧：

```dart
spritesheet.getSprite(0, 0) // row, column;
```

您可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/sprites/spritesheet.dart)看到 `SpriteSheet` 类的完整示例。
