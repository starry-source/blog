<template>
    <div id="header" :class="{ active: isMobileMenuOpen }">
        <div class="trueheader">
            <div class="left">
                <a href="#/" class="a"><img src="../assets/ico.svg" /></a>

                <div class="menu">
                    <a class="a" :class="{ active: now() == 'home' }" href="#/">红木</a>
                    <a class="a" v-for="tag in data.folder" :class="{ active: tag.slug == now() }"
                        :href="'#/list/' + tag.slug">{{ tag.name }}</a>
                </div>
            </div>

            <div class="right">
                <div class="search-trigger" @click="openSearch">
                    <i class="fas fa-search"></i>
                    <span>搜索</span>
                </div>

                <div class="social-icons">
                    <a href="https://github.com/starry-source" target="_blank" title="GitHub" class="a">
                        <i class="fab fa-github" style="font-size: 18px;"></i>
                    </a>
                    <a href="https://space.bilibili.com/2010692096" target="_blank" title="Bilibili" class="a">
                        <i class="fab fa-bilibili"></i>
                    </a>
                    <a href="https://github.com/starry-source/blog" target="_blank" title="项目仓库" class="a">
                        <i class="fas fa-code-branch"></i>
                    </a>
                </div>

                <a class="a mobile-menu-btn" @click="toggleMobileMenu">
                    <i class="fas fa-bars"></i>
                </a>
            </div>
        </div>
        <div class="mobile-menu" :class="{ active: isMobileMenuOpen } ">
            <div class="menu-items">
                <a class="a" :class="{ active: now() == 'home' }" href="#/" @click="closeMobileMenu">红木</a>
                <a class="a" v-for="tag in data.folder" :class="{ active: tag.slug == now() }"
                    :href="'#/list/' + tag.slug" @click="closeMobileMenu">{{ tag.name }}</a>
            </div>
            <div class="social-icons">
                <a href="https://github.com/starry-source" target="_blank">
                    <i class="fab fa-github"></i>GitHub
                </a>
                <a href="https://github.com/starry-source/blog" target="_blank">
                    <i class="fas fa-code-branch"></i>项目仓库
                </a>
                <a href="https://space.bilibili.com/2010692096" target="_blank">
                    <i class="fab fa-bilibili"></i>Bilibili
                </a>
            </div>
        </div>
    </div>

    <div v-if="isMobileMenuOpen" id="cover">
    </div>

    <MenuOverlay
        v-model:isSearchFocused="isSearchFocused"
    />
</template>

<style scoped>
#header {
    display: flex;
    flex-direction: column;
    max-height: 60px;
    background-color: #ffffffc0;
    box-shadow: 0 1px 14px rgba(0, 0, 0, .15);
    border: 2px solid #a0a0a030;
    border-top: none;
    border-radius: 0 0 14px 14px;
    margin: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    backdrop-filter: blur(20px) saturate(2) contrast(0.7);
    overflow: hidden;
    transition: 200ms;
}

#header>.trueheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    min-height: 60px;
}

#header.active {
    max-height: 280px;
}

.left {
    display: flex;
    align-items: center;
}

.left>.a>img {
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
    transition: 100ms;
}

.menu>.a:not(.active):hover,
.menu-items>.a:not(.active):hover {
    background-color: #a0a0a020;
}

.menu>.a:not(.active):active,
.menu-items>.a:not(.active):active {
    opacity: 0.7;
}

.menu>.a.active,
.menu-items>.a.active {
    color: #2983cc;
    font-weight: bold;
}

@media (prefers-color-scheme: dark) {
    #header {
        background-color: #171717c0;
    }

    .left>.a>img {
        filter: invert(0.98);
    }

    .menu>.a.active {
        color: #61ccff
    }
}

.right {
    display: flex;
    align-items: center;
}

/* 社交图标样式 */
.social-icons {
    display: flex;
    gap: 15px;
}

.social-icons>a {
    color: #666;
    font-size: 17px;
    transition: color 0.2s;
}

.social-icons a:hover {
    color: #2983cc;
}

/* 移动端样式 */
.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 5px;
    transition: 100ms;
}

.mobile-menu-btn:hover{
    filter: invert(0.3);
}

.mobile-menu-btn:active{
    opacity: 0.7;
}

.mobile-menu {
    display: none;
    /* position: fixed; */
    /* top: 60px; */
    left: 0;
    right: 0;
    padding: 5px 15px 15px 15px;
    /* transform: translateY(-100%); */
    transition: transform 0.3s;
}

.mobile-menu.active {
    transform: translateY(0);
}

.mobile-menu>.menu-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 1.2em;
}

.mobile-menu>.menu-items>.a {
    padding: 3px 6px;
    border-radius: 7px;
    transition: 100ms;
}

.mobile-menu .social-icons {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0 15px;
}

.mobile-menu .social-icons a {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1em;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
    #header {
        background-color: #171717c0;
    }

    .left>.a>img {
        filter: invert(0.98);
    }

    .menu>.a.active {
        color: #61ccff;
    }

    .social-icons a {
        color: #999;
    }

    .social-icons a:hover {
        color: #61ccff;
    }
}

body.mobile {

    .menu,
    .right .social-icons {
        display: none;
    }

    .mobile-menu-btn {
        display: block;
    }

    .mobile-menu {
        display: block;
    }

    #search{
        width: calc(100% - 30px);
        min-width: unset;
    }
}

.search-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    padding-right: 20px;
    border-radius: 7px;
    cursor: default;
    color: #666;
    transition: 100ms;
    margin-right: 15px;
    user-select: none;
}

.search-trigger:hover {
    background: #a0a0a020;
}

.search-trigger:active {
    opacity: 0.7;
}
</style>

<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import MenuOverlay from './MenuOverlay.vue';

const route = useRoute();
const isMobileMenuOpen = ref(false);
const isSearchFocused = ref(false);
const data = inject('data');

function now() {
    let route = useRoute();
    let currentRouter = route.path.split('/'), nw = 'home';
    if (currentRouter.length)
        for (let i = 0; i < currentRouter.length; i++) {
            if (currentRouter[i] != '' && currentRouter[i] != 'list' && currentRouter[i] != 'cnt') {
                nw = currentRouter[i];
                break;
            }
        }
    // console.log(nw);
    return nw;
}

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
    isMobileMenuOpen.value = false;
}

function openSearch() {
    isSearchFocused.value = true;
}
</script>