---
prev:
  text: 颜色和调色板
  link: /guide/flame/rendering/palette.md
next:
  text: 图层
  link: /guide/flame/rendering/layers.md
---

#  粒子

Flame 提供了一个基本但强大且可扩展的粒子系统。 这个系统的核心概念是 `Particle` 类，它的行为与 `ParticleSystemComponent` 非常相似。

在 `FlameGame` 中 `Particle` 的最基本用法如下所示：

```dart
import 'package:flame/components.dart';

// ...

game.add(
  // Wrapping a Particle with ParticleSystemComponent
  // which maps Component lifecycle hooks to Particle ones
  // and embeds a trigger for removing the component.
  ParticleSystemComponent(
    particle: CircleParticle(),
  ),
);
```

当在自定义 `Game` 实现中使用 `Particle` 时，请确保在每个游戏刻度循环期间都调用了`update`和`render`方法。

实现所需粒子效果的主要方法：
* 现有行为的组合。
* 使用行为链（只是第一个的语法糖）。
* 使用 `ComputedParticle`.

组合的工作方式与 Flutter 小部件的工作方式相似，通过定义从上到下的效果。 链接允许通过定义从下到上的行为更流畅地表达相同的组合树。 计算粒子又将行为的实现完全委托给您的代码。 任何方法都可以在需要时与现有行为结合使用。

```dart
Random rnd = Random();

Vector2 randomVector2() => (Vector2.random(rnd) - Vector2.random(rnd)) * 200;

// 组合
//
// 将粒子效果定义为一组从上到下、相互嵌套的嵌套行为：
// ParticleSystemComponent
//   > ComposedParticle
//     > AcceleratedParticle
//       > CircleParticle
game.add(
  ParticleSystemComponent(
    particle: Particle.generate(
      count: 10,
      generator: (i) => AcceleratedParticle(
        acceleration: randomVector2(),
        child: CircleParticle(
          paint: Paint()..color = Colors.red,
        ),
      ),
    ),
  ),
);

// 链式
//
// 表达与上述相同的行为，但使用更流畅的 API。
// 只有带有 SingleChildParticle mixin 的粒子才能被用作可链行为。
game.add(
  ParticleSystemComponent(
    particle: Particle.generate(
      count: 10,
      generator: (i) => pt.CircleParticle(paint: Paint()..color = Colors.red)
    )
  )
);

// 计算粒子
//
// 与内置行为相比，所有的行为都是明确定义的。 提供更大的灵活性
game.add(
  ParticleSystemComponent(
      particle: Particle.generate(
        count: 10,
        generator: (i) {
          Vector2 position = Vector2.zero();
          Vector2 speed = Vector2.zero();
          final acceleration = randomVector2();
          final paint = Paint()..color = Colors.red;

          return ComputedParticle(
            renderer: (canvas, _) {
              speed += acceleration;
              position += speed;
              canvas.drawCircle(Offset(position.x, position.y), 1, paint);
            }
        );
      }
    )
  )
);
```

您可以在[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/particles_example.dart)找到更多关于如何使用不同组合的内置粒子的示例。


## 生命周期

所有 `Particle` 的共同行为是它们都接受一个 `lifespan` 参数。这个值是用来让 `ParticleSystemComponent` 在它的内部粒子到达生命结束时删除自己的。粒子本身内的时间是使用 Flame `Timer` 类来跟踪的。通过将它传递给相应的 `Particle` 构造函数，可以配置一个以秒表示的 `double` (具有微秒精度)。

```dart
Particle(lifespan: .2); // will live for 200ms.
Particle(lifespan: 4); // will live for 4s.
```

还可以使用 `setlifesim` 方法重置 `Particle` 的生命周期，该方法也接受双精度的秒数。

```dart
final particle = Particle(lifespan: 2);

// ... after some time.
particle.setLifespan(2) // will live for another 2s.
```

`Particle` 在其生命周期中，跟踪其存活的时间并通过 `progress` 获取公开它，后者返回介于 0.0 和 1.0 之间的值。此值可以与 Flutter 的 `AnimationController` 类的 `value` 属性以类似的方式使用。

