---
prev:
  text: 平台
  link: /guide/flame/platforms.md
next:
  text: 特效
  link: /guide/flame/effects.md
---

# 碰撞检测

大多数游戏都需要碰撞检测来检测两个相互交叉的组件并对其采取行动。例如，用箭击中敌人或玩家捡起硬币。

在大多数碰撞侦测系统中，您使用一种叫做命中框的东西来创建更精确的组件包围盒。在 Flame 中，hitboxes 是组件的区域，可以对碰撞作出反应（和[输入手势](inputs/gesture-input.md#gesturehitboxes)） ，从而更加精确。

碰撞检测系统支持三种不同类型的形状，您可以从中构建碰撞盒，这些形状是多边形、矩形和圆形。可以将多个命中框添加到组件以形成可用于检测碰撞或是否包含点的区域，后者对于精准的手势检测非常有用。碰撞检测不会处理当两个碰撞盒碰撞时应该发生的事情，所以当两个`PositionComponent`有交叉碰撞盒时，将会发生什么是由用户来实现的。

要注意的是，内置的碰撞检测系统并没有考虑到两个碰撞盒之间的冲突，这可能发生在它们移动非常快或更新调用的时间较长（例如，如果您的应用程序不在前台）。如果您想了解更多，这种行为被称为"管窥"。

还需要注意的是，碰撞检测系统具有一定的局限性，如果您创建的碰撞盒祖先拥有翻转或缩放，它将不会正常工作。


## Mixins

### HasCollisionDetection

如果您想在游戏中使用碰撞侦测，您必须在游戏中添加 `HasCollisionDetection` 混合模块，这样它就可以跟踪可能发生冲突的组件。

例如：

```dart
class MyGame extends FlameGame with HasCollisionDetection {
  // ...
}
```

现在当您将`ShapeHitboxes`添加到组件中并添加到游戏中时，它将会自动检测碰撞。


### CollisionCallbacks

为了对冲突做出反应，您应该将 `CollisionCallbacks` 通过 mixin 添加到您的组件中。
例如：

```dart
class MyCollidable extends PositionComponent with CollisionCallbacks {
  @override
  void onCollision(Set<Vector2> points, PositionComponent other) {
    if (other is ScreenHitbox) {
      //...
    } else if (other is YourOtherComponent) {
      //...
    }
  }

  @override
  void onCollisionEnd(PositionComponent other) {
    if (other is ScreenHitbox) {
      //...
    } else if (other is YourOtherComponent) {
      //...
    }
  }
}
```

在这个例子中，我们使用 Dart 的 `is` 关键字来检查我们碰撞的是什么类型的组件。这些点的集合是两个命中框的边相交的地方。

请注意，如果两个 `PositionComponents `都实现了 `onCollision `方法，那么 `onCollision `方法将在这两个组件上调用，并且在两个命中框上也将调用。 `onCollisionStart `和 `onCollisionEnd `方法也是如此，它们在两个组件和碰撞盒开始或停止相互碰撞时调用。

当一个`PositionComponent`（和碰撞盒）开始与另一个`PositionComponent`碰撞时，`onCollisionStart`和`onCollision`都会被调用，所以如果您不需要在碰撞开始时做特定的事情，您只需要覆盖`onCollision`，反之亦然。

如果您想检查与屏幕边缘的碰撞，就像我们在上面的例子中做的那样，您可以使用预定义的[ScreenHitbox](#screenhitbox)类。


## ShapeHitbox

shapehitboxes是普通组件，所以您可以像添加其他组件一样将它们添加到您想要添加碰撞盒的组件中：

```dart
class MyComponent extends PositionComponent {
  Future<void> onLoad() async {
    add(RectangleHitbox());
  }
}
```

如果您不向碰撞盒添加任何参数（如上所示），那么碰撞盒将尽可能地填充它的父项。 除了让碰撞盒尝试填充它们的父函数之外，还有两种方法来启动碰撞盒，在普通构造函数中，您可以自己定义 碰撞盒，包括大小和位置等等。另一种方法是使用相对构造函数，该构造函数根据希望的父函数的大小定义碰撞盒。

您可以在[ShapeComponents](components.md#shapecomponents)部分了解如何定义不同的形状。

请记住，您可以向 `PositionComponent `添加任意数量的 `ShapeHitbox`，以组成更复杂的区域。 例如，一个带帽子的雪人可以用三个 `CircleHitbox` 和两个 `RectangleHitbox `作为它的帽子来表示。

一个 hitbox 既可以用于碰撞侦测，也可以用于在组件上使手势检测更加精确，更多关于后者的信息请参见[GestureHitboxes](inputs/gesture-input.md#gesturehitboxes)一节。

### CollisionType

碰撞盒有一个名为`collisionType`的字段，它定义一个碰撞盒何时应该与另一个碰撞。通常，您希望为 `CollisionType.passive` 设置尽可能多的命中框，以提高碰撞检测的性能。 默认情况下，`CollisionType `是`active`。

`CollisionType`枚举包含以下值：

- `active` ：与主动或被动类型的其他 `Collidables `碰撞
- `passive` ：与 `active `类型的其他 `Collidable `碰撞
- `inactive` ：不会与任何其他 `Collidables `发生碰撞

因此，如果您有不需要检查相互碰撞的碰撞盒，您可以通过设置 `collisionType = CollisionType.passive` 将它们标记为被动。例如，这可能是地面组件，或者您的敌人可能不需要检查彼此之间的碰撞，那么他们都可以被标记为`passive`。

想象一下这样一个游戏，有很多子弹，它们不能互相碰撞，飞向玩家，然后玩家被设置为`CollisionType.active`，子弹设置为`CollisionType.passive`。

然后我们有`inactive`，它根本不会在碰撞检测中被检查。这可以用于例如，如果您有组件在屏幕外，您现在不关心，但可能会在稍后回来查看，因此它们不会完全从游戏中删除，则可以使用此方法。

这些只是您如何使用这些类型的示例，它们会有更多的用例，因此即使您的用例未在此处列出，也不要怀疑使用它们。

### PolygonHitbox

需要注意的是，如果您想在多边形上使用碰撞检测或`containpoint`，多边形需要是凸的。所以一定要使用凸多边形，否则如果您不知道自己在做什么，很可能会遇到问题题。还应该注意的是，您应该始终以逆时针的顺序定义多边形中的顶点。

其他碰撞盒形状没有任何强制构造函数，这是因为它们可以有一个默认值，该默认值是根据它们所连接的可碰撞对象的大小计算得出的，但是由于可以在边界内以无数种方式制作多边形盒，您必须在此形状的构造函数中添加定义。

`PolygonHitbox`和[PolygonComponent](components.md#polygoncomponent)有相同的构造函数，请参阅相关文档。

### RectangleHitbox

`RectangleHitbox`与[RectangleComponent](components.md#rectanglecomponent)有相同的构造函数，请参见那一节的相关文档。

### CircleHitbox

CircleHitbox具有与[CircleComponent](components.md#circlecomponent)相同的构造函数，请参阅有关这些的文档部分。


## ScreenHitbox

`ScreenHitbox` 是一个代表视口/屏幕边缘的组件。 如果您将 `ScreenHitbox `添加到游戏中，您的其他带有碰撞盒的组件将在它们与边缘碰撞时收到通知。 它不需要任何参数，它只取决于添加它的游戏的大小。 如果您不希望 `ScreenHitbox `本身在发生碰撞时收到通知，要添加它，您只需在游戏中执行` add(ScreenHitbox())`。 由于 `ScreenHitbox `具有 `CollisionCallbacks `mixin，您可以在需要时将您自己的 `onCollisionCallback`、`onStartCollisionCallback `和 `onEndCollisionCallback `函数添加到该对象。


## CompositeHitbox

在 `CompositeHitbox `中，您可以添加多个碰撞盒，这样它们就可以模拟成为一个连接的碰撞盒。

例如，如果您想形成一顶帽子，您可能希望使用两个 [RectangleHitbox ](#rectanglehitbox)正确地跟随帽子的边缘，然后您可以将这些碰撞盒添加到此类的一个实例中，并对整个帽子的碰撞做出反应，而不是仅仅对每个碰撞盒分别作出反应。


## BroadPhase

通常，您不必担心所使用的`Broad phase`系统，因此，如果标准实现对您来说性能足够好，那么您可以不必阅读本节。

`Broad phase`是碰撞检测的第一步，在此阶段中计算潜在的碰撞。比起直接检查交叉点，计算这些潜在碰撞的成本要低得多，而且它无需检查所有的碰撞框，因此可以避免 o(n2)。`BroadPhase`产生一组潜在的碰撞(一组`CollisionProspects`)，然后这一组被用来检查碰撞盒之间的确切交集，这有时被称为`Narrow-Phase`。

默认情况下，Flame 的碰撞侦测是使用扫描和修剪的`BroadPhase`步骤，如果您的游戏需要其他类型的`BroadPhase`，您可以通过扩展 `BroadPhase `和手动设置应该使用的碰撞侦测系统来编写您自己的`BroadPhase`。

例如，如果您已经实现了一个基于四叉树而不是标准的清除和修剪的大范围相位，那么您可以做以下操作：

```dart
class MyGame extends FlameGame with HasCollisionDetection {
  MyGame() : super() {
    collisionDetection = 
        StandardCollisionDetection(broadphase: QuadTreeBroadphase());
  }
}
```

## 与 Forge2D 的比较

如果您想在游戏中拥有一个完整的物理引擎，我们建议您使用 Forge2D，添加  [flame_forge2d](https://github.com/flame-engine/flame_forge2d)D 作为依赖项。但是如果您有一个更简单的用例，只是想检查组件的冲突和提高手势的准确性，那么 Flame 的内置碰撞侦测将非常适合您。

如果您有以下需求，您至少应该考虑使用[Forge2D](https://github.com/flame-engine/forge2d)：
- 强制现实交互
- 可以与其他物体相互作用的粒子系统
- 身体之间的连接

如果您只需要下面的一些东西，那么只使用Flame碰撞检测系统是一个好主意(因为不使用Forge2D会更简单)：
- 对部分组件碰撞采取行动的能力
- 对与屏幕边界碰撞的组件进行操作的能力
- 复杂的形状可以作为组件的碰撞盒，这样手势就会更准确
- 可以判断组件的哪个部分与某物碰撞的碰撞盒

## 从 v1.0 中的碰撞侦测系统迁移

v1.1 中引入的碰撞检测系统比 v1.0 中的更易于使用，效率更高，但在进行这些改进时，必须进行一些重大更改。

不再有`Collidable`mixin，取而代之的是，当`HasCollisionDetection` mixin被添加到您的游戏中时，您的游戏会自动知道碰撞盒被添加到您的组件中。

为了接收来自冲突的回调，您应该将`CollisionCallbacks` mixin添加到您的组件中，然后覆盖与之前相同的方法。

因为现在的命中盒是组件，所以您可以使用 `add `而不是以前使用的 `addHitbox `将它们添加到组件中。


### 名称更改

 - `ScreenCollidable` -> `ScreenHitbox`
 - `HitboxCircle` -> `CircleHitbox`
 - `HitboxRectangle` -> `RectangleHitbox`
 - `HitboxPolygon` -> `PolygonHitbox`
 - `Collidable` -> `CollisionCallbacks`（仅当您想接收回调时才需要）
 - `HasHitboxes` -> `GestureHitboxes` （仅当您需要用于手势的碰撞盒时才需要）
 - `CollidableType` -> `CollisionType`


## 示例

- <https://examples.flame-engine.org/#/Collision%20Detection_Circles>
- <https://examples.flame-engine.org/#/Collision%20Detection_Multiple%20shapes>
- <https://examples.flame-engine.org/#/Collision%20Detection_Shapes%20without%20components>
- <https://github.com/flame-engine/flame/tree/main/examples/lib/stories/collision_detection>
