<template>
  <Menu></Menu>
  <router-view></router-view>
  <!-- <Live></Live> -->
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
  margin-left: 7px;
}

#path>.a:hover {
  color: var(--theme);
}

#path>.a:active {
  opacity: 0.7;
}

#path>*:not(:first-child)::before {
  content: '\F105';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  margin-right: 7px;
  color: #777;
}

</style>

<script setup>
import Menu from './components/Menu.vue';
import Live from './components/Live.vue';
import { provide, reactive } from 'vue';
import { data } from './posts.js';

provide('data', reactive(data));

// initWidget({
//   waifuPath: live2d_path + "waifu-tips.json",
//   //apiPath: "https://live2d.fghrsh.net/api/",
//   cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
//   tools: ["hitokoto", "asteroids", "photo", "info", "quit"]
// });

</script>