```dart
final particle = Particle(lifespan: 2.0);

game.add(ParticleSystemComponent(particle: particle));

// Will print values from 0 to 1 with step of .1: 0, 0.1, 0.2 ... 0.9, 1.0.
Timer.periodic(duration * .1, () => print(particle.progress));
```

如果给定的 `Particle` 支持任何嵌套行为，那么它的生命期限都会传递给给定 `Particle` 的所有后代。

## 内置粒子

Flame 带有一些内置的粒子行为：
* `TranslatedParticle` 通过给定的 `Vector2 `转换子粒子
* `MovingParticle` 在两个预定义的 `Vector2` 之间移动其子粒子，支持 `Curve`
* `AcceleratedParticle` 允许基于物理的基本效果，例如重力或速度阻尼
* `CircleParticle` 渲染各种形状和大小的圆
* `SpriteParticle` 使用粒子效果渲染 Flame `Sprite`
* `ImageParticle` 在粒子效果中渲染 `dart:ui` 图像
* `ComponentParticle` 在粒子效果中渲染 Flame 组件
* `FlareParticle` 在粒子效果中渲染 Flare 动画

更多关于如何一起使用这些行为的例子可以在[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/utils/particles.dart)找到。所有实现都可以在 Flame 存储库的  [particles](https://github.com/flame-engine/flame/tree/main/packages/flame/lib/src/particles) 文件夹中获得。

只需将底层粒子转换为渲染画布中的指定 `Vector2`。 改变或不改变其位置，考虑在需要改变位置的地方使用 `MovingParticle` 或 `AcceleratedParticle`。同样的效果可以通过转换`Canvas`层来实现。

```dart
game.add(
  ParticleSystemComponent(
    particle: TranslatedParticle(
      // Will translate the child Particle effect to the center of game canvas.
      offset: game.size / 2,
      child: Particle(),
    ),
  ),
);
```

## MovingParticle

在其生命周期内将子粒子在 `Vector2s` 之间来回移动。 通过 `CurvedParticle` 可以支持 `Curve`。

```dart
game.add(
  ParticleSystemComponent(
    particle: MovingParticle(
      // Will move from corner to corner of the game canvas.
      from: Vector2.zero(),
      to: game.size,
      child: CircleParticle(
        radius: 2.0,
        paint: Paint()..color = Colors.red,
      ),
    ),
  ),
);
```

## AcceleratedParticle

一个基本的物理粒子，允许您指定其初始位置、速度和加速度，并让更新周期完成其余的工作。 这三个都指定为 `Vector2`，您可以将其视为向量。 它特别适用于基于物理的“爆发”，但不仅限于此。 `Vector2` 值的单位是逻辑 px/s。 因此，`Vector2(0, 100)` 的速度将使子粒子在游戏时间内每秒移动设备的 100 个逻辑像素。

```dart
final rnd = Random();
Vector2 randomVector2() => (Vector2.random(rnd) - Vector2.random(rnd)) * 100;

game.add(
  ParticleSystemComponent(
    particle: AcceleratedParticle(
      // Will fire off in the center of game canvas
      position: game.canvasSize/2,
      // With random initial speed of Vector2(-100..100, 0..-100)
      speed: Vector2(rnd.nextDouble() * 200 - 100, -rnd.nextDouble() * 100),
      // Accelerating downwards, simulating "gravity"
      // speed: Vector2(0, 100),
      child: CircleParticle(
        radius: 2.0,
        paint: Paint()..color = Colors.red,
      ),
    ),
  ),
);
```

## CircleParticle

一个粒子，它使用给定的 `Paint` 在传递的 `Canvas` 的零偏移处渲染一个圆圈。 与 `TranslatedParticle`、`MovingParticle` 或 `AcceleratedParticle` 结合使用以获得所需的定位。

```dart
game.add(
  ParticleSystemComponent(
    particle: CircleParticle(
      radius: game.size.x / 2,
      paint: Paint()..color = Colors.red.withOpacity(.5),
    ),
  ),
);
```

## SpriteParticle

允许您将 `Sprite` 嵌入到您的粒子效果中。

```dart
game.add(
  ParticleSystemComponent(
    particle: SpriteParticle(
      sprite: Sprite('sprite.png'),
      size: Vector2(64, 64),
    ),
  ),
);
```

## ImageParticle

在粒子树中渲染给定的 `dart:ui` 图像。

```dart
// During game initialisation
await Flame.images.loadAll(const [
  'image.png',
]);

// ...

// Somewhere during the game loop
final image = await Flame.images.load('image.png');

game.add(
  ParticleSystemComponent(
    particle: ImageParticle(
      size: Vector2.all(24),
      image: image,
    );
  ),
);
```

## AnimationParticle

嵌入动画的粒子。 默认情况下，对齐动画的 `stepTime` 以便在粒子生命周期内完全播放。 可以使用 `alignAnimationTime` 参数覆盖此行为。

```dart
final spritesheet = SpriteSheet(
  image: yourSpriteSheetImage,
  srcSize: Vector2.all(16.0),
);

game.add(
  ParticleSystemComponent(
    particle: AnimationParticle(
      animation: spritesheet.createAnimation(0, stepTime: 0.1),
    );
  ),
);
```

## ComponentParticle

此粒子允许您在粒子效果中嵌入组件。 组件可以有自己的更新生命周期，并且可以在不同的效果树中重复使用。如果您唯一需要的是添加一些动力学到某个组件的实例，请考虑直接将其添加到游戏中，而不是在中间添加粒子。

```dart
final longLivingRect = RectComponent();

game.add(
  ParticleSystemComponent(
    particle: ComponentParticle(
      component: longLivingRect
    );
  ),
);

class RectComponent extends Component {
  void render(Canvas c) {
    c.drawRect(
      Rect.fromCenter(center: Offset.zero, width: 100, height: 100),
      Paint()..color = Colors.red
    );
  }

  void update(double dt) {
    /// Will be called by parent [Particle]
  }
}
```

## FlareParticle

要在 Flame 中使用 Flare，请使用 [flame_flare](https://github.com/flame-engine/flame_flare) 包。

它将提供一个名为 `FlareParticle `的类，它是 `FlareActorAnimation `的容器，它将 `update` 和 `render` 方法传给其子类。

```dart
import 'package:flame_flare/flame_flare.dart';

// Within your game or component's `onLoad` method
const flareSize = 32.0;
final flareAnimation = FlareActorAnimation('assets/sparkle.flr');
flareAnimation.width = flareSize;
flareAnimation.height = flareSize;

// Somewhere in game
game.add(
  ParticleSystemComponent(
    particle: FlareParticle(flare: flareAnimation),
  ),
);
```

## ComputedParticle

在以下情况下 `Particle` 可以为您提供帮助：
* 默认行为不够
* 优化复杂效果
* 定制速度

当创建时，它将所有的渲染委托给一个`ParticleRenderDelegate`，在每一帧上调用它来执行必要的计算并向 `Canvas` 渲染一些东西。

```dart
game.add(
  ParticleSystemComponent(
    // 渲染一个在粒子生命期间逐渐改变其颜色和大小的圆
    particle: ComputedParticle(
      renderer: (canvas, particle) => canvas.drawCircle(
        Offset.zero,
        particle.progress * 10,
        Paint()
          ..color = Color.lerp(
            Colors.red,
            Colors.blue,
            particle.progress,
          ),
      ),
    ),
  ),
)
```

## 嵌套行为

Flame 的粒子实现遵循与 Flutter 小部件相同的极端组合模式。 这是通过在每个粒子中封装小块行为，然后将这些行为嵌套在一起以实现所需的视觉效果来实现的。

允许粒子互相嵌套的两个实体是：`SingleChildParticle` mixin 和 `ComposedParticle` 类。

`SingleChildParticle` 可以帮助您创建具有自定义行为的粒子。 例如，在每一帧中随机定位其子节点：

```dart
var rnd = Random();

class GlitchParticle extends Particle with SingleChildParticle {
  @override
  Particle child;

  GlitchParticle({
    @required this.child,
    double lifespan,
  }) : super(lifespan: lifespan);

  @override
  render(Canvas canvas)  {
    canvas.save();
    canvas.translate(rnd.nextDouble() * 100, rnd.nextDouble() * 100);

    // Will also render the child
    super.render();

    canvas.restore();
  }
}
```

`ComposedParticle` 可以单独使用，也可以在现有的粒子树中使用。
