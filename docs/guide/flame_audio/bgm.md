---
prev:
  text: 一般音频
  link: /guide/flame_audio/audio.md
next:
  text: 教程
  link: /guide/tutorials/tutorials.md
---

# 循环背景音乐

使用 `Bgm` 类，您可以管理与应用程序（或游戏）生命周期状态更改有关的背景音乐的循环。

当应用程序终止或切换到后台时，`Bgm` 会自动暂停当前播放的音乐。 同样，当应用程序恢复时，`Bgm` 也会恢复背景音乐。 还支持手动暂停和恢复您的。

`Bgm` 类由 [flame_audio](https://github.com/flame-engine/flame_audio) 库处理，因此您首先必须将其添加到 `pubspec.yaml` 文件中的依赖项列表中：

```yaml
dependencies:
  flame_audio: <VERSION>
```

最新版本可以在 [pub.dev](https://pub.dev/packages/flame_audio/install) 上找到。

为了使这个类正常工作，须通过调用以下方法注册观察者：

```dart
FlameAudio.bgm.initialize();
```

**重要事项**：必须在 `WidgetsBinding` 类的实例已经存在的时间点调用 `initialize` 函数。 最佳做法是将此调用放在游戏的 `onLoad` 方法中。 

如果您已经播放完了背景音乐，但仍然希望保持应用程序/游戏运行，那么可以使用 dispose 函数删除观察者。

```dart
FlameAudio.bgm.dispose();
```

要播放循环背景音乐，请运行：

```dart
import 'package:flame_audio/flame_audio.dart';

FlameAudio.bgm.play('adventure-track.mp3');
```

**注意**：`Bgm` 类总是使用 `FlameAudio` 的静态实例来存储缓存的音乐文件。

您必须有一个合适的文件夹结构，并将文件添加到 `pubspec.yaml` 文件中，如[Flame 音频文档](audio.md)中所解释的那样。

## 缓存音乐文件

以下函数可用于将音乐文件预加载（和卸载）到缓存中。这些函数只是 FlameAudio 中具有相同名称的函数的别名。

同样，如果您需要更多的信息，请参考[Flame 音频文档](audio.md)。

```dart
import 'package:flame_audio/flame_audio.dart';

FlameAudio.bgm.load('adventure-track.mp3');
FlameAudio.bgm.loadAll([
  'menu.mp3',
  'dungeon.mp3',
]);
FlameAudio.bgm.clear('adventure-track.mp3');
FlameAudio.bgm.clearCache();
```

## 方法

### 播放

`play` 函数接受一个 `String` 类型，该字符串应该是指向要播放的音乐文件位置的路径（遵循 Flame 音频文件夹结构要求）。

您可以传递一个额外的可选双参数，即音量（默认为 1.0）。

示例：

```dart
FlameAudio.bgm.play('bgm/boss-fight/level-382.mp3');
```

```dart
FlameAudio.bgm.play('bgm/world-map.mp3', volume: .25);
```

### 停止

要停止当前正在播放的背景音乐，只需调用 `stop`。

```dart
FlameAudio.bgm.stop();
```

### 暂停和恢复

要手动暂停和恢复背景音乐，您可以使用 `pause` 和 `resume` 函数。

`FlameAudio.bgm` 自动处理暂停和恢复当前播放的背景音乐。 当焦点回到应用程序/游戏时，手动暂停可防止应用程序/游戏自动恢复。

```dart
FlameAudio.bgm.pause();
```

```dart
FlameAudio.bgm.resume();
```
