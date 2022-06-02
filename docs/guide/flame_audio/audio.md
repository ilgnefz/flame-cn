---
prev:
  text: 实用工具
  link: /guide/flame/other/util.md
next:
  text: 一般音频
  link: /guide/flame_audio/audio.md
---

# 音频

对于任何游戏来说，播放音频都是必不可少的，所以我们将其简单化！

首先，您必须在您的 `pubspec.yaml` 文件中添加 [flame_audio](https://github.com/flame-engine/flame_audio) 到您的依赖列表：

```yaml
dependencies:
  flame_audio: <VERSION>
```

最新版本可以在 [pub.dev](https://pub.dev/packages/flame_audio/install) 上找到。

在安装了 `flame _ audio` 包之后，您可以在 `pubspec.yaml` 文件的 `assets` 部分中添加音频文件。确保音频文件存在于您提供的路径中。

`FlameAudio` 的默认目录是 `assets/audio` (可以更改) ，`AudioPool` 的默认目录是 `assets/audio/sfx`。

对于下面的例子，您的 `pubspec.yaml` 文件需要包含如下内容：

```yaml
flutter:
  assets:
    - assets/audio/explosion.mp3
    - assets/audio/music.mp3
```

然后您可以使用以下方法：

```dart
import 'package:flame_audio/flame_audio.dart';

// 用于较短的重复使用的音频片段，如声音效果
FlameAudio.play('explosion.mp3');

// 用于循环播放音频文件
FlameAudio.loop('music.mp3');

// 用于播放较长的音频文件
FlameAudio.playLongAudio('music.mp3');

// 用于循环较长的音频文件
FlameAudio.loopLongAudio('music.mp3');

// 暂停/恢复游戏时应暂停/播放的背景音乐
FlameAudio.bgm.play('music.mp3');
```

`play/loop` 和 `playLongAudio/loopLongAudio` 的区别在于 `play/loop` 使用了优化的功能，允许声音在迭代之间没有间隙地循环，并且几乎不会发生游戏帧率下降。 您应该尽可能选择前一种方法。

`playLongAudio/loopLongAudio` 允许播放任何长度的音频，但它们确实会造成帧率下降，并且循环播放的音频在迭代之间会有一个小的间隙。

您可以使用 [Bgm](bgm.md) 类（通过 `FlameAudio.bgm`）播放循环背景音乐曲目。 `Bgm` 类让 Flame 在游戏进入后台或回到前台时自动管理背景音乐曲目的暂停和恢复。

我们推荐的一些跨设备工作的文件格式是：MP3、OGG 和 WAV。

这个桥接库（flame_audio）使用 [audioplayers](https://github.com/luanpotter/audioplayer) 来允许同时播放多个声音（在游戏中至关重要）。 您可以查看链接以获得更深入的解释。

最后，您可以预加载音频。 音频需要在第一次被请求时存储在内存中； 因此，第一次播放每个 mp3 时，您可能会遇到延迟。 为了预加载您的音频，只需使用：

```dart
await FlameAudio.audioCache.load('explosion.mp3');
```

您可以在游戏的 onLoad 方法中一开始就加载所有音频，以便它们始终流畅播放。 要加载多个音频文件，请使用 `loadAll` 方法：

```dart
await FlameAudio.audioCache.loadAll(['explosion.mp3', 'music.mp3'])
```

最后，您可以使用 `clear` 方法删除加载到缓存中的文件：

```dart
FlameAudio.audioCache.clear('explosion.mp3');
```

还有一个 `clearCache` 方法，可以清除整个缓存。

例如，如果您的游戏有多个关卡，每个关卡都有不同的声音和音乐组合，那么这可能会很有用。

在 `play` 和 `loop` 中，您都可以传递一个额外的可选双参数，音量（默认为 1.0）。

`play` 和 `loop` 方法都从 [audioplayers](https://github.com/luanpotter/audioplayer) 库返回一个 `AudioPlayer` 的实例，它允许您停止、暂停和配置其他参数。
