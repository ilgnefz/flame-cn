import{_ as e,r as o,o as t,c,a as n,b as p,F as l,d as s,e as i}from"./app.0106d251.js";const d={},u=n("h1",{id:"\u6444\u50CF\u673A\u548C\u89C6\u53E3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6444\u50CF\u673A\u548C\u89C6\u53E3","aria-hidden":"true"},"#"),s(" \u6444\u50CF\u673A\u548C\u89C6\u53E3")],-1),r=s("\u5728 Flutter \u4E0A\u6E32\u67D3\u65F6\uFF0C\u4F7F\u7528\u7684\u5E38\u89C4\u5750\u6807\u7A7A\u95F4\u662F\u903B\u8F91\u50CF\u7D20\u3002 \u56E0\u4E3A"),m={href:"https://api.flutter.dev/flutter/widgets/MediaQueryData/devicePixelRatio.html",target:"_blank",rel:"noopener noreferrer"},k=s("\u8BBE\u5907\u50CF\u7D20\u6BD4"),v=s("\uFF0C\u610F\u5473\u7740 Flutter \u7684\u4E00\u4E2A\u50CF\u7D20\u4E0D\u4E00\u5B9A\u662F\u8BBE\u5907\u4E0A\u7684\u4E00\u4E2A\u771F\u5B9E\u50CF\u7D20\u3002\u5F53\u5B83\u5230\u8FBE Flame \u7EA7\u522B\u65F6\uFF0C\u6211\u4EEC\u603B\u662F\u8003\u8651\u6700\u57FA\u672C\u7684\u7EA7\u522B\u662F\u903B\u8F91\u50CF\u7D20\uFF0C\u56E0\u6B64\u6240\u6709\u4E0E\u8BBE\u5907\u76F8\u5173\u7684\u590D\u6742\u6027\u90FD\u88AB\u62BD\u8C61\u51FA\u6765\u4E86\u3002"),b=i(`<p>\u7136\u800C\uFF0C\u8FD9\u4ECD\u7136\u4F1A\u7ED9\u60A8\u5E26\u6765\u4EFB\u610F\u5F62\u72B6\u548C\u5927\u5C0F\u7684\u5C4F\u5E55\u7684\u95EE\u9898\u3002\u5F88\u53EF\u80FD\u60A8\u7684\u6E38\u620F\u62E5\u6709\u4E00\u4E9B\u5E26\u6709\u5185\u5728\u5750\u6807\u7CFB\u7EDF\u7684\u6E38\u620F\u4E16\u754C\uFF0C\u4E0D\u4F1A\u6620\u5C04\u5230\u5C4F\u5E55\u5750\u6807\u3002Flame \u6DFB\u52A0\u4E86\u4E24\u4E2A\u4E0D\u540C\u7684\u6982\u5FF5\u6765\u5E2E\u52A9\u8F6C\u6362\u5750\u6807\u7A7A\u95F4\u3002\u5BF9\u4E8E\u524D\u8005\uFF0C\u6211\u4EEC\u6709 <code>Viewport </code>\u7C7B\uFF0C\u540E\u7740\uFF0C\u6211\u4EEC\u6709<code>Camera</code>\u7C7B\u3002</p><h2 id="\u89C6\u53E3" tabindex="-1"><a class="header-anchor" href="#\u89C6\u53E3" aria-hidden="true">#</a> \u89C6\u53E3</h2><p><code>Viewport</code>\u8BD5\u56FE\u901A\u8FC7\u8F6C\u6362\u548C\u8C03\u6574\u753B\u5E03\u7684\u5927\u5C0F\uFF0C\u5C06\u591A\u4E2A\u5C4F\u5E55\uFF08\u6216\u8005\u6E38\u620F\u5C0F\u90E8\u4EF6\uFF09\u5927\u5C0F\u7EDF\u4E00\u5230\u6E38\u620F\u7684\u5355\u4E2A\u914D\u7F6E\u4E2D\u3002</p><p><code>Viewport </code>\u63A5\u53E3\u6709\u591A\u4E2A\u5B9E\u73B0\uFF0C\u53EF\u4EE5\u5728\u60A8\u7684\u6E38\u620F\u4E2D\u4ECE\u5934\u5F00\u59CB\u4F7F\u7528\uFF0C\u6216\u8005\uFF0C\u5982\u679C\u60A8\u4F7F\u7528\u7684\u662F <code>FlameGame</code>\uFF0C\u5B83\u5DF2\u7ECF\u5185\u7F6E\u4E86(\u5E26\u6709\u9ED8\u8BA4\u7684\u65E0\u64CD\u4F5C <code>Viewport</code>)\u3002</p><p>\u4EE5\u4E0B\u662F\u53EF\u4F9B\u9009\u62E9\u7684\u89C6\u53E3\uFF08\u6216\u8005\u60A8\u53EF\u4EE5\u81EA\u5DF1\u5B9E\u73B0\u63A5\u53E3\u4EE5\u6EE1\u8DB3\u9700\u6C42\uFF09 \uFF1A</p><ul><li><code>DefaultViewport</code>\uFF1A\u8FD9\u662F\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4E0E\u4EFB\u4F55 <code>FlameGame </code>\u76F8\u5173\u8054\u7684\u65E0\u64CD\u4F5C\u89C6\u53E3\u3002</li><li><code>FixedResolutionViewport</code>\uFF1A\u8FD9\u4E2A\u89C6\u53E3\u4F1A\u8F6C\u6362\u60A8\u7684 <code>Canvas</code>\uFF0C\u4EE5\u4FBF\u4ECE\u6E38\u620F\u7684\u89D2\u5EA6\u6765\u770B\uFF0C\u5C3A\u5BF8\u59CB\u7EC8\u8BBE\u7F6E\u4E3A\u56FA\u5B9A\u7684\u9884\u5B9A\u4E49\u503C\u3002 \u8FD9\u610F\u5473\u7740\u5B83\u5C06\u5C3D\u53EF\u80FD\u5730\u6269\u5C55\u6E38\u620F\u5E76\u5728\u9700\u8981\u65F6\u6DFB\u52A0\u9ED1\u6761\u3002</li></ul><p>\u5F53\u4F7F\u7528<code>FlameGame</code>\u65F6\uFF0C\u89C6\u53E3\u6267\u884C\u7684\u64CD\u4F5C\u4F1A\u81EA\u52A8\u6267\u884C\u5230\u6BCF\u4E2A\u6E32\u67D3\u64CD\u4F5C\u4E2D\uFF0C\u800C\u6E38\u620F\u4E2D\u7684<code>size</code>\u5C5E\u6027\uFF0C\u800C\u4E0D\u662F\u903B\u8F91\u5C0F\u90E8\u4EF6\u5927\u5C0F\uFF0C\u4F1A\u53D8\u6210\u901A\u8FC7\u89C6\u53E3\u4E0E\u955C\u5934\u7684\u53D8\u7126\u6240\u770B\u5230\u7684\u5927\u5C0F\u3002\u5982\u679C\u51FA\u4E8E\u67D0\u4E9B\u539F\u56E0\u9700\u8981\u8BBF\u95EE\u539F\u59CB\u7684\u903B\u8F91\u50CF\u7D20\u5927\u5C0F\uFF0C\u53EF\u4EE5\u4F7F\u7528<code>canvasSize</code>\u3002\u5173\u4E8E\u6BCF\u4E2A<code>Viewport</code>\u505A\u4EC0\u4E48\u4EE5\u53CA\u5982\u4F55\u64CD\u4F5C\u7684\u66F4\u6DF1\u5165\u7684\u63CF\u8FF0\uFF0C\u8BF7\u67E5\u770B\u5176\u7C7B\u7684\u6587\u6863\u3002</p><h2 id="\u6444\u50CF\u673A" tabindex="-1"><a class="header-anchor" href="#\u6444\u50CF\u673A" aria-hidden="true">#</a> \u6444\u50CF\u673A</h2><p>\u4E0E<code>Viewport</code>\u4E0D\u540C\uFF0C<code>Camera</code>\u662F\u4E00\u4E2A\u66F4\u52A8\u6001\u7684<code>Canvas</code>\u8F6C\u6362\uFF0C\u901A\u5E38\u4F9D\u8D56\u4E8E\uFF1A</p><ul><li>\u4E0E\u5C4F\u5E55\u5750\u6807 1:1 \u4E0D\u5339\u914D\u7684\u4E16\u754C\u5750\u6807\u3002</li><li>\u5728\u6E38\u620F\u4E16\u754C\u4E2D\u56F4\u7ED5\u6216\u8DDF\u968F\u73A9\u5BB6\uFF08\u5982\u679C\u4E16\u754C\u6BD4\u5C4F\u5E55\u5927\uFF09\u3002</li><li>\u7528\u6237\u63A7\u5236\u653E\u5927\u548C\u7F29\u5C0F\u3002</li></ul><p>\u53EA\u6709\u4E00\u4E2A <code>Camera </code>\u5B9E\u73B0\uFF0C\u4F46\u5B83\u5141\u8BB8\u8BB8\u591A\u4E0D\u540C\u7684\u914D\u7F6E\u3002\u60A8\u53EF\u4EE5\u5728\u6E38\u620F\u4E2D\u5355\u72EC\u4F7F\u7528\u5B83\uFF0C\u4F46\u5B83\u5DF2\u7ECF\u5305\u542B\u5E76\u8FDE\u63A5\u5230 <code>FlameGame</code>\u3002</p><p>\u5173\u4E8E\u6444\u50CF\u5934\uFF0C\u9700\u8981\u6CE8\u610F\u7684\u4E00\u4EF6\u91CD\u8981\u4E8B\u60C5\u662F\uFF0C\u7531\u4E8E\uFF08\u4E0D\u50CF Viewport\uFF09\u5B83\u662F\u52A8\u6001\u7684\uFF0C\u5927\u591A\u6570\u6444\u50CF\u5934\u7684\u79FB\u52A8\u4E0D\u4F1A\u7ACB\u5373\u53D1\u751F\u3002\u76F8\u53CD\uFF0C\u6444\u50CF\u5934\u6709\u4E00\u4E2A\u53EF\u914D\u7F6E\u7684\u901F\u5EA6\u548C\u66F4\u65B0\u7684\u6E38\u620F\u5FAA\u73AF\u3002\u5982\u679C\u60A8\u60F3\u7ACB\u5373\u79FB\u52A8\u60A8\u7684\u6444\u50CF\u5934\uFF08\u6BD4\u5982\u5728\u60A8\u7684\u7B2C\u4E00\u4E2ACamera\u8BBE\u7F6E\u5728\u6E38\u620F\u5F00\u59CB\uFF09 \uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u5FEB\u7167\u529F\u80FD\u3002\u4E0D\u8FC7\uFF0C\u5728\u6E38\u620F\u4E2D\u8C03\u7528 <code>snap </code>\u53EF\u80FD\u4F1A\u5BFC\u81F4\u4E0D\u548C\u8C10\u6216\u4E0D\u81EA\u7136\u7684\u6444\u50CF\u673A\u79FB\u52A8\uFF0C\u6240\u4EE5\u9664\u975E\u60A8\u60F3\u8981\uFF0C\u5426\u5219\u4E0D\u8981\u8FD9\u6837\u505A\uFF08\u4F8B\u5982\uFF0C\u5BF9\u4E8E\u5730\u56FE\u8FC7\u6E21\uFF09\u3002\u4ED4\u7EC6\u68C0\u67E5\u6BCF\u4E2A\u65B9\u6CD5\u7684\u6587\u6863\uFF0C\u4E86\u89E3\u66F4\u591A\u5173\u4E8E\u5B83\u5982\u4F55\u5F71\u54CD\u6444\u50CF\u5934\u79FB\u52A8\u7684\u7EC6\u8282\u3002</p><p>\u53E6\u4E00\u4E2A\u91CD\u8981\u7684\u6CE8\u610F\u4E8B\u9879\u662F\uFF0C\u6444\u50CF\u5934\u5E94\u7528\u5728\u89C6\u53E3\u4E4B\u540E\uFF0C\u5E76\u4E14\u53EA\u9002\u7528\u4E8E\u975E HUD \u7EC4\u4EF6\u3002\u6240\u4EE5\u8FD9\u91CC\u7684\u5C4F\u5E55\u5927\u5C0F\u8003\u8651\u7684\u662F<code>Viewport</code>\u8F6C\u6362\u540E\u7684\u6709\u6548\u5927\u5C0F\u3002</p><p><code>Camera </code>\u53EF\u4EE5\u5E94\u7528\u4E8E <code>Canvas </code>\u7684\u8F6C\u6362\u6709\u4E24\u79CD\u7C7B\u578B\u3002\u7B2C\u4E00\u4E2A\u4E5F\u662F\u6700\u590D\u6742\u7684\u4E00\u4E2A\u662F\u7FFB\u8BD1\u3002\u8FD9\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u51E0\u4E2A\u56E0\u7D20\u5F97\u5230\u5E94\u7528\uFF1A</p><ul><li>nothing\uFF1A\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u6444\u50CF\u673A\u4E0D\u4F1A\u5E94\u7528\u4EFB\u4F55\u8F6C\u6362\uFF0C\u6240\u4EE5\u4F7F\u7528\u5B83\u662F\u53EF\u9009\u7684\u3002</li><li>relative offset\uFF1A\u60A8\u53EF\u4EE5\u914D\u7F6E\u5B83\u6765\u51B3\u5B9A\u76F8\u673A\u7684\u4E2D\u5FC3\u5E94\u8BE5\u5728\u5C4F\u5E55\u4E0A\u7684\u54EA\u4E2A\u4F4D\u7F6E\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u5B83\u4F4D\u4E8E\u5DE6\u4E0A\u89D2\uFF0C\u8FD9\u610F\u5473\u7740\u5C45\u4E2D\u5750\u6807\u6216\u5BF9\u8C61\u5C06\u59CB\u7EC8\u4F4D\u4E8E\u5C4F\u5E55\u7684\u5DE6\u4E0A\u89D2\u3002\u60A8\u53EF\u4EE5\u5728\u6E38\u620F\u8FC7\u7A0B\u4E2D\u5E73\u6ED1\u5730\u6539\u53D8\u76F8\u5BF9\u504F\u79FB\uFF08\u4F8B\u5982\uFF0C\u53EF\u4EE5\u7528\u4E8E\u5E94\u7528\u5BF9\u8BDD\u6216\u7269\u54C1\u62FE\u53D6\u4E34\u65F6\u6444\u50CF\u673A\u8FC7\u6E21\uFF09\u3002</li><li>moveTo\uFF1A \u5982\u679C\u60A8\u60F3\u4E34\u65F6\u79FB\u52A8\u60A8\u7684\u76F8\u673A\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u8FD9\u4E2A\u65B9\u6CD5; \u5B83\u5C06\u5E73\u6ED1\u5730\u79FB\u52A8\u76F8\u673A\u5230\u4E00\u4E2A\u65B0\u7684\u4F4D\u7F6E\uFF0C\u5FFD\u7565\u8DDF\u968F\u4F46\u9075\u5B88\u76F8\u5BF9\u504F\u79FB\u548C\u4E16\u754C\u8FB9\u754C\u3002 \u5982\u679C\u4E0E\u8DDF\u968F\u4E00\u8D77\u4F7F\u7528\uFF0C\u5219\u53EF\u4EE5\u901A\u8FC7 <code>resetMovement </code>\u91CD\u7F6E\uFF0C\u4EE5\u4FBF\u518D\u6B21\u5F00\u59CB\u8003\u8651\u88AB\u8DDF\u968F\u7684\u5BF9\u8C61\u3002</li><li>follow\uFF1A\u60A8\u53EF\u4EE5\u4F7F\u7528\u8FD9\u4E2A\u65B9\u6CD5\u8BA9\u60A8\u7684\u76F8\u673A\u6301\u7EED\u8DDF\u968F\u4E00\u4E2A\u5BF9\u8C61\uFF08\u4F8B\u5982\uFF0C\u4E00\u4E2A<code>PositionComponent</code>\uFF09\u3002\u8FD9\u5E76\u4E0D\u6D41\u7545\uFF0C\u56E0\u4E3A\u8DDF\u968F\u7684\u7269\u4F53\u672C\u8EAB\u7684\u79FB\u52A8\u5DF2\u7ECF\u662F\u5E73\u6ED1\u7684\uFF08\u4F8B\u5982\uFF0C\u5982\u679C\u60A8\u7684\u89D2\u8272\u4F20\u9001\uFF0C\u6444\u50CF\u673A\u4E5F\u4F1A\u7ACB\u5373\u4F20\u9001\uFF09\u3002</li><li>world bounds\uFF1A\u4F7F\u7528\u8DDF\u968F\u65F6\uFF0C\u60A8\u53EF\u4EE5\u9009\u62E9\u5B9A\u4E49\u4E16\u754C\u7684\u8FB9\u754C\u3002 \u5982\u679C\u8FD9\u6837\u505A\u4E86\uFF0C\u6444\u50CF\u673A\u5C06\u505C\u6B62\u8DDF\u968F/\u79FB\u52A8\uFF0C\u4EE5\u4FBF\u4E0D\u663E\u793A\u754C\u5916\u533A\u57DF\uFF08\u53EA\u8981\u4E16\u754C\u5927\u4E8E\u5C4F\u5E55\uFF09\u3002</li></ul><p>\u6700\u540E\uFF0C\u76F8\u673A\u5E94\u7528\u7684\u7B2C\u4E8C\u4E2A\u53D8\u6362\u662F\u7F29\u653E\u3002\u8FD9\u5141\u8BB8\u52A8\u6001\u7F29\u653E\uFF0C\u5E76\u7531<code>zoom</code>\u5B57\u6BB5\u63A7\u5236\u3002\u6CA1\u6709\u7F29\u653E\u901F\u5EA6\uFF0C\u90A3\u5FC5\u987B\u7531\u60A8\u5728\u6539\u53D8\u65F6\u63A7\u5236\u3002<code>zoom</code>\u53D8\u91CF\u7ACB\u5373\u88AB\u5E94\u7528\u3002</p><p>\u5728\u5904\u7406\u8F93\u5165\u4E8B\u4EF6\u65F6\uFF0C\u5FC5\u987B\u5C06\u5C4F\u5E55\u5750\u6807\u8F6C\u6362\u4E3A\u4E16\u754C\u5750\u6807(\u6216\u8005\uFF0C\u7531\u4E8E\u67D0\u4E9B\u539F\u56E0\uFF0C\u60A8\u53EF\u80FD\u5E0C\u671B\u8FDB\u884C\u76F8\u53CD\u7684\u64CD\u4F5C)\u3002<code>Camera</code>\u63D0\u4F9B\u4E86\u4E24\u4E2A\u529F\u80FD\uFF0C<code>screenToWorld</code>\u548C<code>worldToScreen</code>\uFF0C\u65B9\u4FBF\u5730\u5728\u8FD9\u4E9B\u5750\u6807\u7A7A\u95F4\u4E4B\u95F4\u8FDB\u884C\u8F6C\u6362\u3002</p><h3 id="camera-followvector2" tabindex="-1"><a class="header-anchor" href="#camera-followvector2" aria-hidden="true">#</a> Camera.followVector2</h3><p>\u7ACB\u5373\u6355\u6349\u6444\u50CF\u673A\u4EE5\u5F00\u59CB\u8DDF\u968F <code>Vector2</code>\u3002</p><p>\u8FD9\u610F\u5473\u7740\u6444\u50CF\u673A\u5C06\u79FB\u52A8\uFF0C\u4EE5\u4F7F\u4F4D\u7F6E\u77E2\u91CF\u4F4D\u4E8E\u5C4F\u5E55\u4E0A\u7684\u56FA\u5B9A\u4F4D\u7F6E\u3002 \u8BE5\u4F4D\u7F6E\u7531 <code>relativeOffset </code>\u53C2\u6570\u5B9A\u4E49\u7684\u5C4F\u5E55\u5927\u5C0F\u7684\u4E00\u90E8\u5206\u786E\u5B9A\uFF08\u9ED8\u8BA4\u4E3A\u4E2D\u5FC3\uFF09\u3002 \u53EF\u4EE5\u9009\u62E9\u8BBE\u7F6E <code>worldBounds </code>\u53C2\u6570\u4EE5\u5C06\u8FB9\u754C\u6DFB\u52A0\u5230\u5141\u8BB8\u76F8\u673A\u79FB\u52A8\u7684\u8DDD\u79BB\u3002</p><p>\u793A\u4F8B\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">FlameGame</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> someVector <span class="token operator">=</span> <span class="token class-name">Vector2</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">&gt;</span></span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
     camera<span class="token punctuation">.</span><span class="token function">followVector2</span><span class="token punctuation">(</span>someVector<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="camera-followcomponent" tabindex="-1"><a class="header-anchor" href="#camera-followcomponent" aria-hidden="true">#</a> Camera.followComponent</h3><p>\u7ACB\u5373\u6355\u6349\u6444\u50CF\u673A\u4EE5\u5F00\u59CB\u8DDF\u968F <code>PositionComponent</code>\u3002</p><p>\u8FD9\u610F\u5473\u7740\u6444\u50CF\u673A\u5C06\u79FB\u52A8\uFF0C\u4EE5\u4F7F\u7EC4\u4EF6\u7684\u4F4D\u7F6E\u77E2\u91CF\u4F4D\u4E8E\u5C4F\u5E55\u4E0A\u7684\u56FA\u5B9A\u4F4D\u7F6E\u3002 \u8BE5\u4F4D\u7F6E\u7531 <code>relativeOffset </code>\u53C2\u6570\u5B9A\u4E49\u7684\u5C4F\u5E55\u5927\u5C0F\u7684\u4E00\u90E8\u5206\u786E\u5B9A\uFF08\u9ED8\u8BA4\u4E3A\u4E2D\u5FC3\uFF09\u3002 \u53EF\u4EE5\u9009\u62E9\u8BBE\u7F6E <code>worldBounds </code>\u53C2\u6570\u4EE5\u5C06\u8FB9\u754C\u6DFB\u52A0\u5230\u5141\u8BB8\u76F8\u673A\u79FB\u52A8\u7684\u8DDD\u79BB\u3002</p><p>\u793A\u4F8B\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">MyGame</span> <span class="token keyword">extends</span> <span class="token class-name">FlameGame</span> <span class="token punctuation">{</span>
  <span class="token metadata function">@override</span>
  <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">&gt;</span></span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
     <span class="token keyword">final</span> sprite <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">loadSprite</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;pizza.png&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">final</span> player <span class="token operator">=</span> <span class="token class-name">SpriteComponent</span><span class="token punctuation">(</span>
       sprite<span class="token punctuation">:</span> sprite<span class="token punctuation">,</span>
       size<span class="token punctuation">:</span> size<span class="token punctuation">,</span>
       anchor<span class="token punctuation">:</span> <span class="token class-name">Anchor</span><span class="token punctuation">.</span>center<span class="token punctuation">,</span>
     <span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token function">add</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
     
     camera<span class="token punctuation">.</span><span class="token function">followComponent</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5728\u6E38\u620F\u7C7B\u4E2D\u4F7F\u7528\u6444\u50CF\u673A" tabindex="-1"><a class="header-anchor" href="#\u5728\u6E38\u620F\u7C7B\u4E2D\u4F7F\u7528\u6444\u50CF\u673A" aria-hidden="true">#</a> \u5728\u6E38\u620F\u7C7B\u4E2D\u4F7F\u7528\u6444\u50CF\u673A</h3><p>\u5982\u679C\u60A8\u4E0D\u4F7F\u7528<code>FlameGame</code>\uFF0C\u800C\u662F\u4F7F\u7528<code>Game </code>mixin\uFF0C\u90A3\u4E48\u60A8\u9700\u8981\u81EA\u5DF1\u7BA1\u7406\u8C03\u7528\u67D0\u4E9B\u6444\u50CF\u673A\u65B9\u6CD5\u3002\u5047\u8BBE\u6211\u4EEC\u6709\u5982\u4E0B\u7684\u6E38\u620F\u7ED3\u6784\uFF0C\u6211\u4EEC\u60F3\u8981\u6DFB\u52A0\u6444\u50CF\u673A\u529F\u80FD\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token keyword">class</span> <span class="token class-name">YourGame</span> <span class="token keyword">with</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span>
  <span class="token class-name">Camera</span><span class="token operator">?</span> camera<span class="token punctuation">;</span>

  <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">&gt;</span></span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">void</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span>double dt<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u9996\u5148\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u6444\u50CF\u5934\u5B9E\u4F8B\uFF0C\u5E76\u5C06\u6211\u4EEC\u7684\u6E38\u620F\u4F5C\u4E3A\u53C2\u8003\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code>  <span class="token comment">// ...</span>
  
  <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token keyword">void</span><span class="token punctuation">&gt;</span></span> <span class="token function">onLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
    camera <span class="token operator">=</span> <span class="token class-name">Camera</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// This is required for the camera to work.</span>
    camera<span class="token operator">?</span><span class="token punctuation">.</span>gameRef <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>

    <span class="token comment">// Not required but recommend to set it now or when you set the follow target.</span>
    camera<span class="token operator">?</span><span class="token punctuation">.</span>worldBounds <span class="token operator">=</span> yourWorldBounds<span class="token punctuation">;</span>

    <span class="token comment">// Rest of your on load code.</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6444\u50CF\u673A\u8FD8\u53EF\u4EE5\u77E5\u9053\u8981\u8DDF\u968F\u54EA\u4E2A\u4F4D\u7F6E\uFF0C\u8FD9\u662F\u4E00\u9879\u53EF\u9009\u529F\u80FD\uFF0C\u56E0\u4E3A\u60A8\u4E5F\u53EF\u4EE5\u4F7F\u7528\u6444\u50CF\u673A\u8FDB\u884C\u79FB\u52A8\u3001\u6355\u6349\u6216\u6447\u6643\u3002</p><p>\u4E3A\u4E86\u505A\u5230\u8FD9\u4E00\u70B9\uFF0C<code>Camera </code>\u7C7B\u63D0\u4F9B\u4E86\u591A\u79CD\u65B9\u6CD5\uFF0C\u4F46\u662F\u8BA9\u6211\u4EEC\u6765\u5C55\u793A\u4E00\u4E0B\u6700\u7B80\u5355\u7684\u65B9\u6CD5\uFF0C\u90A3\u5C31\u662F\u4E0B\u9762\u7684 <code>vector2</code>\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code>  <span class="token comment">// Somewhere in your code.</span>

  camera<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">followVector2</span><span class="token punctuation">(</span>
    yourPositionToFollow<span class="token punctuation">,</span>
    worldBounds<span class="token punctuation">:</span> yourWorldBounds<span class="token punctuation">,</span> <span class="token comment">// Optional to pass, it will overwrite the previous bounds.</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u73B0\u5728\u6444\u50CF\u673A\u5DF2\u7ECF\u521B\u5EFA\u5E76\u4E14\u5B83\u77E5\u9053\u4E16\u754C\u8FB9\u754C\u548C\u5B83\u5E94\u8BE5\u9075\u5B88\u7684\u4F4D\u7F6E\uFF0C\u5B83\u53EF\u4EE5\u7528\u6765\u5728\u6E32\u67D3\u65B9\u6CD5\u4E2D\u7FFB\u8BD1\u753B\u5E03\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code>  <span class="token comment">// ...</span>

  <span class="token keyword">void</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token class-name">Canvas</span> canvas<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    camera<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>canvas<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// This will apply the camera transformation.</span>

    <span class="token comment">// Rest of your rendering code.</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u552F\u4E00\u8981\u505A\u7684\u5C31\u662F\u8C03\u7528 <code>Camera </code>\u4E0A\u7684 <code>update </code>\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5B83\u5C31\u53EF\u4EE5\u987A\u5229\u5730\u8DDF\u968F\u60A8\u7ED9\u5B9A\u7684\u4F4D\u7F6E\uFF1A</p><div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code>  <span class="token comment">// ...</span>

  <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span>double dt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    camera<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>dt<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Rest of your update code.</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39);function h(w,f){const a=o("ExternalLinkIcon");return t(),c(l,null,[u,n("p",null,[r,n("a",m,[k,p(a)]),v]),b],64)}var y=e(d,[["render",h],["__file","camera-and-viewport.html.vue"]]);export{y as default};
