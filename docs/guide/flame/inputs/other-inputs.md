---
prev:
  text: 键盘输入
  link: /guide/flame/inputs/keyboard-input.md
next:
  text: 渲染
  link: /guide/flame/rendering/images.md
---

# 其他输入

这是关于除了键盘和鼠标以外的输入方法的文档。

有关其他输入的文档，请参考：

- [手势输入](/guide/flame/inputs/gesture-input.md)：鼠标和触摸指针手势
- [键盘输入](/guide/flame/inputs/keyboard-input.md)：键盘

## 操作杆

Flame提供了一个组件，能够为您的游戏创建一个虚拟操纵杆。

要使用这一功能，您需要创建一个`JoystickComponent`，按您想要的方式配置它，并将其添加到游戏中。

查看这个示例可以更好地理解：

```dart
class MyGame extends FlameGame with HasDraggables {

  MyGame() {
    joystick.addObserver(player);
    add(player);
    add(joystick);
  }

  @override
  Future<void> onLoad() async {
    super.onLoad();
    final image = await images.load('joystick.png');
    final sheet = SpriteSheet.fromColumnsAndRows(
      image: image,
      columns: 6,
      rows: 1,
    );
    final joystick = JoystickComponent(
      knob: SpriteComponent(
        sprite: sheet.getSpriteById(1),
        size: Vector2.all(100),
      ),
      background: SpriteComponent(
        sprite: sheet.getSpriteById(0),
        size: Vector2.all(150),
      ),
      margin: const EdgeInsets.only(left: 40, bottom: 40),
    );

    final player = Player(joystick);
    add(player);
    add(joystick);
  }
}

class JoystickPlayer extends SpriteComponent with HasGameRef {
  /// Pixels/s
  double maxSpeed = 300.0;

  final JoystickComponent joystick;

  JoystickPlayer(this.joystick)
      : super(
          size: Vector2.all(100.0),
        ) {
    anchor = Anchor.center;
  }

  @override
  Future<void> onLoad() async {
    super.onLoad();
    sprite = await gameRef.loadSprite('layers/player.png');
    position = gameRef.size / 2;
  }

  @override
  void update(double dt) {
    super.update(dt);
    if (joystick.direction != JoystickDirection.idle) {
      position.add(joystick.velocity * maxSpeed * dt);
      angle = joystick.delta.screenAngle();
    }
  }
}
```

在这个示例中，我们创建了`MyGame`和`Player`类。`MyGame`创造了一个操纵杆，并在创造时传递给`Player`。在`Player`类中，我们根据操纵杆的当前状态进行操作。

操纵杆有几个字段会根据它所处的状态而变化。这些字段应该用于了解操纵杆的状态：

 - `intensity`：旋钮从震中拖动到操纵杆边缘的百分比 [0.0，1.0]（如果设置了，则为`knobRadius`）。
 - `delta`：旋钮从震中拖动的绝对量（定义为 `Vector2`）。
 - `velocity`：以 `Vector2` 表示的百分比，以及旋钮当前从基础位置拉到操纵杆边缘的方向。

如果您想创建与操纵杆一起使用的按钮，请查看 [HudButtonComponent](#hudbuttoncomponent).

如何使用它的完整例子可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/input/joystick.dart)找到，也可以在[这里](https://examples.flame-engine.org/#/Controls_Joystick)看到。

## HudButtonComponent

`HudButtonComponent` 是一个可以定义为 `Viewport `边缘的边距而不是位置的按钮。它接受两个 `PositionComponents`。 `button`和`buttonDown`，第一个用于按钮空闲时显示，第二个在按下按钮时显示。 如果您不想在按钮被按下时更改它的外观，或者如果您想通过`button`组件处理它，那么第二个选项是可选的。

顾名思义，这个按钮默认是一个hub的，这意味着即使游戏的摄像机移动了，它在屏幕上也会是静态的。通过设置 `hudButtonComponent.respectCamera = true`，您还可以将此组件用作非 hud的。

如果您想按下并释放按钮（这是常见的事情） ，您可以传入回调函数作为 `onPressed` 和 `onReleased `参数，或者您可以扩展组件并覆盖 `onTapDown`、 `onTapUp `和/或 `onTapCancel `并在那里实现您的逻辑。

## SpriteButtonComponent

`SpriteButtonComponent` 是由两个 `Sprites` 定义的按钮，一个表示按钮被按下的时间，另一个表示按钮被释放的时间。

## ButtonComponent

`ButtonComponent `是由两个 `PositionComponents `定义的按钮，一个表示按钮被按下的时间，另一个表示按钮被释放的时间。如果您只想为按钮使用 `SpriteButtonComponent`，那么可以使用 SpriteButtonComponent，但是如果您想使用一个 [SpriteAnimationComponent](#spritebuttoncomponent)作为按钮，或者其他任何不是纯精灵图的组件，那么这个组件是不错的选择。

## Gamepad

Flame有一个独立的插件来支持外部游戏控制器（手柄），查看[这里](https://github.com/flame-engine/flame_gamepad)了解更多信息。
