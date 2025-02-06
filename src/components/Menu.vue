<template>
    <!-- <div></div> -->
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
                    <a href="https://space.bilibili.com/your-id" target="_blank" title="Bilibili" class="a">
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
                <a href="https://space.bilibili.com/your-id" target="_blank">
                    <i class="fab fa-bilibili"></i>Bilibili
                </a>
            </div>
        </div>
    </div>

    <div v-if="isMobileMenuOpen" id="cover">
    </div>

    <!-- 搜索界面 -->
    <div class="search-overlay" v-if="isSearchFocused" @click="closeSearch">
        <div id="search">
            <div class="search-container" @click.stop>
                <i class="fas fa-search search-icon"></i>
                <input type="text" v-model="searchQuery" placeholder="搜索..." @keyup.enter="handleSearch"
                    @keydown.up.prevent="handleScopeNavigation(-1)" @keydown.down.prevent="handleScopeNavigation(1)"
                    @keydown.esc="closeSearch" ref="searchInput" autofocus />
                <a class="a close-search" @click="closeSearch">
                    <i class="fas fa-times"></i>
                </a>
            </div>
            <div class="search-options" @mousedown.prevent>
                <div class="search-scope">
                    <div class="scope-option" v-for="(option, index) in availableScopes" :key="option.value" :class="{
                        active: searchScope === option.value,
                        'keyboard-focused': currentScopeIndex === index
                    }" @click.stop="selectScope(option.value)">
                        <i :class="option.icon"></i>
                        {{ option.label }}
                    </div>
                </div>
                <div class="search-type" v-if="searchScope !== 'current' || getCurrentContext?.type !== 'file'">
                    <div class="type-option" :class="{ active: searchType === 'title' }"
                        @click.stop="searchType = 'title'">
                        <i class="fas fa-heading"></i>
                        标题
                    </div>
                    <div class="type-option" :class="{ active: searchType === 'content' }"
                        @click.stop="searchType = 'content'">
                        <i class="fas fa-align-left"></i>
                        内容
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
#header {
    display: flex;
    flex-direction: column;
    max-height: 60px;
    background-color: #ffffffc0;
    box-shadow: 0 1px 14px rgba(0, 0, 0, .15);
    border: 2px solid #8f8f8f30;
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
    background-color: #8f8f8f20;
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


/* 搜索相关样式 */
.search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
}

#search {
    display: flex;
    flex-direction: column;
    width: 50%;
    min-width: 400px;
    max-width: 600px;
}

.search-container {
    position: relative;
    display: flex;
    align-items: center;
    background: #ffffffc0;
    backdrop-filter: blur(15px);
    border: 1px solid #7f7f7f30;
    border-radius: 14px;
    padding: 5px 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.search-container>i {
    margin: 0 5px;
}

.search-container>input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: none;
    background: none;
    outline: none;
}

.search-container>input:hover {
    filter: brightness(1.2);
}

.search-container>input:focus {
    filter: none;
}

.search-container>.close-search {
    margin: 5px;
    transition: 100ms;
}

.search-container>.close-search:hover {
    filter: invert(0.3);
}

.search-container>.close-search:active {
    opacity: 0.7;
}

.search-options {
    margin-top: 10px;
    background: #ffffffc0;
    backdrop-filter: blur(15px);
    border-radius: 14px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 10px;
    border: 1px solid #70707040;
}

.search-scope,
.search-type {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.search-type {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #70707040;
}

.scope-option,
.type-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 7px;
    cursor: pointer;
    transition: 100ms;
}

.scope-option:hover,
.type-option:hover {
    background: #7f7f7f17;
}

.scope-option:active,
.type-option:active {
    opacity: 0.7;
}

.scope-option.active,
.type-option.active {
    background: #2983cc20;
    color: #2983cc;
}

.keyboard-focused {
    outline: 2px solid #2983cc;
}

