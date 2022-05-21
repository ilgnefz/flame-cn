# FlameGame

`FlameGame`是Flame中最基本和最常用的`Game`类。

`FlameGame`是一个基于`Game`类实现的组件。基本上它有一个组件列表，并且通过更新和渲染调用所有已经被添加到游戏的组件。

这个组件系统被我们称之为 Flame Component System，简称FCS。

每次游戏需要调整大小时，例如当方向改变，`FlameGame`会调用所有组件调整大小的方法，并且会将这些信息传递给摄像头和视图。

`FlameGame.camera`控制空间坐标中的哪个点应该在屏幕的左上角（它的默认值是[0,0]，就像一个普通的Canvas）。

下面是一个 FlameGame 实现的例子：

```dart
class MyCrate extends SpriteComponent {
  // 创建一个渲染尺寸为16*16的crate.png精灵图组件
  MyCrate() : super(size: Vector2.all(16), anchor: Anchor.center);

  @override
  Future<void> onLoad() async {
    sprite = await Sprite.load('crate.png');
  }

  @override
  void onGameResize(Vector2 gameSize) {
    super.onGameResize(gameSize);
    // We don't need to set the position in the constructor, we can set it 
    // directly here since it will be called once before the first time it 
    // is rendered.
    position = gameSize / 2;
  }
}

class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    await add(MyCrate());
  }
}

main() {
  final myGame = MyGame();
  runApp(
    GameWidget(
      game: myGame,
    ),
  );
}
```