---
prev:
  text: forge2d
  link: /guide/other_modules/forge2d.md
next:
  text: Tiled
  link: /guide/other_modules/tiled.md
---

# Oxygen

我们（Flame 组织）构建了一个名为 Oxygen 的 ECS（实体组件系统）。

如果您想使用专门用于 Flame 的 Oxygen 作为 FCS（Flame 组件系统）的替代品，您应该使用我们的桥接库 [flame_oxygen](https://github.com/flame-engine/flame/tree/main/packages/flame_oxygen)，如果您只想在 Dart 项目中使用它，您可以直接使用 [oxygen](https://github.com/flame-engine/oxygen) 库。

如果你还不熟悉 Oxygen，我们建议你仔细阅读它的[文档](https://github.com/flame-engine/oxygen/tree/main/doc)。

要在游戏中使用它，你只需要在你的 `pubspec.yaml` 中添加 `flame _ Oxygen`，正如在 [Oxygen 示例](https://github.com/flame-engine/flame/tree/main/packages/flame_oxygen/example)和 `pub.dev` [安装说明](https://pub.dev/packages/flame_oxygen)中看到的那样。

## OxygenGame (游戏扩展)

如果您要在项目中使用 Oxygen，最好使用 `Game` 类的 Oxygen 特定扩展。

它被称为` OxygenGame`，它可以让您完全访问 Oxygen 框架，同时还可以完全访问 Flame 游戏循环。

`OxygenGame` 没有像使用 Flame 那样使用 `onLoad`，而是使用了 `init` 方法。 此方法在 `onLoad` 中调用，但在世界初始化之前，允许您注册组件和系统并执行您通常在 `onLoad` 中执行的任何其他操作。

在[示例文件夹](https://github.com/flame-engine/flame/tree/main/packages/flame_oxygen/example)中可以看到一个简单的 OxygenGame 实现示例。

OxygenGame 还带有它自己的 createEntity 方法，该方法会自动在实体上添加某些默认组件。 这在您使用 [BaseSystem](#basesystem) 作为基础时特别有用。

## 系统

系统定义了游戏的逻辑。 在 FCS 中，您通常会将您的逻辑添加到带有 Oxygen 的组件中，我们因此使用系统。 Oxygen 本身完全与平台无关，这意味着它没有渲染循环。 它只知道`execute`，这是一个相当于Flame中的update方法的方法。

在每次执行时，Oxygen 会自动调用按顺序注册的所有系统。 但是在 Flame 中，我们可以为不同的循环（渲染/更新）设置不同的逻辑。 所以在 flame_oxygen 中我们引入了 RenderSystem 和 UpdateSystem mixin。 这些 mixin 允许您将渲染方法和更新方法分别添加到您的自定义系统中。 有关详细信息，请查看 [RenderSystem](#mixin-rendersystem) 和 [UpdateSystem](#mixin-updatesystem) 部分。

如果您以前使用 FCS，您可能会期望通常从 `PositionComponent` 获得的某些默认功能。 如前所述，组件不包含任何类型的逻辑，但为了提供相同的默认功能，我们还创建了一个名为` BaseSystem` 的类。 该系统的行为与 FCS 中 `PositionComponent` 的预渲染逻辑几乎相同。 您只需要将其子类化到您自己的系统。 有关详细信息，请查看 [BaseSystem](#basesystem) 部分。

系统可以使用 [OxygenGame](#oxygengame-game-extension)上的 `world.registerSystem` 方法注册到世界。

### mixin GameRef

`GameRef `mixin 允许系统知道它所连接的 `OxygenGame` 实例。这样就可以方便地访问游戏类上的方法。

```dart
class YourSystem extends System with GameRef<YourGame> {
  @override
  void init() {
    // Access to game using the .game propery
  }

  // ...
}
```

### mixin RenderSystem

`RenderSystem` mixin允许为渲染循环注册一个系统。通过添加一个`render`方法到系统中，你可以像在 Flame中 一样完全访问画布。

```dart
class SimpleRenderSystem extends System with RenderSystem {
  Query? _query;

  @override
  void init() {
    _query = createQuery([/* Your filters */]);
  }

  void render(Canvas canvas) {
    for (final entity in _query?.entities ?? <Entity>[]) {
      // Render entity based on components
    }
  }
}
```

### mixin UpdateSystem

MixinSystem mixin 允许为更新循环注册一个系统。通过在系统中添加`update`方法，你可以像在 Flame 中一样完全访问增量时间。

```dart
class SimpleUpdateSystem extends System with UpdateSystem {
  Query? _query;

  @override
  void init() {
    _query = createQuery([/* Your filters */]);
  }

  void update(double dt) {
    for (final entity in _query?.entities ?? <Entity>[]) {
      // Update components values
    }
  }
}
```

### BaseSystem

`BaseSystem` 是一个抽象类，其逻辑可以与 FCS 中的 `PositionComponent `进行比较。 BaseSystem 自动过滤所有具有来自 `flame_oxygen` 的 `PositionComponent `和 `SizeComponent `的实体。 最重要的是，您可以通过定义一个`filters`来添加自己的过滤器。 然后使用这些过滤器来过滤您感兴趣的实体。

在每次渲染循环中，`BaseSystem`会像 FCS 中的`PositionComponent`一样准备画布(平移、旋转和设置锚点)。之后，它将调用`renderEntity`方法，这样你就可以在准备好的画布上为那个实体添加你自己的渲染逻辑。

`BaseSystem `将检查以下组件以准备画布：

- `PositionComponent`（必需）
- `SizeComponent`（必需）
- `AnchorComponent`（可选，默认为 `anchor.topcleft`)
- `AngleComponent` （(可选，默认为0）

```dart
class SimpleBaseSystem extends BaseSystem {
  @override
  List<Filter<Component>> get filters => [];

  @override
  void renderEntity(Canvas canvas, Entity entity) {
    // The canvas is translated, rotated and fully prepared for rendering.
  }
}
```

### ParticleSystem

`ParticleSystem `是一个简单的系统，它将 `Particle` API 从 Flame 带到 Oxygen。 这使您可以使用 [ParticleComponent](#particlecomponent) 而不必担心它将如何呈现或何时更新它。 因为大部分逻辑已经包含在粒子本身中。

只需将 `ParticleSystem `和 `ParticleComponent `注册到您的世界，就像这样：

```dart
world.registerSystem(ParticleSystem());

world.registerComponent<ParticleComponent, Particle>(() => ParticleComponent);
```

您现在可以使用 `partitioncomponent `创建一个新实体。有关详细信息，请查看[ParticleComponent](#particlecomponent)部分。

## 组件

Oxygen 中的组件与 FCS 中的组件不同，主要是因为它们不包含逻辑，而是只包含数据。 这些数据随后被用于定义逻辑的系统中。

为了适应从 FCS 切换到 Oxygen 的人，我们实现了一些组件来帮助您入门。其中一些组件是基于来自 FCS 的 `PositionComponent` 所具有的多种功能。其他的只是对某些 Flame API 功能的简单包装，它们通常附带了您可以使用的预定义系统。

可以使用 [OxygenGame](#oxygengame-game-extension) 上的 world.registerComponent 方法向 World 注册组件。

### PositionComponent

`PositionComponent `顾名思义是一个描述实体位置的组件。 它默认注册到 World。

使用 OxygenGame 创建一个定位实体：

```dart
game.createEntity(
  position: Vector2(100, 100),
  size: // ...
);
```

使用 World 创建定位实体：

```dart
world.createEntity()
  ..add<PositionComponent, Vector2>(Vector2(100, 100));
```

### SizeComponent

`SizeComponent` 顾名思义是一个描述实体大小的组件。它默认注册到 World。

使用 OxygenGame 创建一个大小的实体：

```dart
game.createEntity(
  position: // ...
  size: Vector2(50, 50),
);
```

使用 World 创建一个大小的实体：

```dart
world.createEntity()
  ..add<SizeComponent, Vector2>(Vector2(50, 50));
```

### AnchorComponent

`AnchorComponent`顾名思义就是一个描述实体锚定位置的组件。它默认注册到 World。

当您使用 [BaseSystem](#basesystem) 时，这个组件特别有用。但也可以用于定义您自己的锚逻辑。
使用 OxygenGame 创建一个锚定的实体：

```dart
game.createEntity(
  position: // ...
  size: // ...
  anchor: Anchor.center,
);
```

使用 World 创建一个锚定的实体：

```dart
world.createEntity()
  ..add<AnchorComponent, Anchor>(Anchor.center);
```

### AngleComponent

`AngleComponent `顾名思义是一个描述实体角度的组件。 它默认注册到 World。 角度以弧度为单位。

当您使用 [BaseSystem](#basesystem) 时，这个组件特别有用。但也可以用于定义您自己的角度逻辑。

使用 OxygenGame 创建一个有角度的实体：

```dart
game.createEntity(
  position: // ...
  size: // ...
  angle: 1.570796,
);
```

使用 World 创建一个角度实体：

```dart
world.createEntity()
  ..add<AngleComponent, double>(1.570796);
```

### FlipComponent

`FlipComponent` 可用于在 X 或 Y 轴上翻转渲染。 它默认注册到 World。

当您使用 [BaseSystem](#basesystem) 时，这个组件特别有用。但也可以用于定义您自己的翻转逻辑。

使用 OxygenGame 创建一个在 x 轴上翻转的实体：

```dart
game.createEntity(
  position: // ...
  size: // ...
  flipX: true
);
```

使用 World 创建一个在 x 轴上翻转的实体：

```dart
world.createEntity()
  ..add<FlipComponent, FlipInit>(FlipInit(flipX: true));
```

### SpriteComponent

`SpriteComponent `顾名思义是一个描述实体精灵的组件。 它默认注册到 World。

这允许你将一个精灵分配给一个实体。

使用 OxygenGame 创建一个带有精灵的实体：

```dart
game.createEntity(
  position: // ...
  size: // ...
)..add<SpriteComponent, SpriteInit>(
  SpriteInit(await game.loadSprite('pizza.png')),
);
```

使用 World 创建一个带有精灵的实体：

```dart
world.createEntity()
  ..add<SpriteComponent, SpriteInit>(
    SpriteInit(await game.loadSprite('pizza.png')),
  );
```

### TextComponent

`TextComponent`顾名思义是一个向实体添加文本组件的组件。 它默认注册到 World。

这允许你添加文本到你的实体，结合`PositionComponent`，你可以使用它作为一个文本实体。

使用 OxygenGame 创建带有文本的实体：

```dart
game.createEntity(
  position: // ...
  size: // ...
)..add<TextComponent, TextInit>(
  TextInit(
    'Your text',
    config: const TextPaintConfig(),
  ),
);
```

使用 World 创建一个包含文本的实体：

```dart
world.createEntity()
  ..add<TextComponent, TextInit>(
    TextInit(
      'Your text',
      config: const TextPaintConfig(),
    ),
  );
```

### ParticleComponent

`ParticleComponent `包装了来自 Flame 的粒子。 结合 [ParticleSystem](#particlesystem)，您可以轻松地将粒子添加到游戏中，而无需担心如何渲染粒子或何时/如何更新粒子。

使用 OxygenGame 创建一个粒子实体：

```dart
game.createEntity(
  position: // ...
  size: // ...
)..add<ParticleComponent, Particle>(
  // Your Particle.
);
```

使用 World 创建带有粒子的实体：

```dart
world.createEntity()
  ..add<ParticleComponent, Particle>(
    // Your Particle.
  );
```
