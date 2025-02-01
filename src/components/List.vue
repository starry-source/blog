<template>
  <div id="path">
      <a href="/list" class="a" v-if="route.params.path">blog</a>
      <a class="text" v-else>blog</a>
      <a v-for="(item,index) in route.params.path" :href="(index==route.params.path.length-1)?null:('/list/'+route.params.path.slice(0,index+1).join('/'))" :class="(index==route.params.path.length-1)?'text':'a'">{{ item }}</a>
  </div>
  <div id="body">
    <span id="dictname">{{ directory.name }}</span>
    <span id="dictdetail">{{ directory.detail }}</span>
    <div v-if="directory.file" class="list file" :class="{big:path!=''}">
      
      <a class="a" v-for="file in directory.file" :href="'/cnt'+path+'/'+file.slug">
        <span class="type" v-if="path!=''">文章</span>
        <span class="name">{{ file.title }}</span>
        <span class="type" v-if="path!=''">{{ file.slug }}.md</span>
      </a>
    </div>
    <div v-if="directory.folder" class="list dict" :class="{big:path==''}">
      
      <a class="a" v-for="folder in directory.folder" :href="'/list'+path+'/'+folder.slug">
        <span class="type" v-if="path==''">分类</span>
        <span class="name">{{ folder.name }}</span>
      </a>

    </div>
  </div>
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
  margin: 0 50px;
}
#dictname{
  font-size: 45px;
  margin-top: 10px;
  display: block;
}
#dictdetail{
  font-size: 17px;
  display: block;
  margin-left: 10px;
  color: #555;
  margin-bottom: 20px;
}
.list{
  margin: 10px 20px;
}
.list>.a{
  padding: 7px 12px;
}
.list.big>.a{
  /* height: 90px; */
  display: flex;
  flex-direction: column;
}
.list.big>.a>.name{
  font-size: 25px;
  margin-left: 10px;
}
.list.big>.a>.type{
  color:#777;
  font-size: 15px;
}

</style>

<script setup>
import { inject } from 'vue';
import { useRoute } from 'vue-router'


const route = useRoute()

let directory = inject('data');
// let directory = data.value;
// import DirectoryTree from './DirectoryTree.vue'; // 假设你有一个递归组件
let path='';
if(route.params.path){
  for (const i of route.params.path) {
    directory=directory.folder[i];
  }
  path='/'+route.params.path.join('/');
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