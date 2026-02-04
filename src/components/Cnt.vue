<template>
  <title>{{ file.title }} | 星源的 Blog</title>
    <div id="path">
        <a href="#/list" class="a">blog</a>
        <a v-for="(item, index) in route.params.path"
            :href="(index == route.params.path.length - 1) ? null : ('#/list/' + route.params.path.slice(0, index + 1).join('/'))"
            :class="(index == route.params.path.length - 1) ? 'text' : 'a'">{{ (index == route.params.path.length - 1)?item+'.md':item }}</a>
    </div>
    <div id="body">
        <div v-html="file.content" id="cnt-cnt"></div>
        <div class="article-actions">
            <div v-if="hasHighlight" class="hlbox">
                <a class="button" @click="prevHighlight" title="上一个匹配">
                    <i class="fas fa-chevron-up"></i>
                </a>
                <a class="highlight-count">
                    {{ currentHighlightIndex + 1 }}/{{ highlightCount }}
                </a>
                <a class="button" @click="nextHighlight" title="下一个匹配">
                    <i class="fas fa-chevron-down"></i>
                </a>
                <a class="button" @click="clearHighlight">
                    <i class="fas fa-eraser"></i>
                    清除搜索
                </a>
            </div>
            <a class="button" @click="shareArticle">
                <i :class="copied ? 'fas fa-check' : 'fas fa-link'"></i>
                {{ copied ? '已复制' : '复制链接' }}
            </a>
        </div>
    </div>
</template>
<style scoped>

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

#body {
    margin: 20px 20px;
    padding: 5px 30px;
    font-size: 16px;
    padding-bottom: 40px;
    background-color: #ffffffa0;
    border-radius: 10px;
    animation: fade 500ms;
    outline: 2.5px solid transparent;
    transition: outline-color 200ms;
    --olcl: #2983cc;
}

@media (prefers-color-scheme: dark){
    #body{
        background-color: #000000a0;
        --olcl: #61ccff;
    }
}

body.mobile #body{
    margin: 20px 0;
    border-radius: 0;
}

.article-actions {
    display: flex;
    gap: 10px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    margin: 0;
    user-select: none;
}

.article-actions>.button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    border: none;
    border-radius: 7px;
    background: #2983cc;
    color: white;
    cursor: default;
    transition: 100ms;
    font-size: 1em !important;
}

.article-actions>.button:hover {
    filter: brightness(1.15);
}
.article-actions .button:active {
    opacity: 0.7;
}

.article-actions>.hlbox{
    display: flex;
    padding: 5px;
    background-color: #ffffffd0;
    color: #000;
    backdrop-filter: blur(5px);
    border-radius: 7px;
    gap: 10px;
}
.article-actions>.hlbox>*{
    display: flex;
    align-items: center;
    gap: 5px;
    /* padding: 3px 12px; */
    border: none;
    border-radius: 7px;
    /* background: #2983cc; */
    cursor: default;
    transition: 100ms;
}
.article-actions>.hlbox>.button{
    border-radius: 5px;
    padding: 1px 7px;
}
.article-actions>.hlbox>.button:hover{
    background-color: #a0a0a029;
}


@media (prefers-color-scheme: dark) {
    .article-actions>.button {
        background: #61ccff;
        color: #000;
    }
    .article-actions>.hlbox{
        color: #fff;
        background-color: #333333c0;
    }
}
</style>
<style>

pre code.hljs{
    border-radius: 10px;
    width: max-content;
    padding: 20px;
    max-width: 100%;
    font-size: 14px;
    border: 2px solid #a0a0a027;
    font-family: 'Cascadia Code','Ubuntu Mono', 'Consolas', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI';
}

pre code.hljs.language-liter{
    white-space: pre-wrap;
    background-color: #f0ebdcce;
    color: #000;
    font-size: 1.2em;
    font-family: 'Times New Roman', Times, "SimSun", "NSimSun", "STSong", "宋体", serif;
    padding: 35px calc(20% - 60px);
    margin: 0 auto;
}

body.mobile pre code.hljs.language-liter{
    padding: 30px 20px;
    width: 100%;
}

