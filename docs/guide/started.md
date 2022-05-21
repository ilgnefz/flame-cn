---
next:
  text: Flame
  link: /guide/flame/file-structure.md
---

# 开始使用

## 关于

Flame是一个模块化的Flutter游戏引擎，为游戏提供了一套完整的解决方案。它使用了Flutter提供的强大基础设施，但简化了构建项目所需的代码。

它为您提供了一个简单而有效的游戏循环实现，以及游戏中可能需要的必要功能。例如：输入、图像、精灵图、精灵表、动画、碰撞检测和一个组件系统，我们称之为Flame Component System（简称FCS）。

我们还提供了扩展Flame功能的独立包：

- [flame_audio](https://pub.dev/packages/flame_audio)：使用AudioPlayers软件包提供音频功能
- [flame_forge2d](https://pub.dev/packages/flame_forge2d)：使用我们自己的Box2D端口Forge2D提供物理功能
- [flame_tiled](https://pub.dev/packages/flame_tiled)：整合了[tiled](https://pub.dev/packages/tiled)包

您可以选择任何您需要的部分，因为它们都是独立的和模块化的。

目前社区正在不断完善引擎及其生态系统，因此请不要害羞，随时提出您的问题、PRs和建议。

如果您想提高引擎的曝光率和发展社区，请给我们一个star😄。

## 安装

通过在pubspec.yaml中放入以下内容，将pub包作为您的依赖项：

```yaml
dependencies:
  flame: 1.1.1
```

可以在[pub.dev](https://pub.dev/packages/flame/install)上找到最新版本，然后运行`pub get`，就可以开始使用它了

## 入门

[教程](https://github.com/flame-engine/flame/tree/main/tutorials)文件夹中有一组教程，您可以按照它们开始学习。所有特性的简单示例都可以在[示例](https://github.com/flame-engine/flame/tree/main/examples)文件夹中找到。你也可以查看[awesome-flame](https://github.com/flame-engine/awesome-flame#articles--tutorials)库，它包含了社区编写的大量优秀教程和文章，帮助您上手使用Flame。

## 其他

游戏有时需要复杂的功能集，具体取决于游戏的内容。其中一些功能集超出了Flame引擎生态系统的范围，在本节中，您可以获得关于使用的软件包或服务的一些建议：

### 多人游戏（网络编程）

Flame没有捆绑任何网络功能，如果您需要编写在线多人游戏，这里有一些软件包或服务的建议：

- [Nakama](https://github.com/Allan-Nava/nakama-flutter)：Nakama是一款开源服务器，用于支持现代游戏和应用程序
- [Firebase](https://firebase.google.com/)：提供数十种服务，可用于编写更简单的多人游戏体验

### 外部资源

Flame不捆绑任何助手来加载来自外部资源(外部存储或在线资源)的资产。但大多数的Flame的API可以从具体的资产实例加载。例如，精灵图可以从dart:ui的Image实例中创建，所以用户可以编写自定义代码从任何他们需要的地方加载图像，然后加载到Flame的类中。

下面是一些关于http客户端包的建议：

- [http](https://pub.dev/packages/http)：一个用于执行HTTP请求的简单软件包
- [Dio](https://pub.dev/packages/dio)：用于执行http请求的流行而强大的包
