<template>
  <div>
    <button 
      @click="isVisible = !isVisible"
      :disabled="isVisible"
      :style="{ 
        border: '1px solid #000', 
        padding: '2px 8px',
        cursor: 'pointer'
      }"
    >
      {{ isVisible ? '怎么样，找对了吗' : '点击查看答案' }}
    </button>
    <div :style="{ display: isVisible ? 'block' : 'none', marginTop: '8px' }">
      一共7个
      <ul>
        <li v-for="item in answer" :key="item">{{ item }}</li>
      </ul>
      <img src="/images/lufengchongpo/lianxidan.jpg" alt="练习答案" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isVisible = ref(false);
const answer = ['命宫', '兄弟宫', '子女宫', '财帛宫', '官禄宫', '田宅宫', '父母宫'];
</script>
