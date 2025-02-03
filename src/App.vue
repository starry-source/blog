<template>
  <Menu></Menu>
  <router-view></router-view>
  <!-- <p>app: {{ data }}</p> -->
</template>
<style>

#path {
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  user-select: none;
  transition: 50ms;
}

#path>* {
  margin-left: 5px;
}

#path>.a:hover {
  color: #2983cc;
}

#path>.a:active {
  opacity: 0.7;
}

#path>*:not(:first-child)::before {
  content: '/';
  margin-right: 5px;
  color: #777;
}

@media (prefers-color-scheme: dark){
  #path>.a:hover{
    color: #61ccff;
  }
}

</style>

<script setup>
import Menu from './components/Menu.vue';
import { provide, reactive } from 'vue';
import { data } from './posts.js';


// console.log()
// import { roter } from 'vue-router'
// const route = ()
// console.log(route.path, route.fullPath, route.name);

provide('data', reactive(data));

</script>