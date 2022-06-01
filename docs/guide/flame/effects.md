---
prev:
  text: 游戏循环
  link: /guide/flame/collision-detection.md
next:
  text: 相机和视口
  link: /guide/flame/camera-and-viewport.md
---

# 游戏特效

特效是一种特殊的组件，它可以附加到另一个组件上，以便修改其属性或外观。

例如，假设你正在制作一款带有可收集升级道具的游戏。你希望这些升级道具能够在地图上随机生成，然后在一段时间后重新生成。显然，你可以为升级制作一个精灵组件，然后将该组件放置在地图上，但我们可以做得更好！

让我们添加一个缩放特效，当道具第一次出现时，从0增长到100%。添加另一个无限重复的交替移动特效，以使项目稍微上下移动。然后添加一个不透明特效，该特效将使物品闪烁3次，该特效将有30秒的内置延迟，或随你希望你的道具保持在原地多长时间。最后，添加一个移除特效，它会在指定的时间后自动从游戏树中移除物品（你可能想在透明特效结束后计时）。

正如你所看到的，通过一些简单的特效，我们把一个简单的无生命的精灵图变成了一个更有趣的物品。更重要的是，它没有导致代码复杂性的增加： 特效，一旦添加，将自动工作，然后自动在游戏树完成时删除。


## 概述

特效的作用是随着时间的推移对某个组件的属性进行改变。为了实现这一点，Effect 必须知道属性的初始值、最终值以及随着时间的推移应该如何进行。初始值通常由特效自动确定，最终值显式由用户提供，随时间推移的级数由 `EffectControllers `处理。

Flame 提供了多种特效，您也可以创建自己的特效。 Flame包括以下特效：

