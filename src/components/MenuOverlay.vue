<template>
    <Transition name="fade">
        <div class="search-overlay" v-if="isSearchFocused" @click="closeSearch">
            <div id="search" :class="{ 'search-active': isSearchOptionsVisible }">
                <div class="search-container" @click.stop>
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" v-model="searchQuery" placeholder="搜索..." @keyup.enter="handleSearch"
                        @keydown.up.prevent="handleScopeNavigation(-1)" @keydown.down.prevent="handleScopeNavigation(1)"
                        @keydown.esc="closeSearch" ref="searchInput" autofocus />
                    <a class="a close-search" @click="closeSearch">
                        <i class="fas fa-times"></i>
                    </a>
                </div>
                <Transition name="slide">
                    <div class="search-options" v-show="isSearchOptionsVisible" @mousedown.prevent>
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
                </Transition>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, computed, nextTick, onMounted,inject, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    isSearchFocused: Boolean
});

const emits = defineEmits(['update:isSearchFocused']);

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const searchType = ref('title');
const searchScope = ref('global');
const searchInput = ref(null);
const currentScopeIndex = ref(0);
const data=inject('data');
const isSearchOptionsVisible = ref(false);

const getCurrentContext = computed(() => {
    const path = (route.params.path || []);

    if (!route.path.startsWith('/cnt/') && !route.path.startsWith('/list/')) {
        return null;
    }

    try {
        let currentData = data;

        if (route.path.startsWith('/cnt/')) {
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

    scopes.push({
        value: 'global',
        label: '全局搜索',
        icon: 'fas fa-globe'
    });

    return scopes;
});

function handleSearch() {
    if (!searchQuery.value.trim()) return;

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
        searchInData(getCurrentContext.value.data, route.params.path || []);
    } else {
        searchInData(data, []);
    }

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

function closeSearch() {
    emits('update:isSearchFocused', false);
    searchQuery.value = '';
}

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
});

// 监听搜索框显示状态
watch(() => props.isSearchFocused, (newVal) => {
    if(newVal) {
        // 打开搜索框时,先设置默认搜索范围
        if(getCurrentContext.value?.type) {
            searchScope.value = 'current';
            currentScopeIndex.value = 0;
        } else {
            searchScope.value = 'global';
            currentScopeIndex.value = availableScopes.value.length - 1;
        }
        
        // 延迟显示选项菜单,产生动画效果
        nextTick(() => {
            isSearchOptionsVisible.value = true;
            // 确保输入框获得焦点
            searchInput.value?.focus();
        });
    } else {
        isSearchOptionsVisible.value = false;
    }
});
</script>

<style scoped>
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
    transform-origin: top center;
}

#search.search-active {
    transform: translateY(0);
}

.search-container {
    position: relative;
    display: flex;
    align-items: center;
    background: #ffffffc0;
    backdrop-filter: blur(15px);
    border: 2px solid #a0a0a040;
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
    overflow: hidden;
    margin-top: 10px;
    background: #ffffffc0;
    backdrop-filter: blur(15px);
    border-radius: 14px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 10px;
    border: 2px solid #a0a0a040;
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

body.mobile {
    #search{
        width: calc(100% - 30px);
        min-width: unset;
    }
}

/* 添加动画相关样式 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
    max-height: 300px;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
    padding: 0;
}
</style>
