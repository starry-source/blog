<template>
  <Menu></Menu>
  <router-view></router-view>
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