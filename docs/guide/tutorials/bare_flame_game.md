---
prev:
  text: 教程
  link: /guide/tutorials/tutorials.md
next:
  text: Klondike
  link: /guide/tutorials/klondike/klondike.md
---

# 空白的Flame游戏

本教程假设您的计算机上已经安装了 [Flutter](https://docs.flutter.dev/get-started/install)、[git](https://git-scm.com/downloads) 和 [Android Studio](https://developer.android.com/studio)（所有这些程序都是免费的）； 并且您对使用命令行有基本的了解。 Android Studio 不是严格要求，您也可以使用其他 IDE，例如 [Visual Studio Code](https://code.visualstudio.com/download)。


## 1. 检查Flutter安装

首先，让我们验证一下您的 Flutter SDK 是否正确安装，是否可以从命令行访问：

```console
$ flutter doctor
[✓] Flutter (Channel stable, 2.8.0, on macOS 12.2 21D49 darwin-x64, locale en)
[✓] Android toolchain - develop for Android devices (Android SDK version 31.0.0)
[✓] Xcode - develop for iOS and macOS (Xcode 13.1)
[✓] Chrome - develop for the web
[✓] Android Studio (version 2020.3)
[✓] Connected device (1 available)
```

您的输出可能会略有不同，但重要的是要验证没有报错，并且您的 Flutter 版本是 **2.5.0** 或以上。


## 2. 创建项目目录

现在您需要为您的项目起一个名称。 名称只能使用小写拉丁字母、数字和下划线。 它还必须是有效的 Dart 标识符（例如，它不能是关键字）。

在本教程中，我将把我的项目命名为 **syzygy**，这是一个完全真实的非虚构词。
为您的新项目创建目录：

```console
$ mkdir -p ~/projects/syzygy
$ cd ~/projects/syzygy
```


## 3. 初始化空的Flutter项目

为了将这个荒芜的目录变成一个实际的 Flutter 项目，运行以下命令：

```console
$ flutter create .
```
（为了简洁起见，我省略了输出，但是将会有大量的输出）。

您可以验证项目文件是否已成功创建：
```console
$ ls
README.md               android/   lib/           pubspec.yaml   test/
analysis_options.yaml   ios/       pubspec.lock   syzygy.iml     web/
```


## 4. 在Android Studio中打开项目

启动 Android Studio，然后在项目选择窗口中选择 `[Open]` 并导航到您的项目目录。如果运气好的话，这个项目现在看起来是这样的：

![](/images/tutorials/android-studio-screenshot-1.webp)

如果您只看到 `main.dart` 文件而没有看到侧面板，那么单击窗口左边缘的垂直 `[Project]` 按钮。

在我们继续之前，让我们修复左侧面板中的视图。 在屏幕截图中找到左上角显示 [Android] 的按钮。 在此下拉列表中选择第一个选项“Project”。 您的项目窗口现在应该如下所示：

![](/images/tutorials/android-studio-screenshot-2.webp)

重要的是，您应该能够看到项目目录中的所有文件。


## 5. 清理项目文件

Flutter 创建的默认项目对于制作 Flame 游戏不是很有用，所以我们应该去掉它。

首先，打开文件 `pubspec.yaml`，并用以下代码替换它（调整名称和描述以匹配项目）:

```yaml
name: syzygy
description: Syzygy flame game
version: 0.0.0
publish_to: none

environment:
  sdk: ^2.15.0

dependencies:
  flutter:
    sdk: flutter
  flame: ^1.0.0
```

之后，按窗口顶部的`[Pub get]`按钮； 或者，您也可以从终端运行命令 `flutter pub get`。 这会将 `pubspec` 文件中的更改“应用”到您的项目，特别是它将下载我们已声明为依赖项的 Flame 库。 将来，每当您对此文件进行更改时，都应该运行 `flutter pub get`。

现在，打开文件` lib/main.dart`，用下面的代码替换它的内容：

```dart
import 'package:flame/game.dart';
import 'package:flutter/widgets.dart';

void main() {
  final game = FlameGame();
  runApp(GameWidget(game: game));
}
```

最后，完全删除 `test/widget _ test. dart` 文件。


## 6. 运行项目

让我们验证一下，一切都按预期工作，项目可以运行了。

在窗口顶部的菜单栏中找到一个下拉菜单，上面写着: `< no device selected >` 。在下拉菜单中选择 `< Chrome (web) >` 。

之后打开 `main.dart` 文件并按第 4 行中 `void main()` 函数旁边的绿色箭头。从菜单中选择 `[Run main.dart]`。

这将打开一个新的 Chrome 窗口(可能需要10-30秒) ，并在该窗口中运行您的项目。现在它只会显示一个黑屏，这是意料之中的，因为我们以最简单的空白配置创建了游戏。


## 7. 同步到GitHub

最后一步是将您的项目上传到 GitHub。 这不是必需的，但强烈推荐，因为它将作为您代码的备份。 此步骤假设您已经有一个 GitHub 帐户。

登录您的 GitHub 帐户，从您的个人资料下拉列表中选择 `[Your repositories]`，然后按绿色的 `[New]` 按钮。 在表单中输入与您的项目名称相同的存储库名称； 选择类型“private”； 并选择不添加初始文件，如 README、license 和 gitignore。

现在转到终端中项目的目录并执行以下命令（确保用刚才创建的存储库链接替换 URL） ：

```console
$ git init
$ git add --all
$ git commit -m 'Initial commit'
$ git remote add origin https://github.com/your-github-username/syzygy.git
$ git branch -M main
$ git push -u origin main
```

现在，如果您转到 GitHub 上的存储库页面，您将看到所有的项目文件都在那里。


## 8. 完成

就是这样！现在您已经掌握了这些点：
  - 创建一个初始空白状态的 Flame 项目
  - 为该项目设置 Android Studio IDE
  - 为这个项目创建一个 GitHub 仓库

编程愉快！
