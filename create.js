import fs from 'fs-extra'
import path from 'path'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
    linkify: true
});

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
      const htmlContent = md.render(fileContent).replace(/&lt;!-.*--&gt;/g, '');
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
    const markdownRootDir = 'src/docs'; // 存放Markdown文件的目录
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