---
prev:
  text: 2. 脚手架
  link: /guide/tutorials/klondike/step2.md
next:
  text: 待续...
  link: /guide/tutorials/klondike/tbc.md
---



# 卡片

在本章中，我们将开始实现游戏中最可见的组件——卡片组件，它对应于一张现实生活中的卡牌。游戏中将有52张卡片对象。

每张牌都有一个等级（从 1 到 13，其中 1 是 A，13 是 K）和花色（从 0 到 3：红心 ♥、方块 ♦、梅花 ♣ 和黑桃 ♠）。 此外，每张卡片都会有一个布尔标志 `faceUp`，它控制卡片当前是朝上还是朝下。 这个属性对于渲染和游戏逻辑的某些方面都很重要。

点数和花色是卡片的简单属性，它们不是组件，因此我们需要决定如何表示它们。 有几种可能性：作为简单的 `int`，或作为枚举，或作为对象。 选择将取决于我们需要对它们执行哪些操作。 对于等级，我们需要能够判断一个等级是否比另一个等级高/低。 此外，我们需要生成与给定等级相对应的文本标签和精灵。 对于花色，我们需要知道两个花色是否颜色不同，还要产生一个文本标签和一个精灵。 鉴于这些要求，我决定将 `Rank` 和 `Suit` 都表示为类。


## 花色

创建文件 `Suit.dart` 并声明一个 `@immutable class Suit` ，没有父类。这里的 `@immutable` 注释只是提示我们，这个类的对象在创建之后不应该被修改。

接下来，我们为类定义工厂构造函数：`Suit.fromInt(i)`。我们在这里使用了一个工厂构造函数来实施类的单例模式：我们不是每次都创建一个新对象，而是返回我们存储在 ` _ singletons` 列表中的一个预构建对象：

```dart
factory Suit.fromInt(int index) {
  assert(index >= 0 && index <= 3);
  return _singletons[index];
}
```

在此之后，还有一个私有构造函数 `Suit._()`。 此构造函数初始化每个 `Suit `对象的主要属性：数值、字符串标签和 sprite 对象，我们稍后将使用它们在画布上绘制花色符号。 sprite 对象使用我们在上一章创建的 `klondikeSprite()` 函数进行初始化：

```dart
Suit._(this.value, this.label, double x, double y, double w, double h)
    : sprite = klondikeSprite(x, y, w, h);

final int value;
final String label;
final Sprite sprite;
```

然后是游戏中所有 `Suit` 对象的静态列表。注意，我们将其定义为 `late`，这意味着只有在第一次需要它时才会初始化它。这一点很重要:正如我们上面看到的，构造函数试图从全局缓存检索图像，因此只有在将图像加载到缓存后才能调用它。

```dart
static late final List<Suit> _singletons = [
  Suit._(0, '♥', 1176, 17, 172, 183),
  Suit._(1, '♦', 973, 14, 177, 182),
  Suit._(2, '♣', 974, 226, 184, 172),
  Suit._(3, '♠', 1178, 220, 176, 182),
];
```
构造函数中的最后四个数字是精灵表 `klondike-sprites.png` 中精灵图像的坐标。如果您想知道我是如何得到这些数字的，答案是我使用了一个免费的在线服务 [spritecow. com] —— 这是一个在精灵表中定位精灵图的方便工具。

最后，我有一些简单的 `getter` 来确定花色的颜色。当我们需要强制规定卡片只能通过交替颜色被放置到列中时，这将是必需的。

```dart
/// Hearts and Diamonds are red, while Clubs and Spades are black.
bool get isRed => value <= 1;
bool get isBlack => value >= 2;
```


## 等级

`Rank `类与 `Suit` 非常相似。主要区别在于 `Rank` 包含两张精灵图而不是一个，分别对应红色和黑色的等级。`Rank`类的完整代码如下所示：

