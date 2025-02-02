import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.css'

import { createRouter, createWebHashHistory } from 'vue-router';


import Home from './components/Home.vue'
import Cnt from './components/Cnt.vue'
import List from './components/List.vue';

let routes=[
    // {
    //     path:'/home',
    //     component:Home,
    //     alias:'/',
    // },
    {
        path: '/list/:path*',
        component: List,
    },
    {
        path: '/list',
        alias:'/',
        component: List,
    },
    {
        path: '/cnt/:path*',
        component: Cnt,
    },
    // {
    //     path:'/list/:name',
    //     component:List,
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    mode: 'hash',
    routes
})

function init() {
            
    if (window.innerHeight>630) {
        if(window.innerWidth<window.innerHeight){
            document.body.classList.add('mobile');
        }else{
            document.body.classList.remove('mobile');
        }
    }else{
        document.body.classList.remove('mobile');
    }
}
window.onresize=init;
init();


createApp(App).use(router).mount('#app')