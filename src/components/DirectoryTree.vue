<template>
    <div>
      <div v-if="directory.name">
        <h2>{{ directory.name }}</h2>
      </div>
      <div v-if="directory.folder && directory.folder.length">
        <ul>
          <li v-for="folder in directory.folder" :key="folder.name">
            <DirectoryTree
              :directory="folder"
              :currentPath="currentPath.concat(folder.name || 'unnamed-folder')"
            />
          </li>
        </ul>
      </div>
      <div v-if="directory.file && directory.file.length">
        <ul>
          <li v-for="file in directory.file" :key="file.slug">
            <a :href="'/file/' + file.slug">{{ file.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>

defineProps(['directory', 'currentPath']);
console.log(directory);

  </script>