```dart
import 'package:flame/components.dart';
import 'package:flame/flame.dart';
import 'package:flutter/foundation.dart';

@immutable
class Rank {
  factory Rank.of(int value) {
    assert(value >= 1 && value <= 13);
    return _singletons[value - 1];
  }

  Rank._(
    this.value,
    this.label,
    double x1,
    double y1,
    double x2,
    double y2,
    double w,
    double h,
  )   : redSprite = klondikeSprite(x1, y1, w, h),
        blackSprite = klondikeSprite(x2, y2, w, h);

  final int value;
  final String label;
  final Sprite redSprite;
  final Sprite blackSprite;

  static late final List<Rank> _singletons = [
    Rank._(1, 'A', 335, 164, 789, 161, 120, 129),
    Rank._(2, '2', 20, 19, 15, 322, 83, 125),
    Rank._(3, '3', 122, 19, 117, 322, 80, 127),
    Rank._(4, '4', 213, 12, 208, 315, 93, 132),
    Rank._(5, '5', 314, 21, 309, 324, 85, 125),
    Rank._(6, '6', 419, 17, 414, 320, 84, 129),
    Rank._(7, '7', 509, 21, 505, 324, 92, 128),
    Rank._(8, '8', 612, 19, 607, 322, 78, 127),
    Rank._(9, '9', 709, 19, 704, 322, 84, 130),
    Rank._(10, '10', 810, 20, 805, 322, 137, 127),
    Rank._(11, 'J', 15, 170, 469, 167, 56, 126),
    Rank._(12, 'Q', 92, 168, 547, 165, 132, 128),
    Rank._(13, 'K', 243, 170, 696, 167, 92, 123),
  ];
}
```


## 卡片组件

现在我们有了 `Rank` 和 `Suit` 类，我们终于可以开始实现 `Card` 组件了。创建文件 `components/Card.dart` 并声明从 PositionComponent 扩展的 `Card` 类:
```dart
class Card extends PositionComponent {}
```

该类的构造函数将采用整数等级和花色，并使卡片最初面朝下。 此外，我们将组件的大小初始化为等于 `KlondikeGame` 类中定义的 `cardSize` 常量：
```dart
Card(int intRank, int intSuit)
    : rank = Rank.fromInt(intRank),
      suit = Suit.fromInt(intSuit),
      _faceUp = false,
      super(size: KlondikeGame.cardSize);
      
final Rank rank;
final Suit suit;
bool _faceUp;
```

_faceUp 属性是私有的（由下划线表示），并且是非final的，这意味着它可以在一张卡的生命周期内更改。我们应该为这个变量创建一些公共访问器和修改器：
```dart
bool get isFaceUp => _faceUp;
void flip() => _faceUp = !_faceUp;
```

最后，让我们添加一个简单的toString()实现，当我们需要调试游戏时，它可能会变得很有用：
```dart
@override
String toString() => rank.label + suit.label; // e.g. "Q♠" or "10♦"
```

在我们继续实现渲染之前，我们需要在游戏中添加一些卡片。转到 `KlondikeGame` 类，在 `onLoad` 方法的底部添加以下内容：
```dart
final random = Random();
for (var i = 0; i < 7; i++) {
  for (var j = 0; j < 4; j++) {
    final card = Card(random.nextInt(13) + 1, random.nextInt(4))
      ..position = Vector2(100 + i * 1150, 100 + j * 1500)
      ..addToParent(world);
    if (random.nextDouble() < 0.9) { // flip face up with 90% probability
      card.flip();
    }
  }
}
```
这个代码片段是一个临时代码——我们将在下一章中删除它——但是现在它在桌面上随机放置了28张牌，大多数都是面朝上的。


### 渲染

为了能够看到一张卡片，我们需要实现它的 `render()` 方法。由于卡有两个不同的状态——正面朝上或者正面朝下——我们将分别为这两个状态实现渲染。在 `Card` 类中添加以下方法：
```dart
@override
void render(Canvas canvas) {
  if (_faceUp) {
    _renderFront(canvas);
  } else {
    _renderBack(canvas);
  }
}

void _renderFront(Canvas canvas) {}
void _renderBack(Canvas canvas) {}
```


### renderBack()

由于渲染卡片的背面比较简单，所以我们将首先进行渲染。

`PositionComponent` 的 `render()` 方法在局部坐标系统中运行，这意味着我们不需要担心卡片在屏幕上的位置。这个局部坐标系统的原点位于组件的左上角，并按宽度向右扩展，按高度向下扩展像素。

在如何绘制卡片背面方面有很多艺术自由，但我的实现包含了一个坚实的背景、一个边框、中间的 Flame 标志和另一个装饰边框：
```dart
void _renderBack(Canvas canvas) {
  canvas.drawRRect(cardRRect, backBackgroundPaint);
  canvas.drawRRect(cardRRect, backBorderPaint1);
  canvas.drawRRect(backRRectInner, backBorderPaint2);
  flameSprite.render(canvas, position: size / 2, anchor: Anchor.center);
}
```
这里最有趣的部分是精灵图的渲染：我们希望以中间 `(size/2)` 渲染它，我们使用 `Anchor.center` 来告诉引擎我们希望精灵的中心位于那一点。

