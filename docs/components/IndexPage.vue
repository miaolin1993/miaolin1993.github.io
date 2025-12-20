<template>
  <div>
    <span>最新文章：</span>
    <div v-for="item in articles" :key="item.title">
      <a :href="item.link">{{ item.title }}</a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { useData } from 'vitepress'
const { theme  } = useData()
const articles = ref([])
onMounted(() => {
  if (theme.value.articles) {
    articles.value = theme.value.articles
    articles.value.forEach(item => {
      console.log(item)
    })
  }
})
</script>