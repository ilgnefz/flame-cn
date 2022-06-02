---
prev:
  text: Oxygen
  link: /guide/other_modules/oxygen.md
next:
  text: 闪屏页
  link: /guide/other_modules/splash_screen.md
---



# Tiled

[Tiled](https://www.mapeditor.org/)是设计关卡和地图的绝佳工具。

Flame 提供了一个包[flame_tiled](https://github.com/flame-engine/flame_tiled)，它捆绑了一个 dart 包，允许您解析 tmx (xml) 文件并访问其中的图块、对象和所有内容。

Flame还提供了一个简单的 `Tile` 类和它的组件包装器 `TiledComponent`，用于地图渲染，它在屏幕上渲染tile并支持旋转和翻转。

最简单的方法是，通过调用以下命令可以从 Tilemap 中检索图层：

```
getLayer<ObjectGroup>("myObjectGroupLayer");
getLayer<ImageLayer>("myImageLayer");
getLayer<TileLayer>("myTileLayer");
getLayer<Group>("myGroupLayer");
```

这些方法要么返回请求的图层类型，要么返回不存在的 null。

尚不支持其他高级功能，但您可以轻松读取 tmx 的对象和其他功能并添加自定义行为（例如触发器和行走区域的区域，自定义动画对象）。

您可以在[这里](https://github.com/flame-engine/flame_tiled/tree/main/example)查看一个工作示例。