`_ renderBack()` 方法中使用的各种属性定义如下：
```dart
static final Paint backBackgroundPaint = Paint()
  ..color = const Color(0xff380c02);
static final Paint backBorderPaint1 = Paint()
  ..color = const Color(0xffdbaf58)
  ..style = PaintingStyle.stroke
  ..strokeWidth = 10;
static final Paint backBorderPaint2 = Paint()
  ..color = const Color(0x5CEF971B)
  ..style = PaintingStyle.stroke
  ..strokeWidth = 35;
static final RRect cardRRect = RRect.fromRectAndRadius(
  KlondikeGame.cardSize.toRect(),
  const Radius.circular(KlondikeGame.cardRadius),
);
static final RRect backRRectInner = cardRRect.deflate(40);
static late final Sprite flameSprite = klondikeSprite(1367, 6, 357, 501);
```
我将这些属性声明为静态的，因为它们在所有52个卡片对象中都是相同的，所以我们不妨通过只初始化它们一次来节省一些资源。


### renderFront()

当渲染一张卡片的正面时，我们将遵循标准的卡片设计：在两个相对的角落中的等级和花色，加上等于等级值的点数。纸牌（杰克、王后、国王）将在中间有特殊的图像。

与前面一样，我们首先声明一些将用于呈现的常量。一张卡片的背景将是黑色的，而边框将根据卡片是“红”花色还是“黑”花色而有所不同:
```dart
static final Paint frontBackgroundPaint = Paint()
  ..color = const Color(0xff000000);
static final Paint redBorderPaint = Paint()
  ..color = const Color(0xffece8a3)
  ..style = PaintingStyle.stroke
  ..strokeWidth = 10;
static final Paint blackBorderPaint = Paint()
  ..color = const Color(0xff7ab2e8)
  ..style = PaintingStyle.stroke
  ..strokeWidth = 10;
```

接下来，我们还需要纸牌上的图：
```dart
static late final Sprite redJack = klondikeSprite(81, 565, 562, 488);
static late final Sprite redQueen = klondikeSprite(717, 541, 486, 515);
static late final Sprite redKing = klondikeSprite(1305, 532, 407, 549);
```

请注意，我将这些精灵称为 `redJack`、`redQueen` 和 `redKing`。 这是因为，经过一番尝试，我发现我的图像在黑套装卡上看起来不太好。 所以我决定做的是拍摄这些图像并用蓝色调给它们着色。 可以通过使用将 `colorFilter` 设置为指定颜色和 `srcATop` 混合模式的绘制来实现精灵的着色：
```dart
static final blueFilter = Paint()
  ..colorFilter = const ColorFilter.mode(
    Color(0x880d8bff),
    BlendMode.srcATop,
  );
static late final Sprite blackJack = klondikeSprite(81, 565, 562, 488)
  ..paint = blueFilter;
static late final Sprite blackQueen = klondikeSprite(717, 541, 486, 515)
  ..paint = blueFilter;
static late final Sprite blackKing = klondikeSprite(1305, 532, 407, 549)
  ..paint = blueFilter;
```

现在我们可以开始对 `render` 方法本身进行代码编写：
```dart
void _renderFront(Canvas canvas) {
  canvas.drawRRect(cardRRect, frontBackgroundPaint);
  canvas.drawRRect(
    cardRRect,
    suit.isRed ? redBorderPaint : blackBorderPaint,
  );
}
```

为了画出卡片的其余部分，我还需要一种辅助方法。 此方法将在指定位置（该位置相对于卡片的尺寸）在画布上绘制提供的精灵图。精灵图可以随意缩放。此外，如果传递了标致 `rotate=true`，那么精灵图将被绘制成围绕纸牌中心旋转180度的样子
```dart
void _drawSprite(
  Canvas canvas,
  Sprite sprite,
  double relativeX,
  double relativeY, {
  double scale = 1,
  bool rotate = false,
}) {
  if (rotate) {
    canvas.save();
    canvas.translate(size.x / 2, size.y / 2);
    canvas.rotate(pi);
    canvas.translate(-size.x / 2, -size.y / 2);
  }
  sprite.render(
    canvas,
    position: Vector2(relativeX * size.x, relativeY * size.y),
    anchor: Anchor.center,
    size: sprite.srcSize.scaled(scale),
  );
  if (rotate) {
    canvas.restore();
  }
}
```

