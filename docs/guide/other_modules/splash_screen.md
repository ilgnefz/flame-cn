---
prev:
  text: Tiled
  link: /guide/other_modules/tiled.md
---



# 闪屏页

![](https://raw.githubusercontent.com/flame-engine/flame_splash_screen/main/demogif.gif)

用漂亮的闪屏设计你的 Flame 游戏。

`FlameSplashScreen`是一个可定制的闪屏包。

```dart
FlameSplashScreen(
  theme: FlameSplashTheme.dark,
  onFinish: (BuildContext context) => Navigator.pushNamed(context, '/your-game-initial-screen')
)
```

查看包的 [repo](https://github.com/flame-engine/flame_splash_screen) 和 [pub 页面](https://pub.dev/packages/flame_splash_screen) 以获取更多详细信息。