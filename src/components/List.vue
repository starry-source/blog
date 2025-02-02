<template>
  <div id="path">
    <a href="#/list" class="a" v-if="route.params.path">blog</a>
    <a class="text" v-else>blog</a>
    <a v-for="(item, index) in route.params.path"
      :href="(index == route.params.path.length - 1) ? null : ('#/list/' + route.params.path.slice(0, index + 1).join('/'))"
      :class="(index == route.params.path.length - 1) ? 'text' : 'a'">{{ item }}</a>
  </div>
  <div id="body">
    <span id="dictname">{{ directory().name }}</span>
    <span id="dictdetail">{{ directory().detail }}</span>
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
#path {
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  user-select: none;
}

#path>* {
  margin-left: 5px;
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
  margin: 0 50px;
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
  color: #555;
  margin-bottom: 20px;
}

#cnt{
  display: flex;
}

body.mobile #cnt{
  flex-direction: column;
}

.list {
  margin: 10px 20px;
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

// const directory = data.value[route.params.name];
// console.log(data);
// defineProps(['path']);
//   export default {
//     components: {
//       DirectoryTree
//     },
//     props: ['directory'],
//     computed: {
//       currentPath() {
//         return this.$route.params.path.split('/').filter(Boolean);
//       }
//     },
//     created() {
//       // 如果需要从父组件传递的数据，可以在这里处理
//       // 例如，this.directory = this.$props.directory; 但在这个例子中，我们已经通过 props 传递了
//     }
//   };
</script>