@media(prefers-color-scheme: dark) {
    .search-container>input {
        color: #fff;
    }

    .search-container,
    .search-options {
        background: #171717d0;
    }

    .scope-option.active,
    .type-option.active {
        background: #61ccff20;
        color: #61ccff;
    }

    .keyboard-focused {
        outline: 2px solid #61ccff;
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
    background: #8f8f8f20;
}

.search-trigger:active {
    opacity: 0.7;
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

/* #cover{
    top: 0;left: 0;height: 100%;width: 100%;
    position: fixed;background-color: #00000030;
    transition-delay: 1s;
} */

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
</style>


<script setup>
import { inject, ref, computed, watch, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const searchType = ref('title');
const isMobileMenuOpen = ref(false);
const isSearchFocused = ref(false);
const searchScope = ref('global');
const searchInput = ref(null);
const currentScopeIndex = ref(0);
const isMobileSearchOpen = ref(false);

const data = inject('data');

const getCurrentContext = computed(() => {
    const path = (route.params.path || []);

    // 如果不在任何有效路径中，返回 null
    if (!route.path.startsWith('/cnt/') && !route.path.startsWith('/list/')) {
        return null;
    }

    try {
        let currentData = data;

        if (route.path.startsWith('/cnt/')) {
            // 当前在文章页面
            for (let i = 0; i < path.length - 1; i++) {
                if (!currentData.folder[path[i]]) {
                    console.warn('Invalid path:', path);
                    return null;
                }
                currentData = currentData.folder[path[i]];
            }

            const fileSlug = path[path.length - 1];
            if (!currentData.file[fileSlug]) {
                console.warn('Invalid file:', fileSlug);
                return null;
            }

            return {
                type: 'file',
                name: currentData.file[fileSlug].title,
                data: currentData.file[fileSlug]
            };
        } else {
            // 当前在目录页面
            for (let i = 0; i < path.length; i++) {
                if (!currentData.folder[path[i]]) {
                    console.warn('Invalid folder path:', path);
                    return null;
                }
                currentData = currentData.folder[path[i]];
            }

            return {
                type: 'folder',
                name: currentData.name,
                data: currentData
            };
        }
    } catch (err) {
        console.warn('Error getting context:', err);
        return null;
    }
});

const availableScopes = computed(() => {
    const scopes = [];

    if (getCurrentContext.value) {
        // 当前在文章内或文件夹内时，将局部搜索放在第一位
        scopes.push({
            value: 'current',
            label: getCurrentContext.value.type === 'folder'
                ? `在当前目录中搜索`
                : `在当前文章中搜索`,
            icon: getCurrentContext.value.type === 'folder'
                ? 'fas fa-folder'
                : 'fas fa-file-alt'
        });
    }

    // 始终添加全局搜索选项
    scopes.push({
        value: 'global',
        label: '全局搜索',
        icon: 'fas fa-globe'
    });

    return scopes;
});

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

function handleSearch() {
    if (!searchQuery.value.trim()) return;

    // 确保在文章内搜索时走高亮逻辑
    if (searchScope.value === 'current' && getCurrentContext.value?.type === 'file') {
        const query = searchQuery.value.trim();
        const baseHash = window.location.hash.split('?')[0];
        window.location.hash = `${baseHash}?highlight=${encodeURIComponent(query)}`;
        searchQuery.value = '';
        closeSearch();
        return;
    }

    search();
}

function handleSearchFocus() {
    isSearchFocused.value = true;
    // 自动设置搜索范围
    if (route.path === '/search') {
        searchScope.value = 'global';
    } else if (getCurrentContext.value) {
        searchScope.value = 'current';
    } else {
        searchScope.value = 'global';
    }
    // 默认搜索标题
    searchType.value = 'title';
}

function search() {
    if (!searchQuery.value.trim()) return;

    const searchResults = [];
    const searchText = searchQuery.value.toLowerCase();

    function searchInData(data, path = []) {
        for (const [slug, file] of Object.entries(data.file)) {
            if (searchType.value === 'title' && file.title.toLowerCase().includes(searchText)) {
                searchResults.push({ ...file, path: [...path, slug] });
            } else if (searchType.value === 'content' && file.content.toLowerCase().includes(searchText)) {
                searchResults.push({ ...file, path: [...path, slug] });
            }
        }

        for (const [slug, folder] of Object.entries(data.folder)) {
            searchInData(folder, [...path, slug]);
        }
    }

    if (searchScope.value === 'current' && getCurrentContext.value?.type === 'folder') {
        // 局部目录搜索
        searchInData(getCurrentContext.value.data, route.params.path || []);
    } else {
        // 全局搜索
        searchInData(data, []);
    }

    // 存储搜索结果（无需存储 highlight 信息）
    localStorage.setItem('searchResults', JSON.stringify({
        results: searchResults,
        query: searchText,
        type: searchType.value
    }));

    searchQuery.value = '';

    if (route.path !== '/search') {
        router.push('/search');
    } else {
        window.dispatchEvent(new CustomEvent('search-updated'));
    }
    closeSearch();
}

function handleScopeNavigation(direction) {
    const maxIndex = availableScopes.value.length - 1;
    currentScopeIndex.value = Math.max(0, Math.min(maxIndex, currentScopeIndex.value + direction));
    selectScope(availableScopes.value[currentScopeIndex.value].value);
}

function selectScope(value) {
    searchScope.value = value;
    currentScopeIndex.value = availableScopes.value.findIndex(scope => scope.value === value);
}

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
    isMobileMenuOpen.value = false;
}

// function toggleMobileSearch() {
//     isMobileSearchOpen.value = true;
//     nextTick(() => {
//         mobileSearchInput.value?.focus();
//     });
// }

// function closeMobileSearch() {
//     isMobileSearchOpen.value = false;
//     searchQuery.value = '';
// }

function openSearch() {
    isSearchFocused.value = true;

    // 更安全的搜索范围设置
    if (route.path === '/search') {
        searchScope.value = 'global';
        currentScopeIndex.value = availableScopes.value.length - 1;
    } else if (getCurrentContext.value) {
        searchScope.value = 'current';
        currentScopeIndex.value = 0;
    } else {
        searchScope.value = 'global';
        currentScopeIndex.value = 0;
    }

    searchType.value = 'title';
    nextTick(() => {
        searchInput.value?.focus();
    });
}

function closeSearch() {
    isSearchFocused.value = false;
    searchQuery.value = '';
}

// 监听 Escape 键
onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
});

// data = data.folder;
</script>