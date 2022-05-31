---
prev:
  text: 游戏循环
  link: /guide/flame/game-loop.md
next:
  text: 平台
  link: /guide/flame/platforms.md
---

# 组件

![Component tree](/images/component-tree.png)

这张图可能看起来很吓人，但是不要担心，它并不像它看起来那么复杂。


## 组件

所有组件都从抽象类`Component`继承。

如果您想跳过阅读抽象类有关的内容，可以直击跳转到[PositionComponent](#positioncomponent)。

在`FlameGame`类中，每个`Component`都有一些您可以选择实现的方法。如果您不使用`FlameGame`，您依然可以在您自己的游戏循环中使用这些方法。

![Component Lifecycle Diagram](/images/component-lifecycle.png)

只要调整屏幕大小，就会调用`onGameResize`方法，一旦在开始时，通过`add`方法将组件添加到游戏中，也会调用`onGameResize`方法。

在组件从游戏中移除之前，可以重写`onRemove`方法来运行代码，即使组件通过父`remove`方法和`component`移除方法被移除，它也只会运行一次。

可以重写`onLoad`方法来运行组件的异步初始化代码，例如加载图像。这个方法会在`onGameResize`之后，`onMount`之前运行。该方法保证在组件的生命周期内只执行一次，因此可以将其视为异步构造函数。

`onMount`方法在每次组件被挂载到游戏树时运行。这意味着您不应该在这里初始化`late final`变量，因为这个方法可能会在组件的生命周期内多次运行。此方法仅在父进程已经挂载的情况下运行。如果父进程还没有挂载，那么这个方法将在一个队列中等待（这对游戏引擎的其他部分没有影响）。

组件的生命周期状态可以通过一系列getter来检查：
 - `isLoaded`：返回当前加载状态的bool值
 - `loaded`：返回一个在组件加载完成后的future值
 - `isMounted`：返回当前挂载状态的bool值
 - `mounted`：返回一个在组件一旦完成挂载后的future值

### 优先权

在 Flame 中，顺序组件的呈现(和更新)被称为`priority`，这在其他语言和框架中有时也被称为`z-index`。优先级设置得越高，该组件出现在屏幕上的距离就越近，因为它将被渲染在其他优先级较低的组件之上。

例如，如果添加两个组件，并将其中一个组件的优先级设置为1，那么该组件将呈现在另一个组件之上(如果它们重叠)，因为默认优先级为0。

所有组件都有一个`priority`的命名参数。所以，如果在编译时知道组件的优先级，就可以将其传递给构造函数。

例子：

```dart
class MyGame extends FlameGame {
  @override
  Future<void> onLoad() {
    final myComponent = PositionComponent(priority: 5);
    add(myComponent);
  }
}
```

要更新组件的优先级，您必须将其设置为一个新值，如`component.priority = 2`，它将在下一个时刻更新。

例子：

```dart
class MyComponent extends PositionComponent with Tappable {

  MyComponent() : super(priority: 1);

  @override
  void onTap() {
    priority = 2;
  }
}
```

在上面的例子中，我们首先设置组件的初始化优先级为1，当用户点击组件时，我们将优先级改为2。


### 可组合性的组件

有时，将其他组件封装到组件中是很有用的。例如，通过层次结构对可视化组件进行分组。您可以通过向任何组件添加子组件来实现这一点，例如`PositionComponent`。

当一个组件上有子组件时，每次父组件被更新和呈现，所有的子组件都以相同的条件呈现和更新。

使用示例，其中两个组件的可见性由包装器处理：

```dart
class GameOverPanel extends PositionComponent with HasGameRef<MyGame> {
  bool visible = false;
  final Image spriteImage;

  GameOverPanel(this.spriteImage);

  @override
  Future<void> onLoad() async {
    final gameOverText = GameOverText(spriteImage); // GameOverText是一个组件
    final gameOverButton = GameOverButton(spriteImage); // GameOverRestart是一个SpriteComponent

    add(gameOverText);
    add(gameOverButton);
  }

  @override
  void render(Canvas canvas) {
    if (visible) {
    } // 如果不可见，则不会显示任何子元素
  }
}
```

有两种方法可以将子组件添加到组件中。首先，您有`add()`、`addAll()`和`addToParent()`方法，它们可以在游戏期间的任何时候使用。传统上，子元素是通过组件的`onLoad()`方法创建和添加的，但在游戏过程中添加新的子元素也很常见。

第二种方法是在组件的构造函数中使用`children:`参数。这种方法更类似于标准的Flutter API：

```dart
class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    add(
      PositionComponent(
        position: Vector2(30, 0),
        children: [
          HighScoreDisplay(),
          HitPointsDisplay(),
          FpsComponent(),
        ],
      ),
    );
  }
}
```

这两种方法可以自由组合：首先添加构造函数中指定的子组件，然后添加任何其他子组件。

注意，通过这两种方法添加的子对象只保证最终可用：在它们被加载和挂载之后。我们只能保证它们将以与计划添加时相同的顺序出现在子列表中。

### 确保组件有一个给定的父组件

当组件需要添加到特定的父类型时`ParentIsA` 'mixin可用于强制强类型父类。

示例：

```dart
class MyComponent extends Component with ParentIsA<MyParentComponent> {
  @override
  Future<void> onLoad() async {
    // parent is of type MyParentComponent
    print(parent.myValue);
  }
}
```

如果你试图将`MyComponent`添加到一个不是`MyParentComponent`的父组件，将抛出断言错误。

### 查询子组件

已经添加到组件中的子组件存在于名为`children`的`QueryableOrderedSet`中。要查询集合中特定类型的组件，可以使用`query<T>()`函数。默认情况下，`strictMode`在子节点设置为`false`，但如果你设置为`true`，那么在使用查询之前必须注册到`children.register`。

示例：

```dart
@override
Future<void> onLoad() async {
  children.register<PositionComponent>();
}
```

在上面的示例中，为`PositionComponents`注册了一个查询，下面是如何查询注册的组件类型的示例：

```dart
@override
void update(double dt) {
  final allPositionComponents = children.query<PositionComponent>();
}
```

### 在屏幕上的特定点查询组件

`componentsAtPoint()`方法允许您检查在屏幕上的某个点上呈现了哪些组件。返回值是一个组件的可迭代对象，但您也可以通过提供一个可写的`List<Vector2>`作为第二个参数来获得每个组件的局部坐标空间中初始点的坐标。

可迭代对象按照从前到后的顺序检索组件，即首先检索组件前面的组件，然后再是后面的组件。

这个方法只能返回实现`containsLocalPoint()`方法的组件。`PositionComponent`（这是Flame中许多组件的基类）提供了这样的一个实现。然而，如果你要定义一个派生自`Component`的自定义类，你就必须自己实现`containsLocalPoint()`方法。

这里有一个怎样使用 `componentsAtPoint()`的例子：

```dart
void onDragUpdate(DragUpdateInfo info) {
  game.componentsAtPoint(info.widget).forEach((component) {
    if (component is DropTarget) {
      component.highlight();
    }
  });
}
```

### PositionType

如果您想创建一个HUD (平视显示器)或其他组件的位置不相关的游戏坐标，您可以更改组件的`PositionType`。默认的`PositionType`是`PositionType = PositionType.game`，可以根据组件的位置更改为`PositionType.viewport`或`PositionType.widget`。

 - `PositionType.game`：默认值。 遵从摄像机和视口
 - `PositionType.viewport`：仅遵从视口 (忽略摄像机).
 - `PositionType.widget`：与Flutter游戏部件（即原始画布）的坐标系统相关的位置

您的大部分组件可能会根据`PositionType.game`来定位，因为您希望它们遵从摄像机和视口。但是通常情况下，你希望按钮和文本总是显示在屏幕上，不管你是否移动相机，然后你就会想使用 `PositionType.viewport`。在一些罕见的情况下，当你不希望组件遵从摄像机或视口时，你想使用`PositionType.widget`来定位你的组件；这可能为了控制器或操纵杆，如果他们必须呆在视口内，将不符合人体工程学的使用。

请注意，只有当组件直接添加到根`FlameGame`而不是作为另一个组件的子组件时，才会考虑这种设置。

## PositionComponent

这个类代表屏幕上的定位对象，如浮动矩形或旋转精灵。如果向它添加了子组件，它还可以表示一组定位组件。

基本的`PositionComponent`有 `position`、`size`、 `scale`、`angle` 和
`anchor` ，用来改变组件的呈现方式。


### 位置

`position` 只是一个`Vector2` ，它表示组件锚点相对于其父组件的位置；如果父组件是一个 `FlameGame`，那么它就相对于视图端口。


### 大小

当相机的缩放级别为1.0(默认无缩放)时，组件的`szie`。`size`与其父组件无关。


### 缩放

`scale`是组件及其子组件应该被缩放的程度。由于它是由`Vector2`表示的，所以可以通过用相同的量来改变`x`和`y`，也可以通过用不同的量来改变 `x` 或 `y`，从而以一种统一的方式进行缩放。


### 角度

`angle`是锚周围的旋转角度，用双弧度表示。它是相对于父角的。


### 锚

`anchor`是组件上应该定义位置和旋转的位置（默认值是 `Anchor.topLeft`）。因此，如果你将锚定位置设置为`Anchor.center`，如果应用了`angle`，锚将会显示在组件中间，它将围绕着锚定位置旋转，所以在这种情况下，围绕组件的中心旋转。你可以把它看作是组件中的一个点，通过它 `Flame`可以“抓取”它。

### PositionComponent子元素

所有`PositionComponent`的子元素都将相对于父元素进行转换。这意味着 `position`、`size`和 `scale`的效果将相对于父元素的状态。例如，如果你想把一个子元素的逻辑像素定位在父元素的中心以上，你可以这样做：

```dart
Future<void> onLoad() async {
  final parent = PositionComponent(
    position: Vector2(100, 100),
    size: Vector2(100, 100),
    anchor: Anchor.center,
  );
  final child = PositionComponent(position: Vector2(0, -50));
  await parent.add(child);
}
```

请记住，在屏幕上呈现的大多数组件都是`PositionComponents`，因此这个模式也可以在例如[spritcomponent](#spritecomponent)和[SpriteAnimationComponent](#spriteanimationcomponent)中使用。

### 渲染PositionComponent

当为扩展`PositionComponent`的组件实现呈现方法时，请记住从左上角(0.0)进行呈现。渲染方法不应该处理组件在屏幕上应该呈现的位置。要处理您的组件应该呈现的位置和方式，可以使用 `position`, `angle` 和 `anchor` 属性，而Flame将自动处理其余部分。

如果您想知道组件的边界框在屏幕上的什么位置，您可以使用`toRect`方法。

如果要更改组件呈现的方向，你可以使用`fliphhorizontal()`和`flipvertical()`在锚点周围来翻转任何绘制到画布上的`render(Canvas canvas)`。这些方法适用于所有`PositionComponent`对象，尤其适用于`SpriteComponent`和`SpriteAnimationComponent`。

如果您希望在不更改锚点到`Anchor.center`的情况下绕中心翻转组件，则可以使用 `flipHorizontallyAroundCenter()`和 `flipVerticallyAroundCenter()`。


## SpriteComponent

`PositionComponent`最常用的实现是`SpriteComponent`，它可以用一个`Sprite`创建：

```dart
import 'package:flame/components/component.dart';

class MyGame extends FlameGame {
  late final SpriteComponent player;

  @override
  Future<void> onLoad() async {
    final sprite = await Sprite.load('player.png');
    final size = Vector2.all(128.0);
    final player = SpriteComponent(size: size, sprite: sprite);

    // 屏幕坐标
    player.position = ... // 默认值为Vector2(0.0, 0.0)，也可以在构造函数中设置
    player.angle = ... // 默认为0，也可以在构造函数中设置
    add(player); // 添加组件
  }
}
```

## SpriteAnimationComponent

此类用于表示在单个循环动画中运行的子精灵图的组件。

这将使用3个不同的图像创建一个简单的三帧动画：

```dart
final sprites = [0, 1, 2]
    .map((i) => Sprite.load('player_$i.png'));
final animation = SpriteAnimation.spriteList(
  await Future.wait(sprites),
  stepTime: 0.01,
);
this.player = SpriteAnimationComponent(
  animation: animation,
  size: Vector2.all(64.0),
);
```

如果你有一个精灵表，你可以使用`SpriteAnimationData`类的序列构造函数(查看 [Images &gt; Animation](/guide/flame/rendering/images.md)的更多细节)：

```dart
final size = Vector2.all(64.0);
final data = SpriteAnimationData.sequenced(
  textureSize: size,
  amount: 2,
  stepTime: 0.1,
);
this.player = SpriteAnimationComponent.fromFrameData(
  await images.load('player.png'),
  data,
);
```

如果您不使用`FlameGame`，不要忘记这个组件需要更新，因为动画对象需要勾选来移动帧。

你可以使用 `animation.completed`来监听动画完成（当它到达最后一帧并且没有循环的时候）。

示例：

```dart
await animation.completed;
doSomething();

// 或者

animation.completed.whenComplete(doSomething);
```


## SpriteAnimationGroupComponent

`SpriteAnimationGroupComponent`是一个围绕`SpriteAnimationComponent`的简单包装器，它使你的组件能够保存多个动画，并在运行时更改当前播放的动画。

它的使用非常类似于`SpriteAnimationComponent`，但不是用单个动画初始化，这个组件接收一个通用类型`T`的`Map`作为键，一个`SpriteAnimation`作为值，以及当前的动画。

示例：

```dart
enum RobotState {
  idle,
  running,
}

final running = await loadSpriteAnimation(/* omitted */);
final idle = await loadSpriteAnimation(/* omitted */);

final robot = SpriteAnimationGroupComponent<RobotState>(
  animations: {
    RobotState.running: running,
    RobotState.idle: idle,
  },
  current: RobotState.idle,
);

// 将当前动画更改为“运行”
robot.current = RobotState.running;
```


## SpriteGroupComponent

`SpriteGroupComponent`与它对应的动画非常相似，但对于精灵来说尤其如此。

示例：

```dart
class ButtonComponent extends SpriteGroupComponent<ButtonState>
    with HasGameRef<SpriteGroupExample>, Tappable {
  @override
  Future<void>? onLoad() async {
    final pressedSprite = await gameRef.loadSprite(/* omitted */);
    final unpressedSprite = await gameRef.loadSprite(/* omitted */);

    sprites = {
      ButtonState.pressed: pressedSprite,
      ButtonState.unpressed: unpressedSprite,
    };

    current = ButtonState.unpressed;
  }

  // Tap方法处理程序...
}
```

## SvgComponent

::: tip 提示

 要想在Flame使用SVG，可以使用[flame_svg](https://github.com/flame-engine/flame_svg)包

:::

这个组件使用一个Svg类的实例来表示一个在游戏中呈现Svg的组件：

```dart
final svg = await Svg.load('android.svg');
final android = SvgComponent.fromSvg(
  svg,
  position: Vector2.all(100),
  size: Vector2.all(100),
);
```

## FlareActorComponent

::: warning 注意

注意: 以前使用`FlareAnimation `和`FlareComponent `的 Flare 集成 API 的实现已经被废弃。

:::

在Flame中使用 Flare，可以使用 [`flame_flare`](https://github.com/flame-engine/flame_flare)包。

这是在Flame中使用 [flare animation](https://pub.dev/packages/flare_flutter)的界面。`FlareActorComponent`的API与 flare 的`FlareActor`小部件几乎相同。它接收动画文件名（默认情况下由`Flame.bundle`加载），它还可以接收一个`FlareController`，能播放多个动画并且控制节点。

```dart
import 'package:flame_flare/flame_flare.dart';

class YourFlareController extends FlareControls {

  late ActorNode rightHandNode;

  void initialize(FlutterActorArtboard artboard) {
    super.initialize(artboard);

    // g获取flare节点
    rightHand = artboard.getNode('right_hand');
  }
}

final fileName = 'assets/george_washington.flr';
final size = Vector2(1776, 1804);
final controller = YourFlareController();

FlareActorComponent flareAnimation = FlareActorComponent(
  fileName,
  controller: controller,
  width: 306,
  height: 228,
);

flareAnimation.x = 50;
flareAnimation.y = 240;
add(flareAnimation);

// 播放一个动画
controller.play('rise_up');

// 你可以同时播放另一个动画
controller.play('close_door_way_out');

// 此外，您可以获得一个flare节点并对其进行修改
controller.rightHandNode.rotation = math.pi;
```

还可以使用`updateAnimation`方法更改当前播放的动画。

有关工作的示例，请在[flame_flare repository](https://github.com/flame-engine/flame_flare/tree/main/example)中查看。

## ParallaxComponent

这个组件可以用来渲染带有深度感的背景，方法是在每个图像或动画（`ParallaxRenderer`）以不同的速度移动的情况下，将几个透明的图像叠加在一起。

其基本原理是，当你看着地平线移动时，距离近的物体似乎比距离远的物体移动得更快。

这个组件模拟了这个效果，制造了一个更加真实的背景效果。

最简单的`ParallaxComponent`是这样创建的：

```dart
@override
Future<void> onLoad() async {
  final parallaxComponent = await loadParallaxComponent([
    ParallaxImageData('bg.png'),
    ParallaxImageData('trees.png'),
  ]);
  add(parallaxComponent);
}
```

`ParallaxComponent`也可以通过实现`onLoad`方法来加载自己：

```dart
class MyParallaxComponent extends ParallaxComponent with HasGameRef<MyGame> {
  @override
  Future<void> onLoad() async {
    parallax = await gameRef.loadParallax([
      ParallaxImageData('bg.png'),
      ParallaxImageData('trees.png'),
    ]);
  }
}

class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    add(MyParallaxComponent());
  }
}
```

这将创建一个静态背景。如果你想要一个移动的视差(这是视差的全部意义) ，你可以用几种不同的方法来实现，这取决于你想要如何为每一层设置细粒度。

最简单的方法是在加载助手函数中设置命名的可选参数`basvelocity`和`velocityMultiplierDelta`。例如，如果你想以更快的速度沿着`x`轴移动你的背景图像，图像越近：

```dart
final parallaxComponent = await loadParallaxComponent(
  _dataList,
  baseVelocity: Vector2(20, 0),
  velocityMultiplierDelta: Vector2(1.8, 1.0),
);
```

你可以在任何时候设置baseSpeed和layerDelta，例如如果你的角色跳跃或你的游戏加速：

```dart
final parallax = parallaxComponent.parallax;
parallax.baseSpeed = Vector2(100, 0);
parallax.velocityMultiplierDelta = Vector2(2.0, 1.0);
```

默认情况下，图像左下对齐，沿 x 轴重复，并按比例缩放，以便图像覆盖屏幕的高度。如果你想改变这种行为，例如，如果你不是在做一个侧滚动游戏，你可以设置每个 `ParallaxRenderer `的`repeat`、`alignment`和`fill`，并将它们添加到 `ParallaxLayers `中，然后传递到 `ParallaxComponent `的构造函数中。

高级例子：
```dart
final images = [
  loadParallaxImage('stars.jpg', repeat: ImageRepeat.repeat, alignment: Alignment.center, fill: LayerFill.width),
  loadParallaxImage('planets.jpg', repeat: ImageRepeat.repeatY, alignment: Alignment.bottomLeft, fill: LayerFill.none),
  loadParallaxImage('dust.jpg', repeat: ImageRepeat.repeatX, alignment: Alignment.topRight, fill: LayerFill.height),
];
final layers = images.map((image) => ParallaxLayer(await image, velocityMultiplier: images.indexOf(image) * 2.0));
final parallaxComponent = ParallaxComponent.fromParallax(
  Parallax(
    await Future.wait(layers),
    baseVelocity: Vector2(50, 0),
  ),
);
```

 - 此示例中的星星图像将在两个轴上重复绘制，在中心对齐并缩放以填充屏幕宽度
 - 行星图像将以 y 轴重复，与屏幕左下角对齐且不会缩放
 - 尘埃图像将在 x 轴重复，对齐到右上角和缩放，以填补屏幕高度

完成设置`ParallaxComponent`后，将其添加到游戏中，就像添加任何其他组件一样（`game.add(parallaxComponent`）。此外，请不要忘记将图像添加到`pubspec.yaml`文件中，否则它们将不会被找到。

`Parallax`文件包含了游戏的扩展，它添加了`loadParallax`、`loadParallaxLayer`、`loadParallaxImage`和`loadParallaxAnimation`，因此它会自动使用游戏的图像缓存而不是全局缓存。对于`ParallaxComponent`文件也是一样，但它提供了`loadParallaxComponent`。

如果你想要一个全屏的`ParallaxComponent`，只需要忽略`size`参数，它就会占用游戏的大小，当游戏改变大小或方向时，它也会调整到全屏。

Flame提供了两种类型的`ParallaxRenderer`：`ParallaxImage`和`ParallaxAnimation`，`ParallaxImage`是一个静态图像渲染器，而`ParallaxAnimation`，顾名思义，是一个基于动画和帧的渲染器。也可以通过扩展`ParallaxRenderer`类来创建自定义渲染器。

可以在[examples directory](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/parallax)找到3个示例实现。


## ShapeComponents

`ShapeComponent`是表示可伸缩几何形状的基类。形状有不同的方式来定义它们的外观，但是它们都有一个可以修改的大小和角度，形状定义将相应地缩放或旋转形状。

这些形状是一种工具，用于以更一般的方式使用几何形状，而不是与碰撞检测系统一起使用，在碰撞检测系统中，你需要使用[ShapeHitboxes](/guide/flame/collision-detection.md)。


### PolygonComponent

`PolygonComponent`是通过在构造函数中给它一个点列表（称为顶点）来创建的。这个列表将被转换成一个具有大小的多边形，它仍然可以被缩放和旋转。

例如，这将创建一个从(50,50)到(100,100)的正方形，其中心为(75,75) ：
```dart
void main() {
  PolygonComponent([
    Vector2(100, 100),
    Vector2(100, 50),
    Vector2(50, 50),
    Vector2(50, 100),
  ]);
}
```

也可以使用相对顶点列表创建`PolygonComponent`，这些顶点是根据给定的大小定义的，通常是目标父组件的大小。

例如，你可以创建一个像这样的菱形多边形：

```dart
void main() {
  PolygonComponent.relative(
    [
      Vector2(0.0, 1.0), // Middle of top wall
      Vector2(1.0, 0.0), // Middle of right wall
      Vector2(0.0, -1.0), // Middle of bottom wall
      Vector2(-1.0, 0.0), // Middle of left wall
    ],
    size: Vector2.all(100),
  );
}
```

例子中的顶点定义了 x 轴和 y 轴从屏幕中心到边缘的长度的百分比，因此对于我们列表中的第一个项目（`Vector2(0.0,1.0)`） ，我们将指向框顶壁的中间，因为这里的坐标系是从多边形的中心定义的。

![An example of how to define a polygon shape](/images/polygon-shape.png)

在图像中，您可以看到由紫色箭头形成的多边形形状如何由红色箭头定义。

记住以逆时针的方式定义列表（如果在屏幕坐标系统中y轴翻转，则为顺时针）。

### RectangleComponent

`RectangleComponent`的创建方式与`PositionComponent`非常相似，因为它也有一个边框。

例如：

```dart
void main() {
  RectangleComponent(
    position: Vector2(10.0, 15.0),
    size: Vector2.all(10),
    angle: pi/2,
    anchor: Anchor.center,
  );
}
```

还有一个很好的创建矩形的方法，这个类被称为 `Rect`，你可以使用 `Rectangle.fromRect` 创建一个Flame `RectangleComponent` ，就像设置 `PolygonComponent `的顶点一样，如果你使用这个构造函数，矩形的大小也会根据 `Rect `来调整。

下面将创建一个左上角坐标为(10, 10)，大小为(100, 50)的 `RectangleComponent`：

```dart
void main() {
  RectangleComponent.fromRect(
    Rect.fromLTWH(10, 10, 100, 50),
  );
}
```

你也可以通过定义一个与预期父对象大小的关系来创建`RectangleComponent`，你可以使用默认构造函数从位置、大小和角度来构建你的`RectangleComponent`。`relation`是根据父尺寸定义的向量，例如，一个`relation`是Vector2(0.5,  0.8)，将创建一个其宽度为父元素大小的50%，高度为其高度的80%的矩形。

在下面的示例中，将创建位于(100, 100)，大小为(25.0，30.0)的矩形：

```dart
void main() {
  RectangleComponent.relative(
    Vector2(0.5, 1.0),
    position: Vector2.all(100),
    size: Vector2(50, 30),
  );
}
```

由于正方形是矩形的简化版本，因此也有一个用于创建正方形矩形组件的构造函数，唯一的区别是`size`参数是`double`，而不是`Vector2`。

```dart
void main() {
  RectangleComponent.square(
    position: Vector2.all(100),
    size: 200,
  );
}
```

### CircleComponent

如果你知道你的圆的位置和（或）半径从一开始是多长，你可以使用可选的参数半径和位置来设置它们。

下面将创建一个`CircleComponent`，其中心坐标为(100,100) ，半径为5，因此大小为 Vector2(10, 10)。

```dart
void main() {
  CircleComponent(radius: 5, position: Vector2.all(100), anchor: Anchor.center);
}
```

当使用相对构造函数创建`CircleComponent`时，您可以定义半径与根据大小定义的边界框的最短边相比有多长。

下面的示例将导致 `CircleComponent `定义一个半径为40（直径为80）的圆：

```dart
void main() {
  CircleComponent.relative(0.8, size: Vector2.all(100));
}
```

## SpriteBodyComponent

请参阅 Forge2D 文档中的  [SpriteBodyComponent](../other_modules/forge2d.md#spritebodycomponent) 

## TiledComponent

目前我们有一个非常基本的平铺组件实现。这个 API 使用 [tiled](https://github.com/flame-engine/tiled.dart) 来解析映射文件和呈现可见层。

如何使用 API 的示例可以在[这里](https://github.com/flame-engine/flame_tiled/tree/main/example)找到。

## IsometricTileMapComponent

该组件允许您基于块的笛卡尔矩阵和等距贴图集渲染一个等距贴图。

一个简单例子：

```dart
// 创建一个tileset，块的id从0开始自动分配
// 从左到右，再从上到下
final tilesetImage = await images.load('tileset.png');
final tileset = IsometricTileset(tilesetImage, 32);
// 每个元素都是一个块id， -1表示什么都不是
final matrix = [[0, 1, 0], [1, 0, 0], [1, 1, 1]];
add(IsometricTileMapComponent(tileset, matrix));
```

它还提供了转换坐标的方法，这样您就可以处理鼠标点击、悬停、贴图顶部的呈现实体、添加选择器等。

您还可以指定`tileHeight`，这是您的平铺中每个长方体的底部和顶部平面之间的垂直距离。基本上，它是长方体最前端边缘的高度；通常它是一半(默认)或四分之一的磁贴大小。在下面的图片中，你可以看到高度用深色调调整：

![An example of how to determine the tileHeight](/images/tile-height-example.png)

这是一个四分之一长度的地图是什么样子的例子：

![An example of a isometric map with selector](/images/isometric.png)

Flame 的示例应用程序包含了一个更深入的示例，介绍了如何解析坐标以生成选择器。代码可以在[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/tile_maps/isometric_tile_map.dart)找到，在线版可以在[这里](https://examples.flame-engine.org/#/Tile%20Maps_Isometric%20Tile%20Map)看到。

## NineTileBoxComponent

点九磁贴盒是一个使用网格精灵图绘制的矩形。

网格精灵图是一个3x3的网格和9个方块，代表4个角，4个边和中间。

角被画在相同的大小，边被拉伸在一边的方向和中间被扩大的两种方式。

使用这个，您可以得到一个可以很好地扩展到任何大小的框/矩形。这对于制作面板、对话框、边框非常有用。

查看示例应用程序[nine_tile_box](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/utils/nine_tile_box.dart)了解如何使用它的详细信息

## 自定义绘制组件

`CustomPainter `是与 `CustomPaint `小部件一起使用的 Flutter 类，用于在 Flutter 应用程序中呈现自定义形状。

Flame 提供了一个组件，可以调用`CustomPainterComponent` 渲染一个`CustomPainter` ，它接收一个自定义的`painter `并在游戏画布上渲染它。

这可以用来在你的 Flame 游戏和 Flutter 小部件之间共享自定义渲染逻辑。

查看应用程序[custom_painter_component](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/widgets/custom_painter_component.dart)的示例，了解如何使用它的详细信息。


## 特效

Flame提供了一组可以应用于特定类型组件的特效，这些特效可以用于动画组件的一些属性，如位置或尺寸。你可以在[这里](/guide/flame/effects.md)查看这些影响的列表。

运行效果的例子可以在[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/effects)找到。
