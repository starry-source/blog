<template>
  <title>星源的 Blog</title>
  <div id="path">
    <a href="#/list" class="a" v-if="route.params.path">blog</a>
    <a class="text" v-else>blog</a>
    <a v-for="(item, index) in route.params.path"
      :href="(index == route.params.path.length - 1) ? null : ('#/list/' + route.params.path.slice(0, index + 1).join('/'))"
      :class="(index == route.params.path.length - 1) ? 'text' : 'a'">{{ item }}</a>
  </div>
  <div id="body" class="page-list">
    <span id="dictname">{{ directory().name }}</span>
    <span id="dictdetail" v-html="directory().detail"></span>
    <div id="cnt">
      <div v-if="Object.keys(directory().file).length" class="list file" :class="{ big: path() != '' }">

        <a class="a" v-for="file in directory().file" :href="'#/cnt' + path() + '/' + file.slug">
          <span class="type" v-if="path() != ''">文章</span>
          <span class="name">{{ file.title }}</span>
          <span class="type" v-if="path() != ''">{{ file.slug }}.md</span>
        </a>
      </div>
      <div v-if="Object.keys(directory().folder).length" class="list dict" :class="{ big: path() == '' }">
        <a class="a" v-for="folder in directory().folder" :href="'#/list' + path() + '/' + folder.slug">
          <span class="type" v-if="path() == ''">分类</span>
          <span class="name">{{ folder.name }}</span>
        </a>

      </div>
    </div>

  </div>
</template>

<style scoped>

#body {
  margin: 0 50px;
  /* animation: fade 500ms; */
}

#cnt{
  animation: fade 500ms;
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

body.mobile #body {
  margin: 0 20px;
}

#dictname {
  font-size: 45px;
  margin-top: 10px;
  display: block;
}

#dictdetail {
  font-size: 17px;
  display: block;
  margin-left: 10px;
  color: #888;
  margin-bottom: 20px;
}

#cnt{
  display: flex;
}

body.mobile #cnt{
  flex-direction: column;
}

.list {
  padding: 10px;
  margin: 10px;
  /* background-color: #ffffffa0; */
  border-radius: 10px;
}

body.mobile .list{
  margin: 10px 0;
}

body:not(.mobile) .list:not(.big){
  width: 250px;
}

.list>.a {
  padding: 7px 12px;
  transition: 70ms;
}

.list.big{
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: row;
}

.list.big>.a {
  /* height: 90px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
}

body.mobile .list.big>.a{
  width: 100%;
  min-width: none;
  max-width: none;
}

.list.big>.a>.name {
  font-size: 25px;
  margin-left: 10px;
}

.list.big>.a>.type {
  color: #777;
  font-size: 15px;
}
@media (prefers-color-scheme: dark){
  .list{
    /* background-color: #000000a0; */
  }
}
</style>
<script setup>
import { inject, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'


const route = useRoute()

let data = inject('data');
// let directory = data.value;
// import DirectoryTree from './DirectoryTree.vue'; // 假设你有一个递归组件

function directory() {
  let ret = data;
  if (route.params.path) {
    for (const i of route.params.path) {
      ret = ret.folder[i];
    }

  }
  return ret;
}

function path() {
  return route.params.path ? '/' + route.params.path.join('/') : '';
}

// 相关快捷键(仅在本组件内生效)


document.addEventListener('keydown', (e) => {
  // 是否在此页
  if (!window.location.hash.startsWith('#/list')) {
    return;
  }

  // 如果在搜索框中，忽略快捷键
  if (document.activeElement.tagName === 'INPUT') {
    return;
  }
  
  // 返回上一级目录的浏览
  if (e.key === 'Backspace') {
    e.preventDefault();
    if (route.params.path && route.params.path.length > 0) {
      const newPath = route.params.path.slice(0, -1).join('/');
      window.location.hash = '#/list' + (newPath ? '/' + newPath : '');
    } else {
      // 已经在根目录，不能再返回
    }
  }
  // 上下在分类和文章列表中切换项目(先分类，再文章)，enter打开
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    const links = Array.from(document.querySelectorAll('#cnt .a'));
    if (links.length === 0) return;
    const activeElement = document.activeElement;
    let currentIndex = links.indexOf(activeElement);
    if (currentIndex === -1) {
      // 没有焦点，聚焦第一个
      links[0].focus();
    } else {
      // 有焦点，移动到下一个
      if (e.key === 'ArrowUp') {
        currentIndex = (currentIndex - 1 + links.length) % links.length;
      } else if (e.key === 'ArrowDown') {
        currentIndex = (currentIndex + 1) % links.length;
      }
      links[currentIndex].focus();
    }
  }
  if (e.key === 'Enter') {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.classList.contains('a')) {
      activeElement.click();
    }
  }



});

</script>