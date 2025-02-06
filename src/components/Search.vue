<template>
    <title>搜索「{{ searchQuery }}」| 星源的 Blog</title>
    <div id="path">
        <a href="#/list" class="a">blog</a>
        <span class="text">搜索结果</span>
    </div>
    
    <div id="body">
        <span class="tit">搜索结果 <small v-if="searchQuery">| {{ searchQuery }}</small></span>
        <p v-if="searchResults.length === 0">未找到相关文章</p>
        <div class="list big" v-else>
            <a v-for="result in searchResults" :key="result.slug" class="a" :href="'#/cnt/' + result.path.join('/')" >
                <span class="name">{{ result.title }}</span>
                <span class="cnt">{{ getPreview(result.content) }}</span>
                <span class="type">
                    于 {{ result.path.join(' / ') }}.md
                </span>
            </a>
        </div>
    </div>
</template>

<style scoped>

#body {
  margin: 0 50px;
  /* animation: fade 500ms; */
}
body.mobile #body {
  margin: 0 20px;
}

#body>.tit{
  font-size: 45px;
  margin-top: 10px;
  display: block;
}


.list {
  padding: 10px;
  margin: 10px;
  background-color: #ffffffa0;
  border-radius: 10px;
}

body.mobile .list{
  margin: 10px 0;
}

.list>.a {
  padding: 7px 12px;
  transition: 70ms;
}

.list.big{
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: row;
}

.list.big>.a {
  /* height: 90px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
}

body.mobile .list.big>.a{
  width: 100%;
  min-width: none;
  max-width: none;
}

.list.big>.a>.name {
  font-size: 25px;
  margin-left: 10px;
}

.list.big>.a>.type {
  color: #999;
  font-size: 15px;
  margin-left: 10px;
}

.list.big>.a>.cnt {
  color: #777;
  font-size: 14px;
  margin: 5px 0;
}
@media (prefers-color-scheme: dark){
  .list{
    background-color: #000000a0;
  }
}

</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const searchResults = ref([]);
const searchQuery = ref('');
const searchType = ref('');

function updateSearchResults() {
    const stored = localStorage.getItem('searchResults');
    if (stored) {
        const { results, query, type } = JSON.parse(stored);
        searchResults.value = results;
        searchQuery.value = query;
        searchType.value = type;
    }
}

function getPreview(content) {
    const plainText = content.replace(/<[^>]+>/g, '');
    // 简单截取预览，不再高亮
    return plainText.slice(0, 98) + '...';
}

onMounted(() => {
    updateSearchResults();
    window.addEventListener('search-updated', updateSearchResults);
});

onUnmounted(() => {
    window.removeEventListener('search-updated', updateSearchResults);
});
</script>
