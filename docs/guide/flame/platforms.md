---
prev:
  text: 组件
  link: /guide/flame/components.md
next:
  text: 碰撞检测
  link: /guide/flame/collision-detection.md
---

# 支持的平台

因为Flame是基于Flutter的，所以Flame支持的平台取决于Flutter支持的平台。

目前，Flame同时支持移动端和Web端。

## Flutter通道

Flame保持它在Flutter稳定通道的支持。开发、测试和主通道应该可以工作，但我们不支持。这意味着发生在稳定通道之外的问题不是优先考虑的问题。

## Flame网页端

要在 web 上使用 Flame，您需要确保您的游戏使用 CanvasKit/Skia 渲染器。 这将提高它在 Web 上的性能，因为它是使用 canvas 元素而不是单独的 DOM 元素。

要使用skia运行您的游戏，用下面的命令：
```console
$ flutter run -d chrome --web-renderer canvaskit
```

要构建用于生产的游戏，使用 skia，请使用以下命令：
```console
$ flutter build web --release --web-renderer canvaskit
```

## 部署您的游戏到Github Pages

一个简单的在线部署游戏的方法是使用 [GitHub Pages](https://pages.github.com/)。这是 GitHub 的一个很酷的功能，通过它您可以很容易地从您的仓库中托管 web 内容。在这里，我们将讲解使用 GitHub 页面托管游戏的最简单方法。首先，让我们在部署文件的位置创建一个分支:

```bash
git checkout -b gh-pages
```

这个分支可以从 `main` 或任何其他地方创建，这没有太大关系。您推送那个分支后，返回您的主分支。

现在您应该将 [flutter-gh-pages](https://github.com/bluefireteam/flutter-gh-pages) 动作添加到存储库中，您可以通过在文件夹 `.github/workflows` 下创建文件 `gh-pages.yaml` 来做到这一点。

```yaml
name: Gh-Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v1
      - uses: bluefireteam/flutter-gh-pages@v7
        with:
          baseHref: /NAME_OF_YOUR_REPOSITORY/
          webRenderer: canvaskit
```

请务必将 `NAME_OF_YOUR_REPOSITORY` 更改为您的 GitHub 存储库的名称。

现在，每当您将某些内容推送到主分支时，该操作都会运行并更新您部署的游戏。

游戏应该在这样的 URL 上可用：`https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/`

### Web支持

在网络上使用 Flame 时，某些方法可能不起作用。 例如 `Flame.device.setOrientation` 和
`Flame.device.fullScreen`在 web 上不起作用，它们可以被调用，但不会发生任何事情。

另一个例子：使用`flame_audio`包预缓存音频也不起作用，因为Audioplayers在Web端不支持。 这可以通过使用 `http` 包并请求获取音频文件来解决，这将使浏览器缓存文件产生与移动设备相同的效果。

如果您想在Web平台创建 `ui.Image` 的实例，您可以使用我们的 `Flame.images.decodeImageFromPixels` 方法。 这包装了 ui 库中的 `decodeImageFromPixels`，支持 Web 平台。 如果 `runAsWeb` 参数设置为 `true`（默认设置为 `kIsWeb`），它将使用内部图像方法解码图像。 当 `runAsWeb` 为 `false` 时，它将使用 `decodeImageFromPixels`，目前 Web端不支持。