.hljs.language-liter::selection,
.hljs.language-liter *::selection{
    background-color: #c7a07230;
    text-decoration: underline #a27f57;
    /* color: #fff; */
}
code.hljs.language-liter .hljs-comment{
    color: #888;
}
code.hljs.language-liter .hljs-title{
    color: #070707;
    font-weight: bold;
    font-size: 1.4em;
}
code.hljs.language-liter .hljs-quote{
    font-family: '楷体','楷体_GB2312','SimKai','KaiTi','STKaiti';
    color: #030404;
    display: inline-block;
    padding: 25px 20px;
}
code.hljs.language-liter .hljs-string{
    color: #164a75;
    
}
code.hljs.language-liter .hljs-long{
    display: inline-block;
    transform: translateY(-2px);
    letter-spacing: 5px;
    margin: 0 5px;
}


code.hljs.language-liter .hljs-author{
    color: #999;
    font-size: 0.9em;
}

.a.jump{
    color: #2983cc;
}

.a.jump:hover{
    text-decoration: underline;
    filter: brightness(1.2);
}

.a.jump:active{
    opacity: 0.7;
}

#body ul, #body ol{
    padding-left: 21px;
}

#body h1, #body h2, #body h3, #body h4, #body h5, #body h6{
    font-weight: 100;
}

#body h1{
    font-size: 2.5em;
}

#body h2{
    font-size: 2em;
}

#body h3{
    font-size: 1.6em;
}

#body h4{
    font-size: 1.3em;
}

#body h5{
    font-size: 1.1em;
}

#body h6{
    font-size: 0.9em;
}

blockquote{
    margin-block-start: 5px;
    margin-block-end: 5px;
    margin-inline-start: 10px;
    margin-inline-end: 0;
    padding: 5px 5px 5px 15px;
    border-radius: 0 10px 10px 0;
    background-color: #a0a0a014;
    border-left: 3px solid #2983cc;
}
blockquote p{
    margin: 2px 0;
}
code.inline{
    background-color: #b0b0b043;
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 0.9em;
    font-family: 'Cascadia Code','Ubuntu Mono', 'Consolas', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI';
}

/* 通用表格样式 */
table {
    border-collapse: collapse;
    margin: 10px 0;
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
}

/* 表头样式 */
thead tr {
    background-color: #2983cc20;
    font-weight: bold;
}

/* 表头单元格样式 */
th, td {
    padding: 12px 15px;
    border: 1px solid #a0a0a070;
    /* border-width: ; */
}

tbody tr:nth-of-type(even) {
    background-color: #a0a0a018;
}

mark {
    background-color: #2983cc40;
    border: 2px solid #2983cc;
    padding: 2px;
    margin: -4px;
    border-radius: 5px;
    transition: 100ms ease;
}

mark.current {
    background-color: #2983cc;
    color: #fff;
}

@media (prefers-color-scheme: dark){
    .a.jump{
        color: #61ccff;
    }
    blockquote{
        border-left-color: #61ccff;
    }
    
    pre code.hljs.language-liter{
        background-color: #35322cce;
        color: #f2f2f2;
    }
    code.hljs.language-liter .hljs-quote{
        color: #f8f8f8;
    }
    pre code.hljs{
        background-color: #171717;
    }
    .hljs.language-liter::selection,
    .hljs.language-liter *::selection{
        background-color: #c7a07230;
        text-decoration: underline #d1a674;
        /* color: #fff; */
    }
    code.hljs.language-liter .hljs-comment{
        color: #999;
    }
    code.hljs.language-liter .hljs-title{
        color: #eee;
        
    }
    code.hljs.language-liter .hljs-string{
        color: #b5d4eb;
        
    }
    
    mark {
        background-color: #61ccff37;
        border-color: #61ccff80;
        color: #fff;
    }
    mark.current {
        background-color: #61ccff;
        color: #000;
    }
}
</style>

