<template>
  <div>
    <div class="form-container">
      <h3>东派紫微斗数排盘</h3>
      <form @submit.prevent="submitForm" class="zw-form">
        <div class="form-group">
          <label for="lunarDate">农历时间</label>
          <input
            id="lunarDate"
            v-model="formData.lunarDate"
            type="text"
            placeholder="请输入农历时间，如：2020-09-09 16:30"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>性别</label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                type="radio"
                v-model="formData.gender"
                value="1"
                class="radio-input"
              />
              <span class="radio-label">男</span>
            </label>
            <label class="radio-option">
              <input
                type="radio"
                v-model="formData.gender"
                value="0"
                class="radio-input"
              />
              <span class="radio-label">女</span>
            </label>
          </div>
        </div>

        <button type="submit" class="submit-btn">提交</button>
      </form>
    </div>
    <!-- 显示紫微盘结果 -->
    <div v-if="showResult" class="result-container">
      <PpComponent :date="resultData.date" :gender="resultData.gender" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
// 引入同目录下的pp.vue组件
import PpComponent from "./pp.vue"

// 定义表单数据
const formData = reactive({
  lunarDate: "2020-09-09 16:30",
  gender: "1", // 默认为男性
})

// 控制结果组件显示
const showResult = ref(false)
const resultData = reactive({
  date: "",
  gender: "",
})

// 提交表单函数
const submitForm = () => {
  if (!formData.lunarDate) {
    alert("请输入农历时间")
    return
  }

  // 设置结果数据
  resultData.date = formData.lunarDate
  resultData.gender = formData.gender

  // 显示结果组件
  showResult.value = true
  console.log(
    "表单数据:",
    {
      date: formData.lunarDate,
      gender: formData.gender,
    },
    showResult.value
  )
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.form-container h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.zw-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 5px rgba(64, 158, 255, 0.3);
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-input {
  margin-right: 5px;
}

.radio-label {
  user-select: none;
}

.submit-btn {
  padding: 12px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #66b1ff;
}

.submit-btn:active {
  background-color: #3a8ee6;
}

.result-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>
