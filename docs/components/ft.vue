```vue
<template>
  <div class="ft">
    <form class="star-form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <label for="hualu-star">选择化禄星耀:</label>
        <select id="hualu-star" v-model="formData.hualuStar" class="form-select">
          <option value="">请选择</option>
          <option v-for="star in starOptions" :key="star" :value="star">{{ star }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="zuofu-star">选择天空星所在位置:</label>
        <select id="zuofu-star" v-model="formData.tiankongPosition" class="form-select">
          <option value="">请选择</option>
          <option v-for="position in positionOptions" :key="position" :value="position">{{ position }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="zuofu-star">选择左辅星所在位置:</label>
        <select id="zuofu-star" v-model="formData.zuofuPosition" class="form-select">
          <option value="">请选择</option>
          <option v-for="position in positionOptions" :key="position" :value="position">{{ position }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="santai-star">选择三台星所在位置:</label>
        <select id="santai-star" v-model="formData.santaiPosition" class="form-select">
          <option value="">请选择</option>
          <option v-for="position in positionOptions" :key="position" :value="position">{{ position }}</option>
        </select>
      </div>

      <div class="form-item">
        <label for="dekuong-star">选择地劫星所在位置:</label>
        <select id="dekuong-star" v-model="formData.dijiePosition" class="form-select">
          <option value="">请选择</option>
          <option v-for="position in positionOptions" :key="position" :value="position">{{ position }}</option>
        </select>
      </div>

      <button type="submit" class="submit-btn">提交</button>
    </form>
  </div>
</template>

<script>
// 常量区
const DZ_LIST = [
  '子', '丑', '寅', '卯', '辰', '巳',
  '午', '未', '申', '酉', '戌', '亥'
]

const SI_HUA = {
  廉贞: '甲',
  天机: '乙',
  天同: '丙',
  太阴: '丁',
  贪狼: '戊',
  武曲: '己',
  太阳: '庚',
  巨门: '辛',
  天梁: '壬',
  破军: '癸'
}
const SHI_OBJ = {
  亥: '子',
  子: '丑',
  丑: '寅',
  寅: '卯',
  卯: '辰',
  辰: '巳',
  巳: '午',
  午: '未',
  未: '申',
  申: '酉',
  酉: '戌',
  戌: '亥'
}

function getNianZhi(tiankong) {
  return DZ_LIST[(12 + DZ_LIST.indexOf(tiankong) - 1) % 12]
}

function getYue(zuofu) {
  return (12 + DZ_LIST.indexOf(zuofu) - 4 + 1) % 12 || 12
}

function getRI(santai, zuofu) {
  const resultList = []
  const zuofuIndex = DZ_LIST.indexOf(zuofu)
  const santaiIndex = DZ_LIST.indexOf(santai)
  const ri = (12 + santaiIndex - zuofuIndex) % 12 + 1
  let num = ri
  for (let i = 0; i < 3; i++) {
    if (num < 32) {
      resultList.push(num)
    }
    num += 12
  }
  console.log(zuofuIndex, santaiIndex, ri, resultList)
  return resultList.join(',')
}

function getShi(dijie) {
  return SHI_OBJ[dijie]
}

// 获取指定干支在最近的年份（过去最接近的年份）
function getRecentYearFromTianGanDiZhi(tianGan, diZhi) {
  const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  
  // 验证输入
  if (tiangan.indexOf(tianGan) === -1 || DZ_LIST.indexOf(diZhi) === -1) {
    throw new Error('无效的天干或地支');
  }
  
  // 以1984年甲子年为基准点
  const baseYear = 1984; // 甲子年
  const currentYear = new Date().getFullYear();
  
  // 计算目标干支在60甲子中的位置
  let targetPosition = 0;
  for (let i = 0; i < 60; i++) {
    if (tiangan[i % 10] === tianGan && DZ_LIST[i % 12] === diZhi) {
      targetPosition = i;
      break;
    }
  }
  
  // 计算基准年份对应的干支年份
  const targetYear = baseYear + targetPosition;
  
  // 计算最近的年份（过去最接近的年份）
  const diff = currentYear - targetYear;
  const cycles = Math.floor(diff / 60);
  
  return targetYear + cycles * 60;
}

// 函数区
export default {
  name: 'StarForm',
  data() {
    return {
      formData: {
        hualuStar: '',
        zuofuPosition: '',
        santaiPosition: '',
        tiankongPosition: '',
        dijiePosition: ''
      },
      starOptions: ['天机', '太阳', '武曲', '天同', '廉贞', '太阴', '贪狼', '巨门','天梁', '破军'],
      positionOptions: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    }
  },
  methods: {
    handleSubmit() {
      // 验证表单
      if (!this.formData.hualuStar || !this.formData.zuofuPosition || 
          !this.formData.santaiPosition || !this.formData.dijiePosition) {
        alert('请完成所有选项的选择');
        return;
      }
      const niangan = SI_HUA[this.formData.hualuStar]
      const nianzhi = getNianZhi(this.formData.tiankongPosition)
      const yanglinian = getRecentYearFromTianGanDiZhi(niangan, nianzhi)
      const yue = getYue(this.formData.zuofuPosition)
      
      alert(`
出生年：${niangan}${nianzhi}（${yanglinian}）${yue === 12 ? '（腊月需考虑是否年份 + 1）' : ''}\n
出生月：农历${yue}月\n
出生日: ${getRI(this.formData.santaiPosition, this.formData.zuofuPosition)}\n
出生时：${getShi(this.formData.dijiePosition)}时`);
    }
  }
}
</script>

<style scoped>
.ft {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.star-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  box-sizing: border-box;
}

.form-select:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 12px;
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
</style>
