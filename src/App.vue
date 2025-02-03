<template>
  <Menu></Menu>
  <router-view></router-view>
  
  <link rel="stylesheet" href="/github.min.css" media="(prefers-color-scheme: light)">
  <link rel="stylesheet" href="/github-dark.min.css" media="(prefers-color-scheme: dark)">
  <!-- <p>app: {{ data }}</p> -->
</template>

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