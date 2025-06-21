import fs from 'fs-extra'
import path from 'path'
import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import hljs from 'highlight.js'

// Define reusable modes for contains
const longMode = {
  className: 'long',
  begin: '[…—]+',
  returnEnd: false
};

const commentMode = {
  className: 'comment',
  variants: [
    { begin: '[，；]' },
    { begin: '\\(', end: '\\)', contains: [longMode] },
    { begin: '\\（', end: '\\）', contains: [longMode] }
  ],
  returnEnd: false
};

const stringMode = {
  className: 'string',
  variants: [
    { begin: '"', end: '"' },
    { begin: '“', end: '”' },
    { begin: "'", end: "'" },
    { begin: "‘", end: "’" },
    { begin: "「", end: "」" }
  ],
  returnEnd: false,
  contains: [longMode, commentMode] 
};

const titleMode = {
  className: 'title',
  begin: '# ?',
  end: '\n',
  returnEnd: true,
  contains: [longMode] 
};

const authorMode = {
  className: 'author',
  begin: '作者：?[\\s\\S]+?\n',
  returnEnd: true
};

const myCustomLanguage = {
  case_insensitive: true,
  contains: [
    longMode,
    commentMode,
    stringMode,
    titleMode,
    authorMode
  ]
};


// 注册自定义语言到 highlight.js
hljs.registerLanguage('liter', ()=>myCustomLanguage);

// hljs
const md = new MarkdownIt({
    linkify: true,
    html: true
});

md.use(markdownItHighlightjs);
md.use((m)=>{
  // 修改链接渲染，处理相对路径为"./assets/..."（考虑当前 Markdown 文件所在目录）
  m.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const hrefIndex = tokens[idx].attrIndex('href');
    let href = tokens[idx].attrs[hrefIndex][1];
    if(!href.startsWith('http') && !href.startsWith('mailto:')){
      const base = env && env.base ? env.base.replace(/\\/g, '/') + '/' : '';
      href = './assets/' + base + href;
      tokens[idx].attrs[hrefIndex][1] = href;
    }
    return `<a href="${href}" class="a jump">`;
  };
  m.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    return `<code class="inline">${tokens[idx].content}</code>`;
  };
  // 修改图片渲染，同样根据 env.base 拼接资源路径
  m.renderer.rules.image = (tokens, idx, options, env, self) => {
    const srcIndex = tokens[idx].attrIndex('src');
    let src = tokens[idx].attrs[srcIndex][1];
    if(!src.startsWith('http') && !src.startsWith('mailto:')){
      const base = env && env.base ? env.base.replace(/\\/g, '/') + '/' : '';
      src = './assets/' + base + src;
      tokens[idx].attrs[srcIndex][1] = src;
    }
    return self.renderToken(tokens, idx, options);
  };
})

async function copyAssets(srcDir, destDir) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await fs.ensureDir(destPath);
      await copyAssets(srcPath, destPath);
    } else if (entry.isFile() && !entry.name.endsWith('.md') && entry.name !== 'info.json') {
      await fs.copy(srcPath, destPath);
    }
  }
}

async function readDirRecursive(dirPath, name, rootDir) {
  rootDir = rootDir || dirPath;
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const result = {
    folder: {},
    slug: name,
    name: name,
    detail: '',
    file: {},
  };

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      // 递归
      result.folder[entry.name] = await readDirRecursive(fullPath, entry.name, rootDir);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const fileContent = await fs.readFile(fullPath, 'utf8');
      // 计算当前 Markdown 文件相对于 docs 根目录的子路径，用于构造资源文件路径
      const relDir = path.relative(rootDir, path.dirname(fullPath));
      const htmlContent = md.render(fileContent.replace(/<!-.*-->/g, ''), { base: relDir });
      const slug = path.basename(fullPath, '.md');
      const titleMatch = fileContent.match(/^<!-- name=(.+) -->/m);
      const title = titleMatch ? titleMatch[1] : slug;
      result.file[slug] = {
        slug,
        title,
        content: htmlContent,
      };
    } else if (entry.isFile() && entry.name == 'info.json') {
      const fileContent = await fs.readFile(fullPath, 'utf8');
      let info = JSON.parse(fileContent);
      result.name = info.name || name;
      result.detail = info.detail || '';
    }
  }
  return result;
}

async function generateMarkdownJson() {
  const markdownRootDir = '../docs'; // 存放Markdown文件的目录
  const outputJsonPath = 'src/posts.js'; // 输出的JSON文件路径
  const assetsDest = path.join('public', 'assets'); // 资源文件目标目录

  try {
    // 先复制资源文件
    await fs.ensureDir(assetsDest);
    await copyAssets(markdownRootDir, assetsDest);
    
    const formattedPosts = await readDirRecursive(markdownRootDir, 'docs', markdownRootDir);
    await fs.writeFile(outputJsonPath, 'export let data=' + JSON.stringify(formattedPosts, null, 2) + ';', 'utf8');
    console.log('Markdown JSON generated successfully!');
  } catch (err) {
    console.error('Error generating Markdown JSON:', err);
  }
}

generateMarkdownJson();