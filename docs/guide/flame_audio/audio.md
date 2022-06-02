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

首先，你必须在你的 `pubspec.yaml` 文件中添加 [flame_audio](https://github.com/flame-engine/flame_audio) 到你的依赖列表：

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

然后你可以使用以下方法：

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

You can use [the `Bgm` class](bgm.md) (via `FlameAudio.bgm`) to play looping background music
tracks. The `Bgm` class lets Flame automatically manage the pausing and resuming of background music
tracks when the game is backgrounded or comes back to the foreground.

Some file formats that work across devices and that we recommend are: MP3, OGG and WAV.

This bridge library (flame_audio) uses [audioplayers](https://github.com/luanpotter/audioplayer) in
order to allow for playing multiple sounds simultaneously (crucial in a game). You can check the
link for a more in-depth explanation.

Finally, you can pre-load your audios. Audios need to be stored in the memory the first time they
are requested; therefore, the first time you play each mp3 you might get a delay. In order to
pre-load your audios, just use:

```dart
await FlameAudio.audioCache.load('explosion.mp3');
```

You can load all your audios in the beginning in your game's `onLoad` method so that they always
play smoothly. To load multiple audio files, use the `loadAll` method:

```dart
await FlameAudio.audioCache.loadAll(['explosion.mp3', 'music.mp3'])
```

Finally, you can use the `clear` method to remove a file that has been loaded into the cache:

```dart
FlameAudio.audioCache.clear('explosion.mp3');
```

There is also a `clearCache` method, that clears the whole cache.

This might be useful if, for instance, your game has multiple levels and each has a different
set of sounds and music.

Both load methods return a `Future` for the `File`s loaded.

Both on `play` and `loop` you can pass an additional optional double parameter, the `volume`
(defaults to `1.0`).

Both the `play` and `loop` methods return an instance of an `AudioPlayer` from the
[audioplayers](https://github.com/luanpotter/audioplayer) lib, that allows you to stop, pause and
configure other parameters.
