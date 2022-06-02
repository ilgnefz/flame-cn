---
prev:
  text: 待续...
  link: /guide/tutorials/klondike/tbc.md
next:
  text: Oxygen
  link: /guide/other_modules/oxygen.md
---

# Forge2D

我们（Flame 组织）维护了 Box2D 物理引擎的移植版本，我们的版本称为 Forge2D。

如果你想专门为 Flame 使用 Forge2D，你应该使用我们的桥接库 [flame_forge2d](https://github.com/flame-engine/flame/tree/main/packages/flame_forge2d)，如果你只是想在 Dart 项目中使用它，你可以直接使用 [forge2d](https://github.com/flame-engine/forge2d) 库。

要在游戏中使用它，你只需要在你的 `pubspec.yaml` 中添加 `flame _ Forge2D`，正如 Forge2D [示例](https://github.com/flame-engine/flame/tree/main/packages/flame_forge2d/example) 和 pub.dev [安装说明](https://pub.dev/packages/flame_forge2d)中所示。

## Forge2DGame

如果你打算在你的项目中使用 `Forge2D`，那么使用 `Forge2D` 特定的 `FlameGame` 类 `Forge2DGame` 是一个不错主意。

它被称为 `Forge2DGame`，它将控制 `Forge2D` 的 `BodyComponents` 以及您普通组件的添加和删除。

在 `Forge2DGame` 中，`Camera` 的缩放级别默认设置为 10，因此您的组件将比普通 `Flame` 游戏大得多。这是由于 Forge2D 世界中的速度限制，如果在 zoom=1.0 的情况下使用它，您会很快遇到这种限制。 您可以通过在构造函数中调用 `super(zoom: yourZoom)` 轻松更改缩放级别，或者稍后执行 `game.camera.zoom = yourZoom;` 。

如果您以前熟悉 `Box2D`，那么这对你来说是件好事。 `Box2d` 世界的整个概念都映射到 `Forge2DGame` 的世界中，并且您想用作组件的每个 `Body` 都包装在 `BodyComponent` 中，然后添加到了 `Forge2DGame` 中。

例如，在 `Forge2DGame` 的组件列表中可以有一个 HUD 和其他非物理相关的组件以及物理实体。当调用更新时，它将使用 `Forge2D` 物理引擎正确地更新每个 `BodyComponent`，游戏中的其他组件将按照正常的 `FlameGame` 方式更新。

在 `Forge2D game` 中，为了保持与 Flame 中相同的坐标系，重力是翻转过来的，所以重力中的正 y 轴如 `Vector2(0,10)` 会将物体向下拉，同时负 y 轴会将物体向上拉。重力可以在 `Forge2DGame` 的构造函数中直接设置。

在 [examples 文件夹 ](https://github.com/flame-engine/flame/tree/main/packages/flame_forge2d/example)中可以看到一个简单的 Forge2DGame 实现示例。

## BodyComponent

`BodyComponent` 是 `Forge2D body` 的一个包装，`Forge2D body` 是物理引擎与之交互的主体。要创建 `BodyComponent`，您需要重写 `createBody()`，并创建和返回已创建的 `body`。

`BodyComponent` 默认设置为 `renderBody = true`，否则在您创建 `Body` 并将 `BodyComponent` 添加到游戏后它不会显示任何内容。 如果你想关闭它，你可以设置（或覆盖）`renderBody` 为 `false`。

就像任何其他 Flame 组件一样，您可以将子组件添加到 `BodyComponent`，如果您想在 `body `顶部添加例如动画或其他组件，这将非常有用。

您在 `createBody` 中创建的 `body` 应该根据 Flame 的坐标系定义，而不是根据 `Forge2D` 的坐标系（Y 轴翻转的地方）。

## 联系回调

如果您正在使用 `Forge2DGame`，您可以利用它处理两个 `BodyComponents` 之间的联系。

在为 `BodyComponent` 创建主体定义时，请确保将 `userData` 设置为当前对象，否则将无法检测冲突。像这样：

```dart
final bodyDef = BodyDef()
  // 能够知道碰撞涉及到哪个部件
  ..userData = this;
```

现在您必须实现 `ContactCallback `，您可以在其中设置当它们接触时它应该做出反应的两种类型。 如果你有两个名为 Ball 和 Wall 的 `BodyComponent`，并且你想在它们接触时做一些事情，你可以这样做：

```dart
class BallWallCallback extends ContactCallback<Ball, Wall> {
  BallWallCallback();

  @override
  void begin(Ball ball, Wall wall, Contact contact) {
    wall.remove();
  }

  @override
  void end(Ball ball, Wall wall, Contact contact) {}
}
```

然后你可以简单地将 `BallWallCallback `添加到 `Forge2DGame`：

```dart
class MyGame extends Forge2DGame {
  MyGame(Forge2DComponent box) : super(box) {
    addContactCallback(BallWallCallback());
  }
}
```

每次 Ball 和 Wall 接触时，`begin` 将被调用，一旦对象停止接触，`end` 将被调用。

如果您希望一个对象与其他所有主体交互，请将 `BodyComponent` 作为您 `ContactCallback` 的参数之一，如下所示：

```dart
class BallAnythingCallback implements ContactCallback<Ball, BodyComponent> ...
```

可以在[Flame Forge2D 示例](https://github.com/flame-engine/flame_forge2d/blob/main/example)中看到一个实现示例。

### Forge2DCamera.followBodyComponent

就像使用正常定位组件一样，你可以通过调用 `camera.followBodyComponent(...)` 使 `Forge2DCamera` 跟随 `BodyComponents`，后者的工作原理与 `camera.followComponent` 相同。当你想停止跟踪一个 `BodyComponent` 时，你应该调用 `camera.unfollowBodyComponent`。
