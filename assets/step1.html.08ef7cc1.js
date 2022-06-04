import{_ as l,r as s,o as c,c as d,a as n,b as a,w as p,F as r,d as e,e as t}from"./app.0106d251.js";var u="/flame-cn/images/tutorials/klondike-sketch.webp",m="/flame-cn/images/tutorials/klondike-sprites.png";const k={},_=n("h1",{id:"_1-\u51C6\u5907",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-\u51C6\u5907","aria-hidden":"true"},"#"),e(" 1. \u51C6\u5907")],-1),v=n("p",null,[e("\u5728\u60A8\u5F00\u59CB\u4EFB\u4F55\u7C7B\u578B\u7684\u6E38\u620F\u9879\u76EE\u4E4B\u524D\uFF0C\u60A8\u9700\u8981\u7ED9\u5B83\u4E00\u4E2A\u540D\u5B57\u3002\u5728\u672C\u6559\u7A0B\u4E2D\uFF0C\u540D\u79F0\u5C06\u662F\u7B80\u5355\u7684 "),n("code",null,"klondike"),e("\u3002")],-1),h=e("\u8BB0\u4F4F\u8FD9\u4E2A\u540D\u5B57\u540E\uFF0C\u8BF7\u524D\u5F80"),g=e("\u7A7A\u767D\u7684Flame\u6E38\u620F"),b=e("\u6559\u7A0B\u5B8C\u6210\u5FC5\u8981\u7684\u6B65\u9AA4\u3002\u5F53\u60A8\u56DE\u6765\u7684\u65F6\u5019\uFF0C\u60A8\u5E94\u8BE5\u5DF2\u7ECF\u6709\u4E86"),f=n("code",null,"main.dart",-1),x=e("\u6587\u4EF6\uFF0C\u5B83\u5305\u542B\u4EE5\u4E0B\u5185\u5BB9\uFF1A"),y=t(`<div class="language-dart ext-dart line-numbers-mode"><pre class="language-dart"><code><span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flame/game.dart&#39;</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string-literal"><span class="token string">&#39;package:flutter/widgets.dart&#39;</span></span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">final</span> game <span class="token operator">=</span> <span class="token class-name">FlameGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">runApp</span><span class="token punctuation">(</span><span class="token class-name">GameWidget</span><span class="token punctuation">(</span>game<span class="token punctuation">:</span> game<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u89C4\u5212" tabindex="-1"><a class="header-anchor" href="#\u89C4\u5212" aria-hidden="true">#</a> \u89C4\u5212</h2><p>T\u4EFB\u4F55\u9879\u76EE\u7684\u5F00\u59CB\u901A\u5E38\u90FD\u4F1A\u8BA9\u4EBA\u611F\u5230\u538B\u529B\u5C71\u5927\u3002\u4ECE\u54EA\u91CC\u5F00\u59CB\u5462\uFF1F\u6211\u53D1\u73B0\u603B\u662F\u521B\u5EFA\u4E00\u4E2A\u5173\u4E8E\u6211\u5C06\u8981\u7F16\u5199\u7684\u4EE3\u7801\u7684\u8349\u56FE\u5F88\u6709\u7528\uFF0C\u8FD9\u6837\u5B83\u5C31\u53EF\u4EE5\u4F5C\u4E3A\u4E00\u4E2A\u53C2\u8003\u70B9\u3002\u6211\u5BF9<code>klondike</code>\u6E38\u620F\u7684\u8349\u56FE\u5982\u4E0B\uFF1A</p><p><img src="`+u+'" alt=""></p>',4),w=e("\u5728\u8FD9\u91CC\u60A8\u53EF\u4EE5\u770B\u5230\u6E38\u620F\u7684\u603B\u4F53\u5E03\u5C40\uFF0C\u4EE5\u53CA\u5404\u79CD\u5BF9\u8C61\u7684\u540D\u79F0\u3002\u8FD9\u4E9B\u540D\u5B57\u662F\u7EB8\u724C\u6E38\u620F\u7684"),F={href:"https://en.wikipedia.org/wiki/Solitaire_terminology",target:"_blank",rel:"noopener noreferrer"},G=e("\u6807\u51C6\u672F\u8BED"),L=e("\u3002\u8FD9\u771F\u7684\u5F88\u5E78\u8FD0\uFF0C\u56E0\u4E3A\u901A\u5E38\u4E3A\u4E0D\u540C\u7684\u7C7B\u627E\u51FA\u597D\u7684\u540D\u5B57\u662F\u4E00\u4E2A\u76F8\u5F53\u5177\u6709\u6311\u6218\u6027\u7684\u4EFB\u52A1\u3002"),N=t('<p>\u770B\u8FD9\u4E2A\u8349\u56FE\uFF0C\u6211\u4EEC\u5DF2\u7ECF\u53EF\u4EE5\u60F3\u8C61\u51FA\u6E38\u620F\u7684\u9AD8\u5C42\u7ED3\u6784\u4E86\u3002 \u663E\u7136\uFF0C\u4F1A\u6709\u4E00\u4E2A <code>Card</code> \u7C7B\uFF0C\u8FD8\u6709 <code>Stock</code> \u7C7B\u3001<code>Waste</code> \u7C7B\u3001\u4E00\u4E2A\u5305\u542B 7 \u4E2A <code>Piles</code> \u548C 4 \u4E2A <code>Foundations</code> \u7684 <code>Tableau</code>\u3002\u4E5F\u53EF\u80FD\u6709\u4E00\u526F\u724C\u3002\u6240\u6709\u8FD9\u4E9B\u7EC4\u4EF6\u5C06\u901A\u8FC7\u6D3E\u751F\u81EA <code>FlameGame</code> \u7684 <code>KlondikeGame</code> \u7ED1\u5B9A\u5728\u4E00\u8D77\u3002</p><h2 id="\u8D44\u6E90" tabindex="-1"><a class="header-anchor" href="#\u8D44\u6E90" aria-hidden="true">#</a> \u8D44\u6E90</h2><p>\u6E38\u620F\u5F00\u53D1\u7684\u53E6\u4E00\u4E2A\u91CD\u8981\u65B9\u9762\u662F\u6E38\u620F\u7684\u8D44\u4EA7\u3002\u8FD9\u5305\u62EC\u56FE\u50CF\u3001\u7CBE\u7075\u3001\u52A8\u753B\u3001\u58F0\u97F3\u3001\u7EB9\u7406\u3001\u6570\u636E\u6587\u4EF6\u7B49\u3002\u5728\u50CF <code>Klondike</code> \u8FD9\u6837\u7B80\u5355\u7684\u6E38\u620F\u4E2D\uFF0C\u6211\u4EEC\u4E0D\u9700\u8981\u5F88\u591A\u82B1\u54E8\u7684\u56FE\u50CF\uFF0C\u4F46\u4ECD\u7136\u9700\u8981\u4E00\u4E9B\u7CBE\u7075\u56FE\u6765\u7ED8\u5236\u724C\u9762\u3002</p><p>\u4E3A\u4E86\u51C6\u5907\u56FE\u6587\u8D44\u6E90\uFF0C\u6211\u5148\u62FF\u4E86\u4E00\u5F20\u5B9E\u4F53\u6251\u514B\u724C\uFF0C\u6D4B\u51FA\u6765\u662F63mm\xD788mm\uFF0C\u5927\u6982\u662F10:14\u7684\u6BD4\u4F8B\u3002 \u56E0\u6B64\uFF0C\u6211\u51B3\u5B9A\u6211\u7684\u6E38\u620F\u5185\u5361\u7247\u5E94\u8BE5\u4EE5 1000\xD71400 \u50CF\u7D20\u8FDB\u884C\u6E32\u67D3\uFF0C\u5E76\u4E14\u6211\u5E94\u8BE5\u4EE5\u8FD9\u79CD\u6BD4\u4F8B\u7ED8\u5236\u6240\u6709\u56FE\u50CF\u3002</p><p>\u8BF7\u6CE8\u610F\uFF0C\u786E\u5207\u7684\u50CF\u7D20\u5C3A\u5BF8\u5728\u8FD9\u91CC\u6709\u70B9\u65E0\u5173\u7D27\u8981\uFF0C\u56E0\u4E3A\u56FE\u50CF\u6700\u7EC8\u4F1A\u6839\u636E\u8BBE\u5907\u7684\u5B9E\u9645\u5206\u8FA8\u7387\u5411\u4E0A\u6216\u5411\u4E0B\u7F29\u653E\u3002\u5728\u8FD9\u91CC\uFF0C\u6211\u4F7F\u7528\u7684\u5206\u8FA8\u7387\u53EF\u80FD\u6BD4\u624B\u673A\u6240\u9700\u8981\u7684\u5206\u8FA8\u7387\u8981\u5927\uFF0C\u6240\u4EE5\u5BF9\u4E8E\u50CF iPad \u8FD9\u6837\u7684\u5927\u578B\u8BBE\u5907\u6765\u8BF4\uFF0C\u5B83\u4E5F\u80FD\u5F88\u597D\u5730\u5DE5\u4F5C\u3002</p><p>\u73B0\u5728\uFF0C\u95F2\u8BDD\u5C11\u8BF4\uFF0C\u4E0B\u9762\u662F\u6211\u5728\u514B\u6717\u4EE3\u514B\u6E38\u620F\u4E2D\u7684\u56FE\u5F62\u8D44\u4EA7\uFF08\u6211\u4E0D\u662F\u4E00\u4E2A\u827A\u672F\u5BB6\uFF0C\u6240\u4EE5\u4E0D\u8981\u8FC7\u4E8E\u82DB\u523B\u5730\u8BC4\u5224\uFF09\uFF1A</p><p><img src="'+m+`" alt=""></p><p>\u53F3\u952E\u5355\u51FB\u56FE\u50CF\uFF0C\u9009\u62E9\u201C\u53E6\u5B58\u4E3A...\u201D\uFF0C\u5E76\u5C06\u5176\u5B58\u50A8\u5728\u9879\u76EE\u7684 <code>assets/images</code> \u6587\u4EF6\u5939\u4E2D\u3002\u5728\u8FD9\u4E00\u70B9\u4E0A\uFF0C\u6211\u4EEC\u7684\u9879\u76EE\u7ED3\u6784\u5982\u4E0B\uFF08\u5F53\u7136\u8FD8\u6709\u5176\u4ED6\u6587\u4EF6\uFF0C\u4F46\u8FD9\u4E9B\u662F\u6700\u91CD\u8981\u7684\uFF09\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>klondike/
 \u251C\u2500assets/
 \u2502  \u2514\u2500images/
 \u2502     \u2514\u2500klondike-sprites.png
 \u251C\u2500lib/
 \u2502  \u2514\u2500main.dart
 \u2514\u2500pubspec.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u987A\u4FBF\u8BF4\u4E00\u4E0B\uFF0C\u8FD9\u79CD\u6587\u4EF6\u88AB\u79F0\u4E3A <code>spritessheet</code>\uFF1A\u5B83\u53EA\u662F\u4E00\u4E2A\u6587\u4EF6\u4E2D\u591A\u4E2A\u72EC\u7ACB\u56FE\u50CF\u7684\u96C6\u5408\u3002\u6211\u4EEC\u5728\u8FD9\u91CC\u4F7F\u7528 <code>spritessheet</code> \u7684\u539F\u56E0\u5F88\u7B80\u5355: \u52A0\u8F7D\u4E00\u4E2A\u5927\u56FE\u50CF\u6BD4\u52A0\u8F7D\u8BB8\u591A\u5C0F\u56FE\u50CF\u8981\u5FEB\u3002\u53E6\u5916\uFF0C\u4ECE\u5355\u4E2A\u6E90\u56FE\u50CF\u4E2D\u63D0\u53D6\u7684\u6E32\u67D3\u7CBE\u7075\u4E5F\u53EF\u4EE5\u66F4\u5FEB\uFF0C\u56E0\u4E3A Flutter \u4F1A\u5C06\u591A\u4E2A\u8FD9\u6837\u7684\u7ED8\u5236\u547D\u4EE4\u4F18\u5316\u4E3A\u5355\u4E2A <code>drawAtlas</code> \u547D\u4EE4\u3002</p><p>\u4EE5\u4E0B\u662F\u6211\u7684\u7CBE\u7075\u8868\u7684\u5185\u5BB9\uFF1A</p><ul><li>\u6570\u5B572,3,4\uFF0C... \uFF0Ck\uFF0Ca\u3002\u7406\u8BBA\u4E0A\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5728\u6E38\u620F\u4E2D\u5C06\u8FD9\u4E9B\u5B57\u7B26\u4E32\u4F5C\u4E3A\u6587\u672C\u5B57\u7B26\u4E32\u5448\u73B0\uFF0C\u4F46\u662F\u6211\u4EEC\u8FD8\u9700\u8981\u5C06\u5B57\u4F53\u4F5C\u4E3A\u8D44\u4EA7\u5305\u542B\u8FDB\u6765\u2014\u2014\u5C06\u5B83\u4EEC\u4F5C\u4E3A\u56FE\u50CF\u6765\u5448\u73B0\u4F3C\u4E4E\u66F4\u7B80\u5355\u3002</li><li>\u82B1\u8272\u6807\u8BB0\uFF1A\u2665\u3001\u2666\u3001\u2663\u3001\u2660\u3002 \u540C\u6837\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4E3A\u8FD9\u4E9B\u4F7F\u7528 Unicode \u5B57\u7B26\uFF0C\u4F46\u56FE\u50CF\u66F4\u5BB9\u6613\u7CBE\u786E\u5B9A\u4F4D\u3002 <ul><li>\u5982\u679C\u60A8\u60F3\u77E5\u9053\u4E3A\u4EC0\u4E48\u8FD9\u4E9B\u989C\u8272\u662F\u9EC4\u8272/\u84DD\u8272\u800C\u4E0D\u662F\u7EA2\u8272/\u9ED1\u8272\u2014\u2014\u56E0\u4E3A\uFF0C\u9ED1\u8272\u7B26\u53F7\u5728\u6DF1\u8272\u80CC\u666F\u4E0B\u770B\u8D77\u6765\u4E0D\u662F\u5F88\u597D\uFF0C\u6240\u4EE5\u6211\u4E0D\u5F97\u4E0D\u8C03\u6574\u914D\u8272\u65B9\u6848\u3002</li></ul></li><li>Flame \u6807\u5FD7\uFF0C\u7528\u5728\u5361\u7247\u7684\u80CC\u9762\u3002</li><li>\u6770\u514B\uFF0C\u738B\u540E\u548C\u56FD\u738B\u7684\u7167\u7247\u3002\u901A\u5E38\u60C5\u51B5\u4E0B\u4F1A\u6709\u56DB\u500D\u4EE5\u4E0A\u7684\u8FD9\u4E9B\uFF0C\u6BCF\u4E2A\u5957\u4EF6\u6709\u4E0D\u540C\u7684\u89D2\u8272\uFF0C\u4F46\u5BF9\u4E8E\u6211\u6765\u8BF4\uFF0C\u7ED8\u5236\u8FD9\u4E9B\u592A\u7D2F\u4E86\u3002</li></ul><p>\u6B64\u5916\uFF0C\u60A8\u9700\u8981\u544A\u8BC9 Flutter \u8FD9\u4E2A\u56FE\u50CF\uFF08\u4EC5\u4EC5\u5728 <code>assets</code> \u6587\u4EF6\u5939\u4E2D\u6709\u5B83\u662F\u4E0D\u591F\u7684\uFF09\u3002\u4E3A\u4E86\u505A\u5230\u8FD9\u4E00\u70B9\uFF0C\u6211\u4EEC\u5728 pubspec.yaml \u6587\u4EF6\u4E2D\u6DFB\u52A0\u4EE5\u4E0B\u4EE3\u7801\u884C\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">flutter</span><span class="token punctuation">:</span>
  <span class="token key atrule">assets</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> assets/images/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u597D\u4E86\uFF0C\u51C6\u5907\u5DE5\u4F5C\u5230\u6B64\u4E3A\u6B62-\u5F00\u59CB\u7F16\u7A0B\u5427\uFF01</p>`,15);function V(B,C){const i=s("RouterLink"),o=s("ExternalLinkIcon");return c(),d(r,null,[_,v,n("p",null,[h,a(i,{to:"/guide/tutorials/bare_flame_game.html"},{default:p(()=>[g]),_:1}),b,f,x]),y,n("p",null,[w,n("a",F,[G,a(o)]),L]),N],64)}var S=l(k,[["render",V],["__file","step1.html.vue"]]);export{S as default};
