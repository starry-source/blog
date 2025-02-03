
<template>
    <div id="path">
        <a href="#/list" class="a">blog</a>
        <a v-for="(item, index) in route.params.path"
            :href="(index == route.params.path.length - 1) ? null : ('#/list/' + route.params.path.slice(0, index + 1).join('/'))"
            :class="(index == route.params.path.length - 1) ? 'text' : 'a'">{{ (index == route.params.path.length - 1)?item+'.md':item }}</a>
    </div>
    <div v-html="file.content" id="body"></div>
</template>
<style scoped>


@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

#path {
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    user-select: none;
}

#path>* {
    margin-left: 5px;
    animation: fade 500ms;
}

#path>.a:hover {
    color: #2983cc;
}

#path>*:not(:first-child)::before {
    content: '/';
    margin-right: 5px;
    color: #777;
}

#body {
    margin: 20px 20px;
    padding: 5px 30px;
    font-size: 16px;
    padding-bottom: 40px;
    background-color: #ffffffa0;
    border-radius: 10px;
    animation: fade 500ms;
}
</style>
<style>

pre code.hljs{
    border-radius: 10px;
    width: max-content;
    padding: 20px;
    max-width: 100%;
    font-size: 14px;
    /* border: 2px solid #7f7f7f; */
}

pre code.hljs.language-liter{
    white-space: pre-line;
    background-color: #f0ebdcce;
    color: #000;
    font-size: 1.2em;
    font-family: 'Times New Roman', Times, "SimSun", "NSimSun", "STSong", "宋体", serif;
}
.hljs.language-liter::selection,
.hljs.language-liter *::selection{
    background-color: #c7a07230;
    text-decoration: underline #a27f57;
    /* color: #fff; */
}
code.hljs.language-liter .hljs-comment{
    color: #888;
}
code.hljs.language-liter .hljs-title{
    color: #070707;
    font-weight: bold;
    font-size: 1.4em;
    
}
code.hljs.language-liter .hljs-string{
    color: #237bc4;
    
}

.a.jump{
    color: #2983cc;
}

.a.jump:hover{
    text-decoration: underline;
    filter: brightness(1.2);
}

.a.jump:active{
    opacity: 0.7;
}

#body ul, #body ol{
    padding-left: 21px;
}

#body h1, #body h2, #body h3, #body h4, #body h5, #body h6{
    font-weight: 100;
}

#body h1{
    font-size: 2.5em;
}

#body h2{
    font-size: 2em;
}

#body h3{
    font-size: 1.6em;
}

#body h4{
    font-size: 1.3em;
}

#body h5{
    font-size: 1.1em;
}

#body h6{
    font-size: 0.9em;
}

blockquote{
    margin-block-start: 5px;
    margin-block-end: 5px;
    margin-inline-start: 10px;
    margin-inline-end: 0;
    padding: 5px 5px 5px 15px;
    border-radius: 0 10px 10px 0;
    background-color: #7f7f7f14;
    border-left: 3px solid #2983cc;
}
blockquote p{
    margin: 2px 0;
}
code.inline{
    background-color: #7f7f7f27;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 0.9em;
}

/* 通用表格样式 */
table {
    border-collapse: collapse;
    margin: 10px 0;
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
}

/* 表头样式 */
thead tr {
    background-color: #2983cc20;
    font-weight: bold;
}

/* 表头单元格样式 */
th, td {
    padding: 12px 15px;
    border: 1px solid #7f7f7f70;
    /* border-width: ; */
}

tbody tr:nth-of-type(even) {
    background-color: #7f7f7f18;
}

</style>

<script setup>
import { inject } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

let file = inject('data');
// let directory = data.value;
// import DirectoryTree from './DirectoryTree.vue'; // 假设你有一个递归组件
//   if(route.params.path){
for (let i = 0; i < route.params.path.length - 1; i++) {
    file = file.folder[route.params.path[i]];
}
file = file.file[route.params.path[route.params.path.length - 1]];
// path='/'+route.params.path.join('/');
//   }

</script>