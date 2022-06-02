---
prev:
  text: 开始使用
  link: /guide/started.md
next:
  text: 游戏循环
  link: /guide/flame/game-loop.md
---

# 文件结构

Flame 为您的项目提供了一个建议的结构，其中包括标准 Flutter`assets` 目录以及两个子目录：`audio`和`images`。

如果使用以下示例代码：

```dart
void main() {
  FlameAudio.play('explosion.mp3');

  Flame.images.load('player.png');
  Flame.images.load('enemy.png');
}
```

Flame 期望在其中找到文件的文件结构是：

```text
.
└── assets
    ├── audio
    │   └── explosion.mp3
    └── images
        ├── enemy.png
        └── player.png
```

或者，您可以将`audio`文件夹拆分为两个子文件夹，一个`music`用于`sfx`。

不要忘记将这些文件添加到您的`pubspec.yaml`文件中：

```yaml
flutter:
  assets:
    - assets/audio/explosion.mp3
    - assets/images/player.png
    - assets/images/enemy.png
```

如果您想改变这个结构，可以使用prefix参数创建您自己的`AssetsCache`、 `ImagesCache`、`AudioCache`和`SoundPool`实例，而不是使用由Flame提供的全局实例。