让我们在牌的角落画出等级和花色符号。向 `_ renderFront()` 方法添加以下内容：
```dart
final rankSprite = suit.isBlack ? rank.blackSprite : rank.redSprite;
final suitSprite = suit.sprite;
_drawSprite(canvas, rankSprite, 0.1, 0.08);
_drawSprite(canvas, rankSprite, 0.1, 0.08, rotate: true);
_drawSprite(canvas, suitSprite, 0.1, 0.18, scale: 0.5);
_drawSprite(canvas, suitSprite, 0.1, 0.18, scale: 0.5, rotate: true);
```

卡片的中间部分以同样的方式呈现：我们将创建一个关于卡片等级的大switch语句，并相应地绘制点数。面的代码可能看起来很长，但实际上相当一部分是重复的，它只是在卡片表面的不同位置绘制不同的精灵图。
```dart
switch (rank.value) {
  case 1:
    _drawSprite(canvas, suitSprite, 0.5, 0.5, scale: 2.5);
    break;
  case 2:
    _drawSprite(canvas, suitSprite, 0.5, 0.25);
    _drawSprite(canvas, suitSprite, 0.5, 0.25, rotate: true);
    break;
  case 3:
    _drawSprite(canvas, suitSprite, 0.5, 0.2);
    _drawSprite(canvas, suitSprite, 0.5, 0.5);
    _drawSprite(canvas, suitSprite, 0.5, 0.2, rotate: true);
    break;
  case 4:
    _drawSprite(canvas, suitSprite, 0.3, 0.25);
    _drawSprite(canvas, suitSprite, 0.7, 0.25);
    _drawSprite(canvas, suitSprite, 0.3, 0.25, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.25, rotate: true);
    break;
  case 5:
    _drawSprite(canvas, suitSprite, 0.3, 0.25);
    _drawSprite(canvas, suitSprite, 0.7, 0.25);
    _drawSprite(canvas, suitSprite, 0.3, 0.25, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.25, rotate: true);
    _drawSprite(canvas, suitSprite, 0.5, 0.5);
    break;
  case 6:
    _drawSprite(canvas, suitSprite, 0.3, 0.25);
    _drawSprite(canvas, suitSprite, 0.7, 0.25);
    _drawSprite(canvas, suitSprite, 0.3, 0.5);
    _drawSprite(canvas, suitSprite, 0.7, 0.5);
    _drawSprite(canvas, suitSprite, 0.3, 0.25, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.25, rotate: true);
    break;
  case 7:
    _drawSprite(canvas, suitSprite, 0.3, 0.2);
    _drawSprite(canvas, suitSprite, 0.7, 0.2);
    _drawSprite(canvas, suitSprite, 0.5, 0.35);
    _drawSprite(canvas, suitSprite, 0.3, 0.5);
    _drawSprite(canvas, suitSprite, 0.7, 0.5);
    _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
    break;
  case 8:
    _drawSprite(canvas, suitSprite, 0.3, 0.2);
    _drawSprite(canvas, suitSprite, 0.7, 0.2);
    _drawSprite(canvas, suitSprite, 0.5, 0.35);
    _drawSprite(canvas, suitSprite, 0.3, 0.5);
    _drawSprite(canvas, suitSprite, 0.7, 0.5);
    _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
    _drawSprite(canvas, suitSprite, 0.5, 0.35, rotate: true);
    break;
  case 9:
    _drawSprite(canvas, suitSprite, 0.3, 0.2);
    _drawSprite(canvas, suitSprite, 0.7, 0.2);
    _drawSprite(canvas, suitSprite, 0.5, 0.3);
    _drawSprite(canvas, suitSprite, 0.3, 0.4);
    _drawSprite(canvas, suitSprite, 0.7, 0.4);
    _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
    _drawSprite(canvas, suitSprite, 0.3, 0.4, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.4, rotate: true);
    break;
  case 10:
    _drawSprite(canvas, suitSprite, 0.3, 0.2);
    _drawSprite(canvas, suitSprite, 0.7, 0.2);
    _drawSprite(canvas, suitSprite, 0.5, 0.3);
    _drawSprite(canvas, suitSprite, 0.3, 0.4);
    _drawSprite(canvas, suitSprite, 0.7, 0.4);
    _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
    _drawSprite(canvas, suitSprite, 0.5, 0.3, rotate: true);
    _drawSprite(canvas, suitSprite, 0.3, 0.4, rotate: true);
    _drawSprite(canvas, suitSprite, 0.7, 0.4, rotate: true);
    break;
  case 11:
    _drawSprite(canvas, suit.isRed? redJack : blackJack, 0.5, 0.5);
    break;
  case 12:
    _drawSprite(canvas, suit.isRed? redQueen : blackQueen, 0.5, 0.5);
    break;
  case 13:
    _drawSprite(canvas, suit.isRed? redKing : blackKing, 0.5, 0.5);
    break;
}
```

