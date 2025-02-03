import fs from 'fs-extra'
import path from 'path'
import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import hljs from 'highlight.js'

const myCustomLanguage = {
  case_insensitive: true,
  contains: [
    {
      className: 'comment',
      begin: '\\(', 
      end: '\\)',
      contains: []
    },
    {
      className: 'comment',
      begin: '\\（', 
      end: '\\）',
      contains: []
    },
    {
      className: 'string',
      begin: '"',
      end: '"',
      contains: []
    },
    {
      className: 'string',
      begin: '“',
      end: '”',
      contains: []
    },
    {
      className: 'string',
      begin: "'",
      end: "'",
      contains: []
    },
    {
      className: 'string',
      begin: "‘",
      end: "’",
      contains: []
    },
    {
      className: 'string',
      begin: "「",
      end: "」",
      contains: []
    },
    {
      className: 'title',
      begin: '# ?[\\s\\S]+?\n',
      returnEnd: true
    }
  ]
};


// 注册自定义语言到 highlight.js
hljs.registerLanguage('liter', ()=>myCustomLanguage);

// hljs
const md = new MarkdownIt({
    linkify: true,
    html:true
});

md.use(markdownItHighlightjs);
md.use((m)=>{
  m.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const hrefIndex = tokens[idx].attrIndex('href');
    const href = tokens[idx].attrs[hrefIndex][1];
    return `<a href="${href}" class="a jump">`;  // 添加自定义 class 或其他属性
  };
  m.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    return `<code class="inline">${tokens[idx].content}</code>`;  // 添加自定义 class 或其他属性
  }
  // m.renderer.rules.link_close = () => '</a>';
})

async function readDirRecursive(dirPath,name) {
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
      result.folder[entry.name]=await readDirRecursive(fullPath,entry.name);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // 处理 Markdown 文件
      const fileContent = await fs.readFile(fullPath, 'utf8');
      const htmlContent = md.render(fileContent.replace(/<!-.*-->/g, ''));
      const slug = path.basename(fullPath, '.md');

      // const titleMatch = fileContent.match(/^# (.*)/m);
      // const title = titleMatch ? titleMatch[1] : 'Untitled';
      const titleMatch = fileContent.match(/^<!-- name=(.+) -->/m)
      const title = titleMatch ? titleMatch[1] : slug;

      result.file[slug]={
        slug,
        title,
        content: htmlContent,
      };
    } else if (entry.isFile() && entry.name=='info.json') {
      const fileContent = await fs.readFile(fullPath, 'utf8');
      let info = JSON.parse(fileContent);
      // console.log(info);

      result.name=info.name||name;
      result.detail=info.detail||'';
    }
  }

  return result;
}

async function generateMarkdownJson() {
    const markdownRootDir = '../docs'; // 存放Markdown文件的目录
    const outputJsonPath = 'src/posts.js'; // 输出的JSON文件路径

  try {
    const formattedPosts = await readDirRecursive(markdownRootDir,'docs');

    // 将对象转换为数组，以便每个分类都是一个对象数组
    // const formattedPosts = Object.keys(postsByCategory).map(category => ({
    //   category,
    //   posts: postsByCategory[category],
    // }));
    

    await fs.writeFile(outputJsonPath, 'export let data='+JSON.stringify(formattedPosts, null, 2)+';', 'utf8');
    console.log('Markdown JSON generated successfully!');
  } catch (err) {
    console.error('Error generating Markdown JSON:', err);
  }
}

generateMarkdownJson();