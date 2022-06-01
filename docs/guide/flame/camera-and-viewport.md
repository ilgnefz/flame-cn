---
prev:
  text: 特效
  link: /guide/flame/effects.md
next:
  text: 摄像机组件
  link: /guide/flame/camera-component.md
---

# 摄像机和视口

在 Flutter 上渲染时，使用的常规坐标空间是逻辑像素。 因为[设备像素比](https://api.flutter.dev/flutter/widgets/MediaQueryData/devicePixelRatio.html)，意味着 Flutter 的一个像素不一定是设备上的一个真实像素。当它到达 Flame 级别时，我们总是考虑最基本的级别是逻辑像素，因此所有与设备相关的复杂性都被抽象出来了。

然而，这仍然会给你带来任意形状和大小的屏幕的问题。很可能你的游戏拥有一些带有内在坐标系统的游戏世界，不会映射到屏幕坐标。Flame 添加了两个不同的概念来帮助转换坐标空间。对于前者，我们有 `Viewport `类，后着，我们有`Camera`类。

## 视口

`Viewport`试图通过转换和调整画布的大小，将多个屏幕（或者游戏小部件）大小统一到游戏的单个配置中。

`Viewport `接口有多个实现，可以在您的游戏中从头开始使用，或者，如果您使用的是 `FlameGame`，它已经内置了(带有默认的无操作 `Viewport`)。

以下是可供选择的视口（或者你可以自己实现接口以满足需求） ：

 * `DefaultViewport`：这是默认情况下与任何 `FlameGame `相关联的无操作视口。
 * `FixedResolutionViewport`：这个视口会转换您的 `Canvas`，以便从游戏的角度来看，尺寸始终设置为固定的预定义值。 这意味着它将尽可能地扩展游戏并在需要时添加黑条。

当使用`FlameGame`时，视口执行的操作会自动执行到每个渲染操作中，而游戏中的`size`属性，而不是逻辑小部件大小，会变成通过视口与镜头的变焦所看到的大小。如果出于某些原因需要访问原始的逻辑像素大小，可以使用`canvasSize`。关于每个`Viewport`做什么以及如何操作的更深入的描述，请查看其类的文档。

## 摄像机

与`Viewport`不同，`Camera`是一个更动态的`Canvas`转换，通常依赖于：

 * 与屏幕坐标 1:1 不匹配的世界坐标。
 * 在游戏世界中围绕或跟随玩家（如果世界比屏幕大）。
 * 用户控制放大和缩小。

只有一个 `Camera `实现，但它允许许多不同的配置。您可以在游戏中单独使用它，但它已经包含并连接到 `FlameGame`。

关于摄像头，需要注意的一件重要事情是，由于（不像 Viewport）它是动态的，大多数摄像头的移动不会立即发生。相反，摄像头有一个可配置的速度和更新的游戏循环。如果你想立即移动你的摄像头（比如在你的第一个Camera设置在游戏开始） ，你可以使用快照功能。不过，在游戏中调用 `snap `可能会导致不和谐或不自然的摄像机移动，所以除非你想要，否则不要这样做（例如，对于地图过渡）。仔细检查每个方法的文档，了解更多关于它如何影响摄像头移动的细节。

另一个重要的注意事项是，摄像头应用在视口之后，并且只适用于非 HUD 组件。所以这里的屏幕大小考虑的是`Viewport`转换后的有效大小。

`Camera `可以应用于 `Canvas `的转换有两种类型。第一个也是最复杂的一个是翻译。这可以通过以下几个因素得到应用：

 * nothing：默认情况下，摄像机不会应用任何转换，所以使用它是可选的。
 * relative offset：你可以配置它来决定相机的中心应该在屏幕上的哪个位置。默认情况下，它位于左上角，这意味着居中坐标或对象将始终位于屏幕的左上角。你可以在游戏过程中平滑地改变相对偏移（例如，可以用于应用对话或物品拾取临时摄像机过渡）。
 * moveTo： 如果你想临时移动你的相机，你可以使用这个方法; 它将平滑地移动相机到一个新的位置，忽略跟随但遵守相对偏移和世界边界。 如果与跟随一起使用，则可以通过 `resetMovement `重置，以便再次开始考虑被跟随的对象。
 * follow：你可以使用这个方法让你的相机持续跟随一个对象（例如，一个`PositionComponent`）。这并不流畅，因为跟随的物体本身的移动已经是平滑的（例如，如果你的角色传送，摄像机也会立即传送）。
 * world bounds：使用跟随时，您可以选择定义世界的边界。 如果这样做了，摄像机将停止跟随/移动，以便不显示界外区域（只要世界大于屏幕）。

最后，相机应用的第二个变换是缩放。这允许动态缩放，并由`zoom`字段控制。没有缩放速度，那必须由你在改变时控制。`zoom`变量立即被应用。

在处理输入事件时，必须将屏幕坐标转换为世界坐标(或者，由于某些原因，您可能希望进行相反的操作)。`Camera`提供了两个功能，`screenToWorld`和`worldToScreen`，方便地在这些坐标空间之间进行转换。


### Camera.followVector2

立即捕捉摄像机以开始跟随 `Vector2`。

这意味着摄像机将移动，以使位置矢量位于屏幕上的固定位置。 该位置由 `relativeOffset `参数定义的屏幕大小的一部分确定（默认为中心）。 可以选择设置 `worldBounds `参数以将边界添加到允许相机移动的距离。

示例：

```dart
class MyGame extends FlameGame {
  final someVector = Vector2(100, 100);

  Future<void> onLoad() async {
     camera.followVector2(someVector);
  }
}
```


### Camera.followComponent

立即捕捉摄像机以开始跟随 `PositionComponent`。

这意味着摄像机将移动，以使组件的位置矢量位于屏幕上的固定位置。 该位置由 `relativeOffset `参数定义的屏幕大小的一部分确定（默认为中心）。 可以选择设置 `worldBounds `参数以将边界添加到允许相机移动的距离。

示例：

```dart
class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
     final sprite = await loadSprite('pizza.png');
     final player = SpriteComponent(
       sprite: sprite,
       size: size,
       anchor: Anchor.center,
     );
     add(player);
     
     camera.followComponent(player);
  }
}
```

### 在游戏类中使用摄像机

如果你不使用`FlameGame`，而是使用`Game `mixin，那么你需要自己管理调用某些摄像机方法。假设我们有如下的游戏结构，我们想要添加摄像机功能：

```dart
class YourGame with Game {
  Camera? camera;

  Future<void> onLoad() async {}

  void render(Canvas canvas) {}

  void update(double dt) {}
}
```

我们首先创建一个新的摄像头实例，并将我们的游戏作为参考：

```dart
  // ...
  
  Future<void> onLoad() async {
    camera = Camera();

    // This is required for the camera to work.
    camera?.gameRef = this;

    // Not required but recommend to set it now or when you set the follow target.
    camera?.worldBounds = yourWorldBounds;

    // Rest of your on load code.
  }

  // ...
```

摄像机还可以知道要跟随哪个位置，这是一项可选功能，因为您也可以使用摄像机进行移动、捕捉或摇晃。

为了做到这一点，`Camera `类提供了多种方法，但是让我们来展示一下最简单的方法，那就是下面的 `vector2`：

```dart
  // Somewhere in your code.

  camera?.followVector2(
    yourPositionToFollow,
    worldBounds: yourWorldBounds, // Optional to pass, it will overwrite the previous bounds.
  );
```

现在摄像机已经创建并且它知道世界边界和它应该遵守的位置，它可以用来在渲染方法中翻译画布：

```dart
  // ...

  void render(Canvas canvas) {
    camera?.apply(canvas); // This will apply the camera transformation.

    // Rest of your rendering code.
  }

  // ...
```

唯一要做的就是调用 `Camera `上的 `update `方法，这样它就可以顺利地跟随你给定的位置：

```dart
  // ...

  void update(double dt) {
    camera?.update(dt);

    // Rest of your update code.
  }

  // ...
```