这就是卡片组件的渲染图。如果您现在运行代码，您将看到四行卡片整齐地分布在桌面上。刷新页面将放置一组新的卡片。请记住，我们只是以这种方式暂时放置这些牌，以便能够检查渲染是否正常工作。

在下一章，我们将讨论如何实现与卡片的交互，也就是说，如何使它们可拖动和可伸缩。

## 代码

*components/card.dart*

```dart
import 'dart:math';import 'dart:ui';import 'package:flame/components.dart';import '../klondike_game.dart';import '../rank.dart';import '../suit.dart';class Card extends PositionComponent {
  Card(int intRank, int intSuit)
      : rank = Rank.fromInt(intRank),
        suit = Suit.fromInt(intSuit),
        _faceUp = false,
        super(size: KlondikeGame.cardSize);

  final Rank rank;
  final Suit suit;
  bool _faceUp;

  bool get isFaceUp => _faceUp;
  void flip() => _faceUp = !_faceUp;

  @override
  String toString() => rank.label + suit.label; // e.g. "Q♠" or "10♦"

  @override
  void render(Canvas canvas) {
    if (_faceUp) {
      _renderFront(canvas);
    } else {
      _renderBack(canvas);
    }
  }

  static final Paint backBackgroundPaint = Paint()
    ..color = const Color(0xff380c02);
  static final Paint backBorderPaint1 = Paint()
    ..color = const Color(0xffdbaf58)
    ..style = PaintingStyle.stroke
    ..strokeWidth = 10;
  static final Paint backBorderPaint2 = Paint()
    ..color = const Color(0x5CEF971B)
    ..style = PaintingStyle.stroke
    ..strokeWidth = 35;
  static final RRect cardRRect = RRect.fromRectAndRadius(
    KlondikeGame.cardSize.toRect(),
    const Radius.circular(KlondikeGame.cardRadius),
  );
  static final RRect backRRectInner = cardRRect.deflate(40);
  static late final Sprite flameSprite = klondikeSprite(1367, 6, 357, 501);

  void _renderBack(Canvas canvas) {
    canvas.drawRRect(cardRRect, backBackgroundPaint);
    canvas.drawRRect(cardRRect, backBorderPaint1);
    canvas.drawRRect(backRRectInner, backBorderPaint2);
    flameSprite.render(canvas, position: size / 2, anchor: Anchor.center);
  }

  static final Paint frontBackgroundPaint = Paint()
    ..color = const Color(0xff000000);
  static final Paint redBorderPaint = Paint()
    ..color = const Color(0xffece8a3)
    ..style = PaintingStyle.stroke
    ..strokeWidth = 10;
  static final Paint blackBorderPaint = Paint()
    ..color = const Color(0xff7ab2e8)
    ..style = PaintingStyle.stroke
    ..strokeWidth = 10;
  static final blueFilter = Paint()
    ..colorFilter = const ColorFilter.mode(
      Color(0x880d8bff),
      BlendMode.srcATop,
    );
  static late final Sprite redJack = klondikeSprite(81, 565, 562, 488);
  static late final Sprite redQueen = klondikeSprite(717, 541, 486, 515);
  static late final Sprite redKing = klondikeSprite(1305, 532, 407, 549);
  static late final Sprite blackJack = klondikeSprite(81, 565, 562, 488)
    ..paint = blueFilter;
  static late final Sprite blackQueen = klondikeSprite(717, 541, 486, 515)
    ..paint = blueFilter;
  static late final Sprite blackKing = klondikeSprite(1305, 532, 407, 549)
    ..paint = blueFilter;

  void _renderFront(Canvas canvas) {
    canvas.drawRRect(cardRRect, frontBackgroundPaint);
    canvas.drawRRect(
      cardRRect,
      suit.isRed ? redBorderPaint : blackBorderPaint,
    );

    final rankSprite = suit.isBlack ? rank.blackSprite : rank.redSprite;
    final suitSprite = suit.sprite;
    _drawSprite(canvas, rankSprite, 0.1, 0.08);
    _drawSprite(canvas, suitSprite, 0.1, 0.18, scale: 0.5);
    _drawSprite(canvas, rankSprite, 0.1, 0.08, rotate: true);
    _drawSprite(canvas, suitSprite, 0.1, 0.18, scale: 0.5, rotate: true);
    switch (rank.value) {
      case 1:
        _drawSprite(canvas, suitSprite, 0.5, 0.5, scale: 2.5);
        break;
      case 2:
        _drawSprite(canvas, suitSprite, 0.5, 0.25);
        _drawSprite(canvas, suitSprite, 0.5, 0.25, rotate: true);
        break;
      case 3:
        _drawSprite(canvas, suitSprite, 0.5, 0.2);
        _drawSprite(canvas, suitSprite, 0.5, 0.5);
        _drawSprite(canvas, suitSprite, 0.5, 0.2, rotate: true);
        break;
      case 4:
        _drawSprite(canvas, suitSprite, 0.3, 0.25);
        _drawSprite(canvas, suitSprite, 0.7, 0.25);
        _drawSprite(canvas, suitSprite, 0.3, 0.25, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.25, rotate: true);
        break;
      case 5:
        _drawSprite(canvas, suitSprite, 0.3, 0.25);
        _drawSprite(canvas, suitSprite, 0.7, 0.25);
        _drawSprite(canvas, suitSprite, 0.3, 0.25, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.25, rotate: true);
        _drawSprite(canvas, suitSprite, 0.5, 0.5);
        break;
      case 6:
        _drawSprite(canvas, suitSprite, 0.3, 0.25);
        _drawSprite(canvas, suitSprite, 0.7, 0.25);
        _drawSprite(canvas, suitSprite, 0.3, 0.5);
        _drawSprite(canvas, suitSprite, 0.7, 0.5);
        _drawSprite(canvas, suitSprite, 0.3, 0.25, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.25, rotate: true);
        break;
      case 7:
        _drawSprite(canvas, suitSprite, 0.3, 0.2);
        _drawSprite(canvas, suitSprite, 0.7, 0.2);
        _drawSprite(canvas, suitSprite, 0.5, 0.35);
        _drawSprite(canvas, suitSprite, 0.3, 0.5);
        _drawSprite(canvas, suitSprite, 0.7, 0.5);
        _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
        break;
      case 8:
        _drawSprite(canvas, suitSprite, 0.3, 0.2);
        _drawSprite(canvas, suitSprite, 0.7, 0.2);
        _drawSprite(canvas, suitSprite, 0.5, 0.35);
        _drawSprite(canvas, suitSprite, 0.3, 0.5);
        _drawSprite(canvas, suitSprite, 0.7, 0.5);
        _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
        _drawSprite(canvas, suitSprite, 0.5, 0.35, rotate: true);
        break;
      case 9:
        _drawSprite(canvas, suitSprite, 0.3, 0.2);
        _drawSprite(canvas, suitSprite, 0.7, 0.2);
        _drawSprite(canvas, suitSprite, 0.5, 0.3);
        _drawSprite(canvas, suitSprite, 0.3, 0.4);
        _drawSprite(canvas, suitSprite, 0.7, 0.4);
        _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
        _drawSprite(canvas, suitSprite, 0.3, 0.4, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.4, rotate: true);
        break;
      case 10:
        _drawSprite(canvas, suitSprite, 0.3, 0.2);
        _drawSprite(canvas, suitSprite, 0.7, 0.2);
        _drawSprite(canvas, suitSprite, 0.5, 0.3);
        _drawSprite(canvas, suitSprite, 0.3, 0.4);
        _drawSprite(canvas, suitSprite, 0.7, 0.4);
        _drawSprite(canvas, suitSprite, 0.3, 0.2, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.2, rotate: true);
        _drawSprite(canvas, suitSprite, 0.5, 0.3, rotate: true);
        _drawSprite(canvas, suitSprite, 0.3, 0.4, rotate: true);
        _drawSprite(canvas, suitSprite, 0.7, 0.4, rotate: true);
        break;
      case 11:
        _drawSprite(canvas, suit.isRed ? redJack : blackJack, 0.5, 0.5);
        break;
      case 12:
        _drawSprite(canvas, suit.isRed ? redQueen : blackQueen, 0.5, 0.5);
        break;
      case 13:
        _drawSprite(canvas, suit.isRed ? redKing : blackKing, 0.5, 0.5);
        break;
    }
  }

  void _drawSprite(
    Canvas canvas,
    Sprite sprite,
    double relativeX,
    double relativeY, {
    double scale = 1,
    bool rotate = false,
  }) {
    if (rotate) {
      canvas.save();
      canvas.translate(size.x / 2, size.y / 2);
      canvas.rotate(pi);
      canvas.translate(-size.x / 2, -size.y / 2);
    }
    sprite.render(
      canvas,
      position: Vector2(relativeX * size.x, relativeY * size.y),
      anchor: Anchor.center,
      size: sprite.srcSize.scaled(scale),
    );
    if (rotate) {
      canvas.restore();
    }
  }
}
```

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
import 'dart:math';

