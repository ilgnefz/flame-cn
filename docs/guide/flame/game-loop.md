---
prev:
  text: 文件结构
  link: /guide/file-structure.md
next:
  text: 组件
  link: /guide/flame/components.md
---

# FlameGame

`FlameGame`是Flame中最基本和最常用的`Game`类。

`FlameGame`是一个基于`Game`类实现的组件。基本上它有一个组件列表，并且通过更新和渲染调用所有已经被添加到游戏的组件。

这个组件系统被我们称之为 Flame Component System，简称FCS。

每次游戏需要调整大小时，例如当方向改变，`FlameGame`会调用所有组件调整大小的方法，并且会将这些信息传递给摄像头和视口。

`FlameGame.camera`控制空间坐标中的哪个点应该在屏幕的左上角（它的默认值是[0,0]，就像一个普通的Canvas）。

下面是一个 FlameGame 实现的例子：

```dart
class MyCrate extends SpriteComponent {
  // 创建一个渲染尺寸为16*16的crate.png精灵图组件
  MyCrate() : super(size: Vector2.all(16), anchor: Anchor.center);

  @override
  Future<void> onLoad() async {
    sprite = await Sprite.load('crate.png');
  }

  @override
  void onGameResize(Vector2 gameSize) {
    super.onGameResize(gameSize);
    // 我们不需要在构造函数中设置位置，我们可以直接在这里设置
    // 因为它将在第一次呈现之前被调用一次
    position = gameSize / 2;
  }
}

class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    await add(MyCrate());
  }
}

main() {
  final myGame = MyGame();
  runApp(
    GameWidget(
      game: myGame,
    ),
  );
}
```

::: warning 注意

如果您在构建方法中实例化您的游戏，那么每次重新构建Flutter树时，您的游戏都会重新构建，这通常比您想要的更加频繁。为避免这种情况，您可以先创建一个游戏实例，然后在您的组件结构中引用它，就像在上面的示例中所做的那样。

:::

要从`FlameGame`的列表中删除组件，可以使用`remove`或`removeAll`方法。如果您只想删除一个组件，可以使用第一种方法，如果您想删除一个组件列表，可以使用第二种方法。

任何调用了`remove()`方法的组件也将被删除，您只需执行`yourComponent.remove();`。

## 生命周期

![component-lifecycle](/images/component-lifecycle.png)

当一个游戏第一次被添加到Flutter组件树时，以下生命周期方法将依次被调用：`onGameResize`，`onLoad`和`onMount`。在此之后，它继续每次来回调用`update`和`render`，直到组件从树中删除。一旦`GameWidget`从树中移除，`onRemove`就会被调用，就像从组件树中移除一个普通组件一样。

## 调试模式

Flame的`FlameGame`类提供了一个名为`debugMode`的变量，默认为`false`。当它被设置为`true`时来启用游戏组件的调试功能。**请注意**，此变量的值在添加到游戏中时会传递给其组件，所以如果你在运行时更改`debugMode`，默认情况下不会影响已添加的组件。

要阅读有关`debugMode`Flame 的更多信息，请查看[调试文档](/guide/flame/other/debug.md)。

## 更改背景颜色

要想改变您的`FlameGame`的背景颜色，你必须重写`backgroundColor()`。

在下面的示例中，背景颜色设置为完全透明，因此您可以看到`GameWidget`背后的小部件。默认为不透明黑色。

```dart
class MyGame extends FlameGame {
  @override
  Color backgroundColor() => const Color(0x00000000);
}
```

请注意，在游戏运行时，背景颜色无法动态变化。但是如果您想动态地改变它，你可以只画一个背景来覆盖整个画布。

## SingleGameInstance mixin

如果您正在制作一个单机游戏应用程序，可以将可选的`SingleGameInstance`通过mixin应用到您的游戏中。这是一种构建游戏时的常见场景：一个全屏的`GameWidget`托管了一个单一的`Game`实例。

添加这个mixin可以在某些场景中提供性能优势。特别是，即使父组件尚未挂载，组件的`onLoad`方法也保证在将其添加到父组件时启动。因此， `await `时在`parent.add(component)`上，始终保证组件加载完成。

使用这个mixin很简单：

```dart
class MyGame extends FlameGame with SingleGameInstance {
  // ...
}
```

## 低级游戏API

![component-lifecycle](/images/game-mixin.png)

`Game` minix是一个低级API，可以在当您想要实现如何构建游戏引擎的功能时使用。比如，`Game`不实现任何`update`或`render`的功能。

`Loadable` minxi有`onLoad`、`onMount`和`onRemove`几个生命周期方法。当游戏被加载 + 安装或删除时，这些方法会从 `GameWidget `(或者其他父类)中调用。只有在第一次将类添加到父类时才调用 `onLoad`，但是`onMount`(在`onLoad`之后被调用)会在每次被添加到一个新的父类时被调用。当类从父类中移除时，将调用`onRemove`。

::: warning 注意

`Game`mixin允许更自由的实现任何事物，但如果您使用它，您也会错过它的所有内置功能。

:::

下面是一个`Game`实现的例子:

```dart
class MyGameSubClass with Game {
  @override
  void render(Canvas canvas) {
    // ...
  }

  @override
  void update(double dt) {
    // ...
  }
}

main() {
  final myGame = MyGameSubClass();
  runApp(
    GameWidget(
      game: myGame,
    )
  );
}
```

## Game Loop 游戏循环

`GameLoop`是对游戏循环概念的一个简单抽象。基本上，大多数游戏都建立在两种方法之上：

- 渲染方法采用画布来绘制游戏的当前状态
- 更新方法接收自上次更新以来的增量时间（以秒为单位），并允许您移动到下一个状态

Flame所有的`Game`实现都使用`GameLoop`。

## 游戏执行暂停/恢复

Flame的`Game`可以通过两种方式暂停和恢复：

- 使用`pauseEngine`和`resumeEngine `方法
- 通过更改`paused`属性

当一个Flame `Game`暂停时，`GameLoop`实际上也会被暂停，这意味着在游戏恢复之前不会有任何更新或者新的渲染。

## Flutter小部件和Game实例

由于Flame游戏可以被包装在一个小部件里，所以它可以很轻易的和其他Flutter小部件一起使用。但是，Widgets Overlay API可以让事情变得跟简单。

`Game.overlays`允许在游戏实例顶部显示任何Flutter小部件，这使得创建诸如暂停菜单或物品栏之类的东西非常容易。

这个管理是通过`game.overlays.add`和`game.overlays.remove`方法来完成的，它们分别通过识别覆盖的`String`参数来标记显示或隐藏、覆盖。

```dart
// 内部游戏方法：
final pauseOverlayIdentifier = 'PauseMenu';

overlays.add(pauseOverlayIdentifier); // 标记“PauseMenu”被渲染
overlays.remove(pauseOverlayIdentifier); // 标记“PauseMenu”不渲染
```

```dart
// 在小部件声明
final game = MyGame();

Widget build(BuildContext context) {
  return GameWidget(
    game: game,
    overlayBuilderMap: {
      'PauseMenu': (BuildContext context, MyGame game) {
        return Text('A pause menu');
      },
    },
  );
}
```

覆盖的渲染顺序取决于`OverlayBuilderMap`中键的顺序决定

功能的示例可以在[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/system/overlays_example.dart)找到。