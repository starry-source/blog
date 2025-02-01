<template>
  <Menu></Menu>
  <router-view></router-view>
  <!-- <p>app: {{ data }}</p> -->
</template>

<script setup>
import Menu from './components/Menu.vue';
import { provide } from 'vue';
import { data } from './posts.js';


// console.log()
// import { roter } from 'vue-router'
// const route = ()
// console.log(route.path, route.fullPath, route.name);

provide('data', data);

// import Menu from './components/Menu.vue';
// import { provide, ref } from 'vue';
// export default {
//   // data:{
//   //   data:ref(null)
//   // },
//   components: {
//     Menu
//   },
//   // provide() {
//   //   return {
//   //     data: this.data
//   //   };
//   // },
//   setup() {
//     const data = ref(null);
//     provide('data', data);
//     return { data };
//   },
//   created() {

    
// let currentRouter=(new URL(window.location.href)).pathname.split('/'),nw='home';
// for(let i=currentRouter.length-1;i>=0;i--){
//     if(currentRouter[i]!=''){
//         nw=currentRouter[i];
//         break;
//     }
// }

//     this.fetchData().then(data => {
//       this.data = data;
//       // console.log(data);
//       // provide('data', this.data);
//     });
    
//   },
//   methods: {
//     async fetchData() {
//       // try {
//         const response = await fetch('/posts.json'); // 替换为实际的 API URL
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         return jsonData;
        
//       // } catch (error) {
//       //   this.error = error.message;
//       // } finally {
//       //   this.loading = false;
//       // }
//     }
//   }
// };




// let directoryData = reactive(null);

// // fetch('/posts.json')
// //     .then(response => response.json())
// //     .then(data => {
// //       directoryData = data;
// //       console.log(data);
// //     })
// //     .catch(error => console.error('Error fetching the blog structure:', error));

// onMounted(async () => {
//   try {
//     const response = await fetch('/posts.json');
//     const data = await response.json();
//     directoryData = data;
//     // console.log(data);
//   } catch (error) {
//     console.error('Error fetching the blog structure:', error);
//   }
// });
</script>