import 'package:flame/components.dart';
import 'package:flame/experimental.dart';
import 'package:flame/flame.dart';
import 'package:flame/game.dart';

import 'components/card.dart';
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

    final random = Random();
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 4; j++) {
        final card = Card(random.nextInt(13) + 1, random.nextInt(4))
          ..position = Vector2(100 + i * 1150, 100 + j * 1500)
          ..addToParent(world);
        // flip the card face-up with 90% probability
        if (random.nextDouble() < 0.9) {
          card.flip();
        }
      }
    }
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

*rank.dart*

```dart
import 'package:flame/components.dart';
import 'package:flutter/foundation.dart';
import 'klondike_game.dart';

@immutable
class Rank {
  factory Rank.fromInt(int value) {
    assert(value >= 1 && value <= 13);
    return _singletons[value - 1];
  }

  Rank._(
    this.value,
    this.label,
    double x1,
    double y1,
    double x2,
    double y2,
    double w,
    double h,
  )   : redSprite = klondikeSprite(x1, y1, w, h),
        blackSprite = klondikeSprite(x2, y2, w, h);

  final int value;
  final String label;
  final Sprite redSprite;
  final Sprite blackSprite;

  static late final List<Rank> _singletons = [
    Rank._(1, 'A', 335, 164, 789, 161, 120, 129),
    Rank._(2, '2', 20, 19, 15, 322, 83, 125),
    Rank._(3, '3', 122, 19, 117, 322, 80, 127),
    Rank._(4, '4', 213, 12, 208, 315, 93, 132),
    Rank._(5, '5', 314, 21, 309, 324, 85, 125),
    Rank._(6, '6', 419, 17, 414, 320, 84, 129),
    Rank._(7, '7', 509, 21, 505, 324, 92, 128),
    Rank._(8, '8', 612, 19, 607, 322, 78, 127),
    Rank._(9, '9', 709, 19, 704, 322, 84, 130),
    Rank._(10, '10', 810, 20, 805, 322, 137, 127),
    Rank._(11, 'J', 15, 170, 469, 167, 56, 126),
    Rank._(12, 'Q', 92, 168, 547, 165, 132, 128),
    Rank._(13, 'K', 243, 170, 696, 167, 92, 123),
  ];
}
```

*suit.dart*

```dart
import 'package:flame/sprite.dart';
import 'package:flutter/foundation.dart';
import 'klondike_game.dart';

@immutable
class Suit {
  factory Suit.fromInt(int index) {
    assert(index >= 0 && index <= 3);
    return _singletons[index];
  }

  Suit._(this.value, this.label, double x, double y, double w, double h)
      : sprite = klondikeSprite(x, y, w, h);

  final int value;
  final String label;
  final Sprite sprite;

  static late final List<Suit> _singletons = [
    Suit._(0, '♥', 1176, 17, 172, 183),
    Suit._(1, '♦', 973, 14, 177, 182),
    Suit._(2, '♣', 974, 226, 184, 172),
    Suit._(3, '♠', 1178, 220, 176, 182),
  ];

  /// Hearts and Diamonds are red, while Clubs and Spades are black.
  bool get isRed => value <= 1;
  bool get isBlack => value >= 2;
}
```

[spritecow.com]: http://www.spritecow.com/
