---
prev:
  text: 手势输入
  link: /guide/flame/inputs/gesture-input.md
next:
  text: 其他输入
  link: /guide/flame/inputs/other-inputs.md
---

# 键盘输入

这是关于键盘输入的文档。

有关其他输入的文档，请参考：

- [手势输入](/guide/flame/inputs/gesture-input.md)：鼠标和触摸指针手势
- [其他输入](/guide/flame/inputs/other-inputs.md)：操纵杆、游戏手柄等

## 介绍

键盘 API 依赖于 Flutter 的 [Focus 小部件](https://api.flutter.dev/flutter/widgets/Focus-class.html)。

若要自定义焦点行为，请查看[控制焦点](#控制焦点).

游戏对按键的反应有两种方式;在游戏层面和组件层面。对于每个类，我们都有一个mixin，可以添加到`Game` 或`Component`类中。

### 在游戏关卡中接收键盘事件

要使 `Game `子类对按键敏感，请将其与 `KeyboardEvents `混合使用。

之后，就可以重写 onKeyEvent 方法了。

这个方法接收两个参数，第一个是 [RawKeyEvent](https://api.flutter.dev/flutter/services/RawKeyEvent-class.html)，它首先触发回调。第二个是一组当前按下的 [LogicalKeyboardKey](https://api.flutter.dev/flutter/widgets/KeyEventResult-class.html)。

返回值是一个[KeyEventResult](https://api.flutter.dev/flutter/widgets/KeyEventResult-class.html)。

`KeyEventResult.handled` 将告诉框架按键是在Flame内部解决的，并跳过`GameWidget`之外的任何其他键盘处理程序小部件。

`KeyEventResult.ignored` 将告诉框架继续在除 `GameWidget `之外的任何其他键盘处理程序小部件中测试此事件。 如果事件没有被任何处理程序解析，框架将触发 `SystemSoundType.alert`。

`KeyEventResult.skipRemainingHandlers` 与 `.ignored` 非常相似，除了将跳过任何其他处理程序小部件并直接播放警报声音的事实之外。

最小示例：

```dart
class MyGame extends FlameGame with KeyboardEvents {
  // ...
  @override
  KeyEventResult onKeyEvent(
    RawKeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    final isKeyDown = event is RawKeyDownEvent;

    final isSpace = keysPressed.contains(LogicalKeyboardKey.space);

    if (isSpace && isKeyDown) {
      if (keysPressed.contains(LogicalKeyboardKey.altLeft) ||
          keysPressed.contains(LogicalKeyboardKey.altRight)) {
        this.shootHarder();
      } else {
        this.shoot();
      }
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }
}
```

### 在组件级别接收键盘事件

要直接在组件中接收键盘事件，需要使用 mixin `KeyboardHandler`。

类似于 `Tappable `和 `Draggable`，`KeyboardHandler `可以混合到 `Component `的任何子类中。

键盘控制程序只能添加到与 `HasKeyboardHandlerComponents`混合的游戏中。

> ⚠️ 注意： 如果使用 `HasKeyboardHandlerComponents`，则必须从游戏混合列表中删除 `keyboardents` 以避免冲突。

在应用 `KeyboardHandler` 之后，可以重写 `onKeyEvent` 方法。

该方法接收两个参数。 首先是触发回调的 [RawKeyEvent](https://api.flutter.dev/flutter/services/RawKeyEvent-class.html)。 第二个是一组当前按下的 [LogicalKeyboardKey](https://api.flutter.dev/flutter/widgets/KeyEventResult-class.html)。

返回的值应该为 `true`，以允许键盘事件在其他组件之间不断传播。若要不允许任何其他组件接收事件，请返回 `false`。

### 控制焦点

在小部件级别，可以使用 [FocusNode](https://api.flutter.dev/flutter/widgets/FocusNode-class.html) API来控制游戏是否被聚焦。

`GameWidget `有一个可选的 `focusNode `参数，允许从外部控制其焦点。

默认情况下，`GameWidget `的 `autofocus `设置为 `true`，这意味着一旦挂载它就会获得焦点。 要覆盖该行为，请将 `autofocus `设置为 `false`。

更完整的例子见[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/input/keyboard.dart)。
