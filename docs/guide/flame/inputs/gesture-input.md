---
prev:
  text: 摄像机组件
  link: /guide/flame/camera-component.md
next:
  text: 键盘输入
  link: /guide/flame/inputs/keyboard-input.md
---

# 手势输入

这是关于手势输入的文档，即鼠标和触摸指针。

有关其他输入的文档，请参考：

- [键盘输入](/guide/flame/inputs/keyboard-input.md)：键盘
- [其他输入](/guide/flame/inputs/other-inputs.md)：操纵杆、游戏手柄等

## 介绍

在 `package:flame/gestures.dart` 中，您可以找到一整套 mixin，它们可以包含在您的游戏类实例中，以便能够接收触摸输入事件。 您可以在下面看到这些 mixin 及其方法的完整列表：


## 触摸和鼠标检测器
```
- TapDetector
  - onTap
  - onTapCancel
  - onTapDown
  - onLongTapDown
  - onTapUp

- SecondaryTapDetector
  - onSecondaryTapDown
  - onSecondaryTapUp
  - onSecondaryTapCancel

- DoubleTapDetector
  - onDoubleTap

- LongPressDetector
  - onLongPress
  - onLongPressStart
  - onLongPressMoveUpdate
  - onLongPressUp
  - onLongPressEnd

- VerticalDragDetector
  - onVerticalDragDown
  - onVerticalDragStart
  - onVerticalDragUpdate
  - onVerticalDragEnd
  - onVerticalDragCancel

- HorizontalDragDetector
  - onHorizontalDragDown
  - onHorizontalDragStart
  - onHorizontalDragUpdate
  - onHorizontalDragEnd
  - onHorizontalDragCancel

- ForcePressDetector
  - onForcePressStart
  - onForcePressPeak
  - onForcePressUpdate
  - onForcePressEnd

- PanDetector
  - onPanDown
  - onPanStart
  - onPanUpdate
  - onPanEnd
  - onPanCancel

- ScaleDetector
  - onScaleStart
  - onScaleUpdate
  - onScaleEnd

 - MultiTouchTapDetector
  - onTap
  - onTapCancel
  - onTapDown
  - onTapUp

 - MultiTouchDragDetector
  - onReceiveDrag
```

只有鼠标的事件

```
 - MouseMovementDetector
  - onMouseMove
 - ScrollDetector
  - onScroll
```

高级检测器 （`MultiTouch*`） 无法与同类基本检测器混合使用，因为高级检测器将始终在手势竞争领域胜出，而基本检测器永远不会被触发。 例如，您不能同时使用 `MultiTouchTapDetector` 和 `PanDetector`，因为后者不会触发任何事件（对此也有断言）。

