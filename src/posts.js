export let data={
  "folder": {
    "liter": {
      "folder": {},
      "slug": "liter",
      "name": "莉特蕊车",
      "detail": "向晚暮风拂袖顾，婵娟星海耀千古。亭台既去诗不复，星源处，银汉皎皎月明孤。<br>日轮月转一仰俯，河山越尽沧桑书。千里东风青云负，乾坤舞，扶摇浩浩寰宇舒。<br><span style=\"margin: 20px 10px 0 10px;display:inline-block\">——《渔家傲·星源》</span>",
      "file": {
        "chunjie": {
          "slug": "chunjie",
          "title": "新年祝福",
          "content": "<h1>新年祝福语</h1>\n<p>赶紧 copy 下来：</p>\n<pre><code class=\"hljs language-liter\">愿有志者所愿皆成，有期者所求皆得，有情者所爱皆恒，有德者所颂皆扬，愿美好日久天长，愿山河无恙，万世永昌。\n</code></pre>\n"
        }
      }
    },
    "tech": {
      "folder": {},
      "slug": "tech",
      "name": "特克娜里鸡",
      "detail": "特克娜里鸡是一种特别好吃的鸡肉料理。",
      "file": {
        "ds": {
          "slug": "ds",
          "title": "Deepseek 很强吗",
          "content": "<h1>关于 Deepseek 的个人看法</h1>\n<p>据说 <code class=\"inline\">deepseek v3</code> 和 <code class=\"inline\">v2</code> 都是与其他 AI 本质相同的语言大模型，训练方法都是相似的，加之电脑配置局限，未作体验。</p>\n<p>不过最有“特点”的据说是 <code class=\"inline\">r1</code>，能够“深度思考”，适合“逻辑推理”。我尝试了 <code class=\"inline\">1.5b</code>, <code class=\"inline\">7b</code>, <code class=\"inline\">8b</code>, 有以下总结。\n（下文 <code class=\"inline\">deepseek</code> 几乎均指 <code class=\"inline\">Deepseek r1</code>）</p>\n<h2>硬件需求</h2>\n<p>小。但是是相对的。我曾经尝试过国产的 <code class=\"inline\">ChatGLM2 (6b)</code>，跑起来真的够狠，电脑寿命--;</p>\n<p>CPU和内存几乎拉满，关键是跑得还超级慢，一句“你好”都要几分钟才能回答，不敢恭维，就此放弃。当然或许还有其它原因，比如我是用 Windows 系统跑的。</p>\n<p>但是当我尝试 <code class=\"inline\">deepseek</code> 的时候，跑 <code class=\"inline\">7b</code> 很轻松（虽然cpu和内存也都占用挺大，但不算慢），跑 <code class=\"inline\">8b</code> 也效果不错。</p>\n<p>不过之所以说是 “相对地小”，因为我尝试 <code class=\"inline\">Gemma2</code> 后发现 <code class=\"inline\">Gemma2 9b</code> 也跑得很好，速度不输 ds，所以可见不是 ds 这方面好，而是前面那位太抽象。</p>\n<h2>逻辑推理</h2>\n<p>只能说一般。深度思考感觉实现很简单，算不上是亮点。我以为，用 <code class=\"inline\">chatgpt</code>，精心设计 prompt，也能达到类似的效果。\n（<code class=\"inline\">mscopilot</code> 已经加上了深度思考的功能）</p>\n<p>我用一道“很显然”的物理题目分别考了 <code class=\"inline\">ds 1.5b</code>, <code class=\"inline\">7b</code>, <code class=\"inline\">8b</code> 和 <code class=\"inline\">Gemma2 9b</code>,发现 ds 会有一个神奇的操作：在深度思考的内容中会反复地：</p>\n<ul>\n<li>不过，让我再算一遍。</li>\n<li>我来再验算一次。</li>\n<li>这似乎与前面算的不符，让我再算一次。</li>\n<li>这和之前得到的结果是一样的，不过让我们再换一种方法。</li>\n</ul>\n<p>最后他甚至会用上积分来验算，甚是有趣。先不谈论计算的对错，但是这份坚持不懈的精神和品质就值得其它 ai 学习借鉴，甚至包括人类。(bs</p>\n<p>好吧，他的逻辑能力我觉得还行。<code class=\"inline\">1.5b</code> 的计算过程都能对一半，<code class=\"inline\">8b</code> 却因为题目理解出错而找错了答案要求。\n（可能是碰巧，但我看着 8b 因为每一遍验算出来的答案都不一样而挣扎真的很揪心）</p>\n<p>不过 <code class=\"inline\">deepseek</code> 有一点很好，就是很有自知之明。它 (<code class=\"inline\">1.5b</code>) 明知自己菜，就会疯了似的不停验算，各种方法，排列组合。\n不知道这是开发者特意为之，还是 AI 本身有自知之明，是 feature 还是 bug，我不清楚。</p>\n<h2>语言文学</h2>\n<p>所以 <code class=\"inline\">deepseek</code> 的语言能力真的很差，不仅难以理解用户的要求，让它写作也是干瘪死板，时不时还会冒英文。很难想象这是一个国内开发的 ai。</p>\n<p>反观 <code class=\"inline\">Gemma</code>，反而中文理解力远胜 ds，写的文章也更生动丰满，真是有趣。</p>\n<p>而清华的那啥写作时甚至还会冒一些文言文，可以说清华选的训练语料确实比较奢侈。</p>\n<h2>Conclusion</h2>\n<p>好吧，我知道 <code class=\"inline\">Deepseek</code> 是国产 AI 的新星，也确实比那个清华的那啥，在前文的前两方面强多了，但说真的亮点比较少，完全没网上吹得那样。\n据我了解，ds唯一亮点就是训练成本低。但训练成本于我们使用者确乎意义不大。我大胆地将这一点归因于先前 AI 模型训练的经验积累。\n当然也期待中国真的能够在 AI 领域取得一定的突破性成绩，不要仅仅是继续发展曾经过时的“看家本领”——宣传。</p>\n"
        },
        "test": {
          "slug": "test",
          "title": "用于测试",
          "content": "<h1>一级标题</h1>\n<h2>二级标题</h2>\n<h3>三级标题</h3>\n<h4>四级标题</h4>\n<h5>五级标题</h5>\n<h6>六级标题</h6>\n<p>####### 七级标题</p>\n<p><strong>粗体文本</strong> <em>斜体文本</em> <em><strong>粗斜体文本</strong></em></p>\n<blockquote>\n<p>这是一段引用文本\n多行引用</p>\n<blockquote>\n<p>嵌套引用</p>\n</blockquote>\n</blockquote>\n<p><a href=\"https://example.com\" class=\"a jump\">https://example.com</a></p>\n<ul>\n<li>无序列表项1</li>\n<li>无序列表项2\n<ul>\n<li>子项1</li>\n<li>子项2</li>\n</ul>\n</li>\n</ul>\n<ol>\n<li>有序列表项1</li>\n<li>有序列表项2\n<ol>\n<li>子项1</li>\n<li>子项2</li>\n</ol>\n</li>\n</ol>\n<p>这是 <code class=\"inline\">code inline</code> 。</p>\n<pre><code class=\"hljs language-javascript\"><span class=\"hljs-comment\">// 代码块</span>\n<span class=\"hljs-keyword\">function</span> <span class=\"hljs-title function_\">hello</span>(<span class=\"hljs-params\"></span>) {\n    <span class=\"hljs-variable language_\">console</span>.<span class=\"hljs-title function_\">log</span>(<span class=\"hljs-string\">&quot;Hello, World!&quot;</span>);\n}\n</code></pre>\n<pre><code class=\"hljs language-liter\"><span class=\"hljs-comment\">（文本块）</span>\n你好<span class=\"hljs-comment\">（是的）</span>\n<span class=\"hljs-title\"># 标题\n</span>这是<span class=\"hljs-string\">“一句话”</span>，这是<span class=\"hljs-string\">「引用」</span>。\n云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。海咸河淡，鳞潜羽翔。龙师火帝，鸟官人皇。始制文字，乃服衣裳。推位让国，有虞陶唐。吊民伐罪，周发殷汤。坐朝问道，垂拱平章。爱育黎首，臣伏戎羌。遐迩一体，率宾归王。\nLorem ipsum dolor sit amet aliquyam stet molestie et diam eirmod eos sea. Mazim voluptua lorem vero. Nisl erat odio vel ullamcorper dolore at aliquyam accusam no exerci. Rebum takimata accusam sea eos labore rebum ipsum. \n\n是的。\n</code></pre>\n<p><a href=\"https://example.com\" class=\"a jump\">链接文本</a></p>\n<table>\n<thead>\n<tr>\n<th>表头1</th>\n<th>表头2</th>\n<th>表头3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>内容1</td>\n<td>内容2</td>\n<td>内容3</td>\n</tr>\n<tr>\n<td>行2列1</td>\n<td>行2列2</td>\n<td>行2列3</td>\n</tr>\n</tbody>\n</table>\n<hr>\n<ul>\n<li>[x] 已完成任务</li>\n<li>[ ] 未完成任务</li>\n</ul>\n<p>脚注示例<a href=\"%E8%BF%99%E6%98%AF%E8%84%9A%E6%B3%A8%E5%86%85%E5%AE%B9\" class=\"a jump\">^1</a></p>\n<p><s>删除线文本</s></p>\n<details>\n<summary>展开查看详情</summary>\n这是详情内容\n</details>"
        }
      }
    }
  },
  "slug": "docs",
  "name": "Blog",
  "detail": "Blog 是一种特别好的写作方式。",
  "file": {
    "hello": {
      "slug": "hello",
      "title": "网站介绍",
      "content": "<h1>欢迎来到星源的 Blog</h1>\n<p>是的，这是一个基于 vue3 的博客网站。</p>\n<p>它包含有几个奇怪的分类，里面比较空，期望能变得不空。</p>\n<p>项目源码发布在 Github 上，<a href=\"https://github.com/starry-source/blog\" class=\"a jump\">starry-source/blog</a>。</p>\n<p>虽然项目简陋，但拒绝未经许可剽窃源码、据为己有，否则天诛地灭、万劫不复。</p>\n"
    },
    "self": {
      "slug": "self",
      "title": "个人介绍",
      "content": "<h1>星源 (Starry Source) 的个人简介</h1>\n<p>见个人网站：\n<a href=\"http://starry-source.github.io/\" class=\"a jump\">starry-source.github.io</a></p>\n<h2>基本信息</h2>\n<ul>\n<li>名字：星源</li>\n<li>国籍：PRC</li>\n<li>民族：汉族</li>\n<li>籍贯：湖南，长沙</li>\n<li>现居：四川，成都</li>\n<li>生日：2009 年 5 月中旬</li>\n<li>生理性别：男</li>\n<li>社会性别：男</li>\n<li>性倾向：异性</li>\n<li>婚姻状况：未婚</li>\n<li>政治面貌：群众</li>\n<li>学历：初中毕业</li>\n<li>单位：成都家祥歪帼雨搞基诈骗集团锦江分部</li>\n</ul>\n<h2><s>精通</s>会使用各种语言</h2>\n<p>从高到低：</p>\n<ol>\n<li>Scratch 110%</li>\n<li>Markdown 85%</li>\n<li>CSS 75%</li>\n<li>HTML 65%</li>\n<li>JavaScript 40%</li>\n<li>Python 35%</li>\n<li>C++ 30%</li>\n<li>CMD 50%</li>\n<li>C# 25%</li>\n<li>VBS 7%</li>\n<li>PowerShell 5%</li>\n</ol>\n<h2>个人项目</h2>\n<h3>Windows 12 网页版</h3>\n<ul>\n<li>使用 HTML、CSS 和 JS 开发的静态网站</li>\n<li>Github star 6k+</li>\n<li>对 Windows 12 进行创新性预测</li>\n<li>特点：精美 UI 设计、流畅动画、功能丰富</li>\n</ul>\n<h3>Tapple 滚动监测</h3>\n<ul>\n<li>CSS、JS 开发的滚动监测样式库</li>\n<li>灵感来源于苹果官网动画</li>\n<li>使用简单，仅需设置 class</li>\n</ul>\n<h3>Nikov 在线工具</h3>\n<ul>\n<li>基于 HTML、CSS 和 JS</li>\n<li>一个娱乐性质的整蛊网站</li>\n</ul>\n<h3>多分破解版</h3>\n<ul>\n<li>Python</li>\n<li>用于破解学生成绩查询系统的更多信息</li>\n</ul>\n"
    }
  }
};