<script setup>
import { inject, onMounted, onUnmounted, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();

let file = inject('data');
// let directory = data.value;
// import DirectoryTree from './DirectoryTree.vue'; // 假设你有一个递归组件
//   if(route.params.path){
for (let i = 0; i < route.params.path.length - 1; i++) {
    file = file.folder[route.params.path[i]];
}
file = file.file[route.params.path[route.params.path.length - 1]];
// path='/'+route.params.path.join('/');
//   }

const hasHighlight = ref(false);
const copied = ref(false);
const currentHighlightIndex = ref(0);
const highlightCount = ref(0);

function shareArticle() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            copied.value = true;
            setTimeout(() => {
                copied.value = false;
            }, 2000);
        });
}

function clearHighlight() {
    const baseHash = window.location.hash.split('?')[0];
    window.location.hash = baseHash;

    hasHighlight.value = false;
    document.querySelector('#cnt-cnt').innerHTML=file.content;
}

function scrollToHighlight(index) {
    const highlights = document.querySelectorAll('mark');
    if (highlights.length === 0) return;
    
    // 确保索引在有效范围内
    currentHighlightIndex.value = Math.max(0, Math.min(index, highlights.length - 1));
    
    const target = highlights[currentHighlightIndex.value];
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 移除之前的当前高亮样式
    highlights.forEach(h => h.classList.remove('current'));
    // 添加当前高亮样式
    target.classList.add('current');
}

function nextHighlight() {
    scrollToHighlight((currentHighlightIndex.value + 1) % highlightCount.value);
}

function prevHighlight() {
    scrollToHighlight((currentHighlightIndex.value - 1 + highlightCount.value) % highlightCount.value);
}

function highlightText() {
    const hashParts = window.location.hash.split('?');
    if (hashParts.length < 2) {
        hasHighlight.value = false;
        clearHighlight();
        return;
    }
    
    const params = new URLSearchParams(hashParts[1]);
    const query = params.get('highlight');
    
    if (!query) {
        hasHighlight.value = false;
        clearHighlight();
        return;
    }
    hasHighlight.value = true;
    
    // 清除旧的高亮
    document.querySelector('#cnt-cnt').innerHTML=file.content;
    
    const content = document.querySelector('#body');
    if (!content) return;

    const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                return node.parentNode.nodeName !== 'SCRIPT' && 
                       node.parentNode.nodeName !== 'STYLE' ? 
                       NodeFilter.FILTER_ACCEPT : 
                       NodeFilter.FILTER_REJECT;
            }
        },
        false
    );
    
    const regex = new RegExp(query, 'gi');
    const nodesToReplace = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.textContent.match(regex)) {
            nodesToReplace.push(node);
        }
    }
    
    nodesToReplace.forEach(node => {
        const span = document.createElement('span');
        span.innerHTML = node.textContent.replace(regex, '<mark>$&</mark>');
        node.parentNode.replaceChild(span, node);
    });
    // 添加新的高亮
    
    // 更新高亮计数
    const highlights = document.querySelectorAll('mark');
    highlightCount.value = highlights.length;
    currentHighlightIndex.value = 0;
    
    // 如果有高亮结果，自动滚动到第一个
    if (highlights.length > 0) {
        nextTick(() => {
            scrollToHighlight(0);
        });
    }
}

// 添加键盘快捷键支持
onMounted(() => {
    nextTick(() => {
        highlightText();
    });
    window.addEventListener('hashchange', () => {
        nextTick(() => {
            highlightText();
        });
    });
    // window.addEventListener('keydown', (e) => {
    //     if (!hasHighlight.value) return;
        
    //     if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    //         e.preventDefault();
    //         nextHighlight();
    //     } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
    //         e.preventDefault();
    //         prevHighlight();
    //     }

    // });
    window.addEventListener('keydown', (e) => {

        // ctrl+A 全选文章内容（#cnt-cnt）（防止默认全选整个页面）
        if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            const cnt = document.getElementById('cnt-cnt');
            if (!cnt) return;

            const range = document.createRange();
            range.selectNodeContents(cnt);
            
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            const body = document.getElementById('body');
            if (!body) return;
            body.style.outlineColor = 'var(--olcl)';
            setTimeout(() => {
                body.style.outlineColor = 'transparent';
            }, 300);
        }
    });
});



onUnmounted(() => {
    window.removeEventListener('hashchange', highlightText);
});
</script>