- [`MoveByEffect`](#movebyeffect)
- [`MoveToEffect`](#movetoeffect)
- [`MoveAlongPathEffect`](#movealongpatheffect)
- [`RotateEffect.by`](#rotateeffectby)
- [`RotateEffect.to`](#rotateeffectto)
- [`ScaleEffect.by`](#scaleeffectby)
- [`ScaleEffect.to`](#scaleeffectto)
- [`SizeEffect.by`](#sizeeffectby)
- [`SizeEffect.to`](#sizeeffectto)
- [`AnchorByEffect`](#anchorbyeffect)
- [`AnchorToEffect`](#anchortoeffect)
- [`OpacityEffect`](#opacityeffect)
- [`ColorEffect`](#coloreffect)
- [`SequenceEffect`](#sequenceeffect)
- [`RemoveEffect`](#removeeffect)

`EffectController`是一个描述特效如何随时间变化的对象。如果你认为特效的初始值是0%进度，而最终值是100%进度，那么特效控制器的工作就是从物理时间(以秒为单位)映射到逻辑时间(从0到1变化)。

框架还提供了多种特效控制器：
- [`EffectController`](#effectcontroller)
- [`LinearEffectController`](#lineareffectcontroller)
- [`ReverseLinearEffectController`](#reverselineareffectcontroller)
- [`CurvedEffectController`](#curvedeffectcontroller)
- [`ReverseCurvedEffectController`](#reversecurvedeffectcontroller)
- [`PauseEffectController`](#pauseeffectcontroller)
- [`RepeatedEffectController`](#repeatedeffectcontroller)
- [`InfiniteEffectController`](#infiniteeffectcontroller)
- [`SequenceEffectController`](#sequenceeffectcontroller)
- [`SpeedEffectController`](#speedeffectcontroller)
- [`DelayedEffectController`](#delayedeffectcontroller)
- [`NoiseEffectController`](#noiseeffectcontroller)
- [`RandomEffectController`](#randomeffectcontroller)
- [`SineEffectController`](#sineeffectcontroller)
- [`ZigzagEffectController`](#zigzageffectcontroller)


## 内置特效

### Effect

基类 `Effect `不能单独使用（它是抽象的），但它提供了一些由所有其他特效继承的通用功能。 这包括：

  - 使用 `effect.pause()`和 `effect.resume()`可以用来暂停和恢复特效。可以使用 `effect.is`暂停检查当前是否暂停了特效。
    
  - 使用 `effect.reverse()`逆转特效的时间方向。使用 `effect.isreverse` 检查当前特效是否正在逆转。
    
  - 属性` removeOnFinish`（默认为 true）将导致特效组件从游戏树中移除并在特效完成后进行垃圾回收。 如果您打算在特效完成后重用特效，请将其设置为 false。
    
  - 可选的用户提供的 `onFinishCallback`，当特效刚刚完成执行，但在从游戏中删除之前，它将被调用。
    
  - `reset()`方法将特效还原到初始状态，允许它再次运行。


### MoveByEffect

这个特效应用于`PositionComponent`，并将其移动到规定的偏移量。这一偏移量与目标的当前位置有关：

```dart
final effect = MoveByEffect(Vector2(0, -10), EffectController(duration: 0.5));
```

如果组件当前位于 `Vector2(250,200)` ，那么在特效结束时它的位置将是 `Vector2(250,190)`。

多个移动特效可以同时应用到一个组件。结果将是所有个体效应的叠加。


### MoveToEffect

此特效以直线将 `PositionComponent `从其当前位置移动到指定的目标点。

```dart
final effect = MoveToEffect(Vector2(100, 500), EffectController(duration: 3));
```

可以在同一个组件上附加多个这样的特效，但不建议这样做。


### MoveAlongPathEffect

这个特效会将一个`PositionComponent`沿着指定的路径相对于该组件的当前位置移动。路径可以是非线性的段，但必须单独连接。建议从Vector2.zero()开始一个路径，以避免组件位置的突然跳转。

```dart
final effect = MoveAlongPathEffect(
  Path()..quadraticBezierTo(100, 0, 50, -50),
  EffectController(duration: 1.5),
);
```

可选标志 `absolute: true` 将在特效中声明路径为绝对路径。 也就是说，目标将在开始时“跳”到路径的开头，然后沿着该路径走，就好像它是在画布上绘制的曲线一样。

另一个标志 `oriented: true` 指示目标不只是沿着曲线移动，同时也会在每个点上沿曲线的方向旋转。有了这个标志，这个特效同时变成了移动和旋转。


### RotateEffect.by

以相对于当前方向的指定角度顺时针旋转目标。 角度以弧度为单位。 例如，以下特效将顺时针旋转目标 90º（=[tau][tau]/4 弧度）：

```dart
final effect = RotateEffect.by(tau/4, EffectController(duration: 2));
```


### RotateEffect.to

将目标顺时针旋转到指定角度。 例如，以下将旋转目标向东看（0º 是北，90º=tau/4 东，180º=tau/2 南，270º=tau*3/4 西）：

```dart
final effect = RotateEffect.to(tau/4, EffectController(duration: 2));
```


### ScaleEffect.by

此特效将按指定量改变目标的比例。 例如，这将导致组件增长 50% 大：

```dart
final effect = ScaleEffect.by(Vector2.all(1.5), EffectController(duration: 0.3));
```


### ScaleEffect.to

此特效类似于 `ScaleEffect.by`，但设置的是目标比例的绝对值：

```dart
final effect = ScaleEffect.to(Vector2.zero(), EffectController(duration: 0.5));
```


### SizeEffect.by

此特效将更改目标组件的大小，相对于其当前大小。 例如，如果目标的大小为` Vector2(100, 100)`，则在应用以下特效并运行其过程后，新大小将为 `Vector2(120, 50)`：

```dart
final effect = SizeEffect.by(Vector2(20, -50), EffectController(duration: 1));
```

`PositionComponent`的大小不能为负。如果一个特效试图将大小设置为负值，那么大小变为0。

请注意，要使这种特效发挥作用，目标组件在呈现时必须考虑其自身的大小，而不是所有组件都这样做。

此外，更改组件的大小不会传播到其子组件（如果有的话）。 `SizeEffect` 的替代方案是 `ScaleEffect`，它的工作范围更广，也可以扩展子元素。


### SizeEffect.to

将目标组件的大小更改为指定的大小。目标大小不能为负：

```dart
final effect = SizeEffect.to(Vector2(120, 120), EffectController(duration: 1));
```


### AnchorByEffect

用指定的偏移量更改目标锚点的位置。这个特效也可以使用`AnchorEffect.by()`来创建：

```dart
final effect = AnchorByEffect(Vector2(0.1, 0.1), EffectController(speed: 1));
```


### AnchorToEffect

改变目标锚点的位置。这个特效也可以使用`AnchorEffect.to()`来创建：

```dart
final effect = AnchorToEffect(Anchor.center, EffectController(speed: 1));
```

### OpacityEffect

此特效将随着时间的推移将目标的不透明度更改为指定的 alpha 值。 目前，此特效只能应用于具有 `HasPaint `mixin 的组件。 如果目标组件使用多个绘制，则特效可以使用 `paintId `参数定位任何单独的颜色。

```dart
final effect = OpacityEffect.to(0.5, EffectController(duration: 0.75));
```

opacity 值为 0 对应一个完全透明的组件， opacity 值为 1 是完全不透明的。 便利构造函数 `OpacityEffect.fadeOut() `和 `OpacityEffect.fadeIn()` 将分别将目标设置为完全透明/完全可见。


### SequenceEffect

这个特效可以用来一个接一个地运行多个其他特效。组成特效可能有不同的类型。

序列特效也可以是交替的（序列会先前进，再后退）；也可以重复某个预定的次数，或无限次。

```dart
final effect = SequenceEffect([
  ScaleEffect.by(1.5, EffectController(duration: 0.2, alternate: true)),
  MoveEffect.by(Vector2(30, -50), EffectController(duration: 0.5)),
  OpacityEffect.to(0, EffectController(duration: 0.3)),
  RemoveEffect(),
]);
```


### RemoveEffect

这是一个简单的特效，可以附加到组件上，使其在指定的延迟过后从游戏树中删除：

```dart
final effect = RemoveEffect(delay: 10.0);
```


## ColorEffect

此特效将更改绘制的基础颜色，导致渲染的组件在提供的范围内被提供的颜色着色。

使用示例：

```dart
final effect = ColorEffect(
  const Color(0xFF00FF00),
  const Offset(0.0, 0.8),
  EffectController(duration: 1.5),
);
```

`Offset `参数将确定将应用到组件的颜色的“多少”，在此示例中，特效将从 0% 开始，最高可达 80%。

__注意:__ 由于这个特效的实现，以及 Flutter 中 `ColorFilter `类的工作，所以这个特效不能和其他 `ColorEffects `混合使用，当组件中添加多个时，只有最后一个才会生效。


## 创建新的特效

尽管Flame提供了广泛的内置特效，但最终你可能会发现它们还不够。幸运的是，创建新的特效非常简单。

每个特效都扩展了基本的`Effect`类，可能是通过一个更专业的抽象子类，例如 `ComponentEffect<T>` 或 `Transform2DEffect`。

`Effect `类的构造函数需要一个 `EffectController `实例作为参数。在大多数情况下，您可能希望从自己的构造函数中传递该控制器。幸运的是，特效控制器封装了特效实现的大部分复杂性，因此您不必担心重新创建该功能。

最后，您需要实现一个单一的方法 `apply(double progress) `，这个方法将在特效是活跃的时候每次更新时刻时被调用。在这个方法中，应该对特效的目标进行更改。

此外，如果在特效开始或结束时必须执行一些操作，您可能希望实现回调 `onStart()` 和 `onFinish()`。

在实现 `apply()` 方法时，我们建议仅使用相对更新。 也就是说，通过递增/递减其当前值来更改目标属性，而不是直接将该属性设置为固定值。 这样，多个特效将能够作用于同一组件而不会相互干扰。

## 特效控制器

### EffectController

基类`EffectController`提供了一个工厂构造函数，能够创建各种公共控制器。构造函数的语法如下：

```dart
EffectController({
    required double duration,
    Curve curve = Curves.linear,
    double? reverseDuration,
    Curve? reverseCurve,
    bool alternate = false,
    double atMaxDuration = 0.0,
    double atMinDuration = 0.0,
    int? repeatCount,
    bool infinite = false,
    double startDelay = 0.0,
});
```

- **`duration`**：影响的主要部分的长度，即从0% 到100% 需要多长时间。此参数不能为负，但可以为零。如果这是唯一指定的参数，那么特效将在持续时间秒内线性增长。
  
- **`curve`**：如果给定，则根据提供的[曲线](https://api.flutter.dev/flutter/animation/Curves-class.html)创建从 0 增长到 100% 的非线性特效。
  
- **`reverseDuration`**： 如果提供，则向控制器添加一个额外的步骤：特效在 `duration `秒内从 0 增长到 100% 后，它会在 `reverseDuration `秒内从 100% 倒退到 0。 此外，特效将在进度 0 处完成（通常特效在进度 1 处完成）。
  
- **`reverseCurve`**：在特效的“反向”步骤中使用的曲线。 如果没有给出，这将默认为 `curve.flipped`。
  
- **`alternate`**：将此设置为`true`等同于指定与持续时间相等的`reverseDuration`。如果已经设置了`reverseDuration`，则此标志无效。
  
- **`atMaxDuration`**：如果非零，这将在特效达到最大进度后和反向阶段之前插入一个暂停。在此期间，特效保持100%的进展。如果没有反向阶段，那么这将只是在特效被标记为完成之前的暂停。
  
- **`atMinDuration`**：如果非零，则在反向阶段结束时达到其最低进度 (0) 后插入暂停。 在此期间，特效的进度为 0%。 如果没有反向阶段，则此暂停仍将插入到“最大”暂停（如果存在）之后，否则将插入到正向阶段之后。 此外，特效现在将在进度级别为 0 时完成。
  
- **`repeatCount`**：如果大于1，就会使特效重复规定的次数。每次迭代将由前向阶段、最大暂停阶段、反向阶段和最小暂停阶段组成（跳过未指定的阶段）。
  
- **`infinite`**：如果是`true`，这种特效将无限重复，永远不会完成。这相当于将`repeatCount`设置为无穷大。
  
- **`startDelay`**：在特效开始之前插入额外的等待时间。 这个等待时间只执行一次，即使特效是重复的。 在此期间，特效的 `.started` 属性返回 `false`。 特效的 `onStart()` 回调将在此等待期结束时执行。
  
  使用这个参数是创建一个接一个(或有重叠)执行的特效链的最简单方法。

这个工厂构造函数返回的特效控制器将由下面进一步描述的多个更简单的特效控制器组成。如果这个构造函数对您的需求太有限，那么您总可以从相同的构建块创建自己的组合。

除了工厂构造函数之外，`EffectController `类还定义了许多通用于所有特效控制器的属性。这些属性是：

- `.started`：如果特效已经开始，则为 `true`。 对于大多数特效控制器，此属性始终为真。 唯一的例外是 `DelayedEffectController `在特效处于等待阶段时返回 `false`。
  
- `.completed`：当特效控制器完成执行时变为`true`。

- `.progress`：特效控制器的当前值，取值为0 ~ 1的浮点值。该变量是特效控制器的主要输出值。
  
- `.duration`：特效的总持续时间，如果持续时间无法确定，则为null（例如，持续时间是随机的或无限的）。


### LinearEffectController

这是最简单的特效控制器，在指定的持续时间内从0线性增长到1：

```dart
final ec = LinearEffectController(3);
```


### ReverseLinearEffectController

类似于 `LinearEffectController`，但是它在相反的方向，并且在指定的持续时间内从 1 线性增长到 0：

```dart
final ec = ReverseLinearEffectController(1);
```


### CurvedEffectController

该特效控制器在指定的持续时间内从 0 非线性增长到 1，并遵循提供的曲线：

```dart
final ec = CurvedEffectController(0.5, Curves.easeOut);
```


### ReverseCurvedEffectController

类似于 `CurvedEffectController`，但是控制器按照提供的曲线从1增长到0：

```dart
final ec = ReverseCurvedEffectController(0.5, Curves.bounceInOut);
```


### PauseEffectController

此特效控制器在指定的时间段内将进度保持在一个常量值上。通常情况下，进度可能是 0 或 1：

```dart
final ec = PauseEffectController(1.5, progress: 0);
```


### RepeatedEffectController

这是一个复合特效控制器。它将另一个特效控制器作为一个子控制器，并重复多次，在每个下一个周期开始之前重置。

```dart
final ec = RepeatedEffectController(LinearEffectController(1), 10);
```

子特效控制器不能是无限的。如果子元素是随机的，那么它将在每次迭代中用新的随机值重新初始化。


### InfiniteEffectController

类似于 RepeatedEffectController，但是无限重复其子控制器。

```dart
final ec = InfiniteEffectController(LinearEffectController(1));
```


### SequenceEffectController

依次执行一系列特效控制器。控制器列表不能为空。

```dart
final ec = SequenceEffectController([
  LinearEffectController(1),
  PauseEffectController(0.2),
  ReverseLinearEffectController(1),
]);
```


### SpeedEffectController

更改子特效控制器的持续时间，使特效以预定义的速度进行。子控制器`EffectController`的初始持续时间是不相关的。子控制器必须是`DurationEffectController`的子类。

`SpeedEffectController`只能应用于定义了速度概念的特效。这些特效必须实现`MeasurableEffect`接口。例如，以下特效符合条件：[MoveByEffect](#movebyeffect), [MoveToEffect](#movetoeffect),[MoveAlongPathEffect](#movealongpatheffect), [RotateEffect.by](#rotateeffectby),[RotateEffect.to](#rotateeffectto).

参数`speed`以秒为单位，其中“单位”的概念取决于目标特效。 例如，对于移动特效，它们指的是行进的距离； 对于旋转特效，单位是弧度。

```dart
final ec1 = SpeedEffectController(LinearEffectController(0), speed: 1);
final ec2 = EffectController(speed: 1); // same as ec1
```


### DelayedEffectController

在规定的`delay`后执行子控制器的特效控制器。当控制器执行“延迟”阶段时，特效将被视为“未启动”，即其 `.started` 属性将返回 `false`。

```dart
final ec = DelayedEffectController(LinearEffectController(1), delay: 5);
```


### NoiseEffectController

这种效应控制器表现出噪声行为，即它在最低点附近随机振荡。这样的特效控制器可用于实现多种震动特效。

```dart
final ec = NoiseEffectController(duration: 0.6, frequency: 10);
```


### RandomEffectController

该控制器包装另一个控制器并使其持续时间随机。 持续时间的实际值在每次重置时重新生成，这使得这个控制器在重复上下文(如 [RepeatedEffectController](#repeatedeffectcontroller)或 [InfiniteEffectController](#infiniteeffectcontroller))中特别有用。

```dart
final ec = RandomEffectController.uniform(
  LinearEffectController(0),  // duration here is irrelevant
  min: 0.5,
  max: 1.5,
);
```

用户能够控制使用哪个随机源，以及产生的随机持续时间的精确分布。包括 `.uniform` 和 `.exponential`两种，任何其他都可以由用户实现。

### SineEffectController

表示正弦函数单个周期的特效控制器。利用这个来创造自然的谐波振荡。由`SineEffectControllers`控制的两个垂直移动特效具有不同的周期，将创建一个[Lissajous曲线](https://en.wikipedia.org/wiki/Lissajous_curve)。

```dart
final ec = SineEffectController(period: 1);
```

### ZigzagEffectController

简单的交替特效控制器。在`period`内，这个控制器会线性地从0到1，然后到-1，然后回到0。使用这个振荡特效，起始位置应该是振荡的中心，而不是极值（由标准的交替`EffectController`提供）。

```dart
final ec = ZigzagEffectController(period: 2);
```


## 参考

* [Examples of various effects](https://examples.flame-engine.org/#/).


[tau]: https://en.wikipedia.org/wiki/Tau_(mathematical_constant)