Flame的手势api是由Flutter手势控件提供的，包括[GestureDetector widget](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html)、
[RawGestureDetector widget](https://api.flutter.dev/flutter/widgets/RawGestureDetector-class.html)
和 [MouseRegion widget](https://api.flutter.dev/flutter/widgets/MouseRegion-class.html), ，您也可以在[这里](https://api.flutter.dev/flutter/gestures/gestures-library.html)阅读更多关于Flutter手势的信息。


## PanDetector和ScaleDetector

如果您同时添加一个`PanDetector`和一个`ScaleDetector`，您将收到来自 Flutter 的一个非常隐晦的断言提示：

```
Having both a pan gesture recognizer and a scale gesture recognizer is redundant; scale is a
superset of pan.

Just use the scale gesture recognizer.
```

这可能看起来很奇怪，因为 `onScaleUpdate `不仅在更改比例时触发，在所有平移/拖动事件时也会触发。 因此，如果您需要同时使用这两个检测器，则必须在 `onScaleUpdate`（+`onScaleStart `和 `onScaleEnd`）中处理它们的逻辑。

例如，如果您想在平移事件上移动相机并在缩放事件上进行缩放，您可以这样做：

```dart
  late double startZoom;

  @override
  void onScaleStart(_) {
    startZoom = camera.zoom;
  }

  @override
  void onScaleUpdate(ScaleUpdateInfo info) {
    final currentScale = info.scale.global;
    if (!currentScale.isIdentity()) {
      camera.zoom = startZoom * currentScale.y;
    } else {
      camera.translateBy(-info.delta.game);
      camera.snap();
    }
  }
```

在上面的示例中，平移事件由 `info.delta` 处理，缩放事件由 `info.scale` 处理，尽管理论上它们都来自底层缩放事件。

这里有一个示例[zoom example](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/camera_and_viewport/zoom_example.dart)。


## 鼠标光标

它也可以改变当前显示在`GameWidget`区域的鼠标光标，为此，可以在 `Game `类中使用以下代码：

```dart
mouseCursor.value = SystemMouseCursors.move;
```

要使用自定义光标初始化`GameWidget`，可以使用`mousecuror`属性

```dart
GameWidget(
  game: MouseCursorGame(),
  mouseCursor: SystemMouseCursors.move,
);
```


## 事件坐标系系统

对于具有位置的事件，如 `Tap* `或 `Drag`，您将注意到 `eventPosition `属性包含3个字段：`game`、 `widget `和 `global`。您将在下面找到关于它们中的每一个的简要说明。


### global

事件坐标系就整个屏幕而言的位置，与 Flutter 原生事件中的`globalPosition`相同。


### widget

事件坐标系相对于 `GameWidget `的位置和尺寸的位置，与 Flutter 原生事件中的 `localPosition `相同。


### game

事件坐标系相对于`GameWidget`并且游戏应用了一些变换的位置（例如摄像机）。如果游戏没有任何变换，相当于于 `widget` 属性。


## 示例

```dart
class MyGame extends Game with TapDetector {
  // Other methods omitted

  @override
  bool onTapDown(TapDownInfo info) {
    print("Player tap down on ${info.eventPosition.game}");
    return true;
  }

  @override
  bool onTapUp(TapUpInfo info) {
    print("Player tap up on ${info.eventPosition.game}");
    return true;
  }
}
```

您也可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/controls/)查看更多完整的例子。


## 可点击、可拖动和可悬停组件

任何从 Component 派生的组件（大多数组件）都可以添加 `Tappable`、`Draggable `和/或 `Hoverable `mixin 来处理组件上的点击、拖动和悬停。

所有被重写的方法都返回一个布尔值来控制是否应该将事件进一步传递到它下面的组件。如果您只想让您的顶部可见组件接收一个点击，而不是下面的，那么您的 `onTapDown`、`onTapUp `和 `onTapCancel `实现应该返回 `false`，如果您想让事件通过下面的更多组件，那么您应该返回 `true`。

如果您的组件有子组件，那么事件首先发送到子组件树中的叶子，然后再向下传递，直到方法返回 `false`。


### 可点击组件

通过将 `HasTappables `mixin 添加到游戏中，并在组件上使用 mixin `Tappable`，您可以在组件上覆盖以下方法：

```dart
bool onTapCancel();
bool onTapDown(TapDownInfo info);
bool onLongTapDown(TapDownInfo info);
bool onTapUp(TapUpInfo info);
```

最小组件示例：

```dart
import 'package:flame/components.dart';

class TappableComponent extends PositionComponent with Tappable {

  // update and render omitted

  @override
  bool onTapUp(TapUpInfo info) {
    print("tap up");
    return true;
  }

  @override
  bool onTapDown(TapDownInfo info) {
    print("tap down");
    return true;
  }

  @override
  bool onTapCancel() {
    print("tap cancel");
    return true;
  }
}

class MyGame extends FlameGame with HasTappables {
  MyGame() {
    add(TappableComponent());
  }
}
```

**注意**: `HasTappables` 在底层使用了一个高级的手势检测器，正如在本页中进一步解释的那样，它不应该和基本的检测器一起使用。

要识别添加到游戏中的`Tappable`是否处理了事件，可以在游戏类中的相应方法中检查事件中的`handled`字段设置为`true`，或者如果让事件继续传播，则可以进一步检查事件中的`handled`字段。

在下面的示例中可以看到它是如何与 `onTapDown `一起使用的，同样的技术也可以应用于 `onTapUp`。

```dart
class MyComponent extends PositionComponent with Tappable{
  @override
  bool onTapDown(TapDownInfo info) {
    info.handled = true;
    return true;
  }
}

class MyGame extends FlameGame with HasTappables {
  @override
  void onTapDown(int pointerId, TapDownInfo info) {
    if (info.handled) {
      // Do something if a child handled the event
    }
  }
}
```

事件`onLongTapDown`将在用户“持有”组件一段特定的最小时间后被触发。默认情况下，这个时间是300ms，但是它可以通过覆盖`HasTappables` mixin的`longTapDelay`字段来调整。

### 可拖动组件

就像 `Tappable `一样，Flame 为 `Draggable `提供了一个 mixin。

通过将`HasDraggables `mixin添加到您的游戏中，并在您的组件中使用mixin `Draggable`，他们可以覆盖那些简单的方法，在您的组件中轻松使用拖动api。

```dart
  bool onDragStart(DragStartInfo info);
  bool onDragUpdate(DragUpdateInfo info);
  bool onDragEnd(DragEndInfo info);
  bool onDragCancel();
```

请注意，所有事件都采用唯一生成的指针 id，因此如果需要，您可以区分不同的同时拖动。

`Draggable`提供的默认实现已经进行了检查：

- 开始拖动时，只有当位置在其边界内时，组件才会接收事件；请跟踪 pointerId。
- 在处理更新/结束/取消时，组件仅在 pointerId 被跟踪时才会接收事件（无论位置如何）。
- 在结束/取消时，停止跟踪pointerId。

最小组件示例（这个示例忽略了pointerId，所以如果您尝试多次拖动，它将不会正常工作）：

```dart
import 'package:flame/components.dart';

class DraggableComponent extends PositionComponent with Draggable {

  // update and render omitted

  Vector2? dragDeltaPosition;
  bool get isDragging => dragDeltaPosition != null;

  bool onDragStart(DragStartInfo startPosition) {
    dragDeltaPosition = startPosition.eventPosition.game - position;
    return false;
  }

  @override
  bool onDragUpdate(DragUpdateInfo event) {
    if (isDragging) {
      final localCoords = event.eventPosition.game;
      position = localCoords - dragDeltaPosition!;
    }
    return false;
  }

  @override
  bool onDragEnd(DragEndInfo event) {
    dragDeltaPosition = null;
    return false;
  }

  @override
  bool onDragCancel() {
    dragDeltaPosition = null;
    return false;
  }
}

class MyGame extends FlameGame with HasDraggables {
  MyGame() {
    add(DraggableComponent());
  }
}
```

要识别添加到游戏中的`Draggable `是否处理了事件，可以在游戏类中的相应方法中检查事件中的`handled`字段设置为`true`，或者如果让事件继续传播，则可以进一步检查事件中的`handled`字段。

在下面的示例中可以看到它是如何与 `onDragStart `一起使用的，同样的技术也可以应用于 `onDragUpdate `和 `onDragEnd`。

```dart
class MyComponent extends PositionComponent with Draggable {
 @override
 bool onDragStart(DragStartInfo info) {
   info.handled = true;
   return true;
 }
}

class MyGame extends FlameGame with HasDraggables {
  @override
  void onDragStart(int pointerId, DragStartInfo info) {
    if (info.handled) {
      // Do something if a child handled the event
    }
  }
}
```


### 可悬停组件

和其他组件一样，通过 mixin 允许您的组件轻松连接以监听悬停状态和事件。

通过将`HasHoverables` mixin添加到您的基础游戏中，并在您的组件中使用mixin `Hoverable`，它们会获得一个`ishoveroversfield`和两个方法（`onHoverStart`, `onHoverEnd`），如果您想监听事件，您可以重写这些方法。

```dart
  bool isHovered = false;
  bool onHoverEnter(PointerHoverInfo info) {
    print("hover enter");
    return true;
  }
  bool onHoverLeave(PointerHoverInfo info) {
   print("hover leave");
   return true;
  }
```

提供的事件信息来自触发动作的鼠标移动（进入或离开）。当鼠标移动保持在内部或外部时，不会触发任何事件，也不会传播那些鼠标移动事件。只有当状态改变时，才会触发处理程序。

要识别添加到游戏中的`Hoverable `是否处理了事件，可以在游戏类中的相应方法中检查事件中的`handled`字段设置为`true`，或者如果让事件继续传播，则可以进一步检查事件中的`handled`字段。

在下面的示例中可以看到它是如何与 `onHoverEnter `一起使用的，同样的技术也可以应用于 `onHoverLeave`。

```dart
class MyComponent extends PositionComponent with Hoverable {
  @override
  bool onHoverEnter(PointerHoverInfo info) {
    info.handled = true;
    return true;
  }
}

class MyGame extends FlameGame with HasHoverables {
  @override
  void onHoverEnter(PointerHoverInfo info) {
    if (info.handled) {
      // Do something if a child handled the event
    }
  }
}
```

### GestureHitboxes

`GestureHitboxes `mixin 用于更准确地识别组件顶部的手势。 例如，假设您有一个相当圆的石头作为 `SpriteComponent`，您不想注册输入图片未显示的角落，因为`PositionComponent`默认是矩形的。然后，您可以使用`GestureHitboxes` mixin来定义一个更精确的圆圈或多边形（或其他形状），在您的组件上注册事件的输入应该在这个圆圈或多边形内。

您可以将新的碰撞盒添加到包含`GestureHitboxes` mixin的组件中，就像在下面的`Collidable`示例中添加的那样。

更多关于如何定义碰撞盒的信息可以在[碰撞检测](../collision-detection.md#shapehitbox)文档的碰撞盒部分找到。

可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/input/gesture_hitboxes_example)找到一个如何使用它的示例。

