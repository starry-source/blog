<template>
    <div id="header">
        <div class="left">
            <a href="#/" class="a"><img src="../assets/ico.svg"/></a>
            
            <div class="menu">
                <a class="a" :class="{ active: now() == 'home' }" href="#/">红木</a>
                <a class="a" v-for="tag in data" :class="{ active: tag.slug == now() }"
                    :href="'#/list/' + tag.slug">{{ tag.name }}</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #ffffffc0;
    box-shadow: 0 1px 14px rgba(0, 0, 0, .15);
    border: 2px solid #8f8f8f30;
    border-top: none;
    border-radius: 0 0 14px 14px;
    padding: 0 20px;
    margin: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    backdrop-filter: blur(20px) saturate(2) contrast(0.7);
}

.left {
    display: flex;
    align-items: center;
}
.left>.a>img{
    /* width: 40px; */
    height: 32px;
    display: block;
    margin: 0 3px;
}

.menu {
    display: flex;
    margin-left: 14px;
}

.menu>.a {
    margin-right: 8px;
    cursor: pointer;
    padding: 3px 7px;
    border-radius: 7px;
    transition: 50ms;
}

.menu>.a:not(.active):hover {
    background-color: #8f8f8f20;
}

.menu>.a:not(.active):active {
    opacity: 0.7;
}

.menu>.a.active {
    color: #2983cc;
    font-weight: bold;
}
@media (prefers-color-scheme: dark){
    #header{
        background-color: #171717c0;
    }
    .left>.a>img{
        filter: invert(0.98);
    }
    .menu>.a.active{
        color:#61ccff
    }
}
</style>


<script setup>
import { inject } from 'vue';
import { useRoute } from 'vue-router'


function now() {
    let route = useRoute();
    let currentRouter=route.path.split('/'),nw='home';
    if(currentRouter.length)
    for(let i=0;i<currentRouter.length;i++){
        if(currentRouter[i]!='' && currentRouter[i]!='list' && currentRouter[i]!='cnt'){
            nw=currentRouter[i];
            break;
        }
    }
    // console.log(nw);
    return nw;
}


let data = inject('data');
data = data.folder;
</script>