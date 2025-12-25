<template>
  <div class="article-box">
    <ul v-for="item in articles" :key="item.title">
      <li class="article">
        <a :href="item.link">{{ item.title }}</a>
        <span>{{ item.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
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

<style scoped>
  .article-box ul {
    padding: 0;
  }
  .article {
    display: flex;
    justify-content: space-between;
  }
</style>