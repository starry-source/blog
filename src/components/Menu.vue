<template>
    <div id="header">
        <div class="left">
            <a href="#/" class="a"><img src="../assets/ico.svg"/></a>
            
            <div class="menu">
                <a class="a" :class="{ active: now() == 'home' }" href="#/">红木</a>
                <a class="a" v-for="tag in data" :class="{ active: tag.slug == now() }"
                    :href="'#/list/' + tag.slug">{{ tag.name }}</a>
            </div>
            <span>
                <!-- p:{{ route.path }}
                f:{{ route.fullPath }}
                h:{{ route.hash }} -->
            </span>
        </div>
    </div>
</template>

<style scoped>
#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 7px rgba(0, 0, 0, .2);
    border-radius: 0 0 14px 14px;
    padding: 0 20px;
    margin: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.left {
    display: flex;
    align-items: center;
}
.left>.a>img{
    /* width: 40px; */
    height: 30px;
    display: block;
    margin-right: 10px;
}

.menu {
    display: flex;
    margin-left: 20px;
}

.menu>a {
    margin-right: 20px;
    cursor: pointer;
}

.menu>a.active {
    color: #2983cc;
    font-weight: bold;
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