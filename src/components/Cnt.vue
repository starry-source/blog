<template>
    <div id="path">
        <a href="#/list" class="a">blog</a>
        <a v-for="(item,index) in route.params.path" :href="(index==route.params.path.length-1)?null:('#/list/'+route.params.path.slice(0,index+1).join('/'))" :class="(index==route.params.path.length-1)?'text':'a'">{{ item }}</a>
    </div>
    <div v-html="file.content" id="body"></div>
  </template>
  
<style scoped>
#path{
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    user-select: none;
}
#path>*{
    margin-left: 5px;
}
#path>.a:hover{
    color: #2983cc;
}
#path>*:not(:first-child)::before{
    content: '/';
    margin-right: 5px;
    color: #777;
}

#body{
    margin:0 50px
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
    for (let i=0;i<route.params.path.length-1;i++) {
      file=file.folder[route.params.path[i]];
    }
    file=file.file[route.params.path[route.params.path.length-1]];
    // path='/'+route.params.path.join('/');
//   }
  
  </script>