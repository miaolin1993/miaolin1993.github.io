<template>
  <div class="lx-zw-pp-container">
    <div class="lx-zw-pp-main">
      <div
        v-for="v in displayList"
        :class="v.class"
        :data-index="v.index"
        :key="`${v.index}${v.class}${v.title}`"
      >
        <div :class="v?.boxScale ? 'scale-box' : ''">
          <div v-if="v.zwList" class="star-container">
            <div class="star-box">
              <span
                v-for="(l, index) in v.zwList"
                :key="`${l}${index}`"
                class="pp-main-star"
              >
                {{ l }}
              </span>
              <span
                v-for="(l, index) in v.tfList"
                :key="`${l}${index}`"
                class="tf-star"
              >
                {{ l }}
              </span>
              <span
                v-for="(l, index) in v.ljList"
                :key="`${l}${index}`"
                class="lj-star"
              >
                {{ l }}
              </span>
              <span
                v-for="(l, index) in v.lsList"
                :key="`${l}${index}`"
                class="ls-star"
              >
                {{ l }}
              </span>
              <span
                v-for="(l, index) in v.ptList"
                :key="`${l}${index}`"
                class="pt-star"
              >
                {{ l }}
              </span>
            </div>
          </div>
          <div v-if="v?.statusList" class="star-liangdu">
            <span
              v-for="(x, index) in v.statusList"
              :key="`${x}${index}`"
            >
              {{ x }}
            </span>
          </div>
          <div v-if="v?.sihuaList" class="star-sihua">
            <div
              v-for="(i, index) in v.sihuaList"
              :class="i ? 'active' : ''"
              :key="`${i}${index}`"
            >
              <span>{{ i }}</span>
            </div>
          </div>
        </div>
        <div class="tgdz">
          <div class="tg">{{ v.tg }}</div>
          <div class="dz">{{ v.title }}</div>
        </div>
        <div class="daxian">{{ v.daXianShow }}</div>
        <div class="changsheng">{{ v.changShengShow }}</div>
        <div class="shiershen">
          <div class="boshi">{{ v.boshiShow }}</div>
          <div>{{ v.jiangqianShow }}</div>
          <div>{{ v.taisuiShow }}</div>
        </div>
        <div class="baseName">
          <span>{{ v.baseName }}</span>
          <span v-if="v.shen" class="shengong">*身</span>
        </div>
      </div>
      <div class="pp-infos">
        <div class="base">
          <span>姓名：{{ name }}</span>
          <span>{{ genderState }}</span>
          <span>{{ wuxj }}</span>
        </div>
        <div>农历：{{ date }}</div>
        <div>
          <span>命主：{{ zwResult?.mingzhu || "" }}</span>
          <span>身主：{{ zwResult?.shenzhu || "" }}</span>
          <span>子斗：{{ zwResult?.zidou || '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import getMainList from '@miaolin777/zwpp-data'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
})

const zwResult = computed(() => getMainList(props.date, props.gender))
// console.log('zwResult:', zwResult.value)


const name = ref('东派紫微')
const date = computed(() => props.date)


const displayList = computed(() => zwResult.value?.list)
const wuxj = computed(() => zwResult.value?.wuxj || "")
const genderState = computed(() => zwResult.value?.genderState || "")


watch(() => [props.date, props.gender], () => {
  zwResult.value = getMainList(props.date, props.gender)
}, { immediate: true })
</script>

<style scoped> 
.lx-zw-pp-container {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 12px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  position: relative;
}

.lx-zw-pp-main {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 375px;
  /* padding-left: 6px; */
  margin-bottom: 12px;
  > div {
    position: relative;
    width: 86px;
    height: 86px;
    padding: 2px;
    border: 1px solid #000;

    .tgdz {
      position: absolute;
      z-index: 999;
      line-height: 1.2;
      font-size: 10px;
      right: 2px;
      bottom: 2px;
    }
    .baseName {
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 100%;
      text-align: center;
      font-size: 10px;
      border: none;
      span {
        font-size: 10px;
      }
      .shengong {
        color: pink;
      }
    }
  }
  .base:hover {
    background-color: #eee;
    cursor: pointer;
  }
  .active {
    background-color: #eee;
  }
  .no-b {
    border-bottom: 0px solid transparent;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
  }
  .no-r {
    border-right: 0px solid transparent;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
  }
  .no-b-r {
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    border-top: 1px solid #000;
    border-left: 1px solid #000;
  }
  .no-b-l {
    border-left: 0px solid transparent;
    border-bottom: 0px solid transparent;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
  }
  .no-b-l-r {
    border-left: 0px solid transparent;
    border-bottom: 0px solid transparent;
    border-top: 1px solid #000;
    border-right: 1px solid transparent;
  }
  .no-b-r-t {
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    border-top: 1px solid transparent;
    border-left: 1px solid #000;
  }
  .no-b-r-t-l {
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
  }
  .scale-box {
    position: relative;
    left: -14px;
    top: -5px;
    transform: scale(.7); 
  }
  .star-container {
    width: 80px;
    font-size: 0;
    .star-box {
      display: flex;
      font-size: 0;
      margin-bottom: 1px;
      line-height: 1.1;
    }
    span {
      font-size: 10px;
      writing-mode: vertical-lr;
    }
    .pp-main-star {
      color: rgba(192, 0, 0);
    }
    .tf-star {
      color: rgba(192, 0, 0);
    }
    .lj-star {
      color: rgba(128, 0, 128, .7);
    }
    .pt-star {
      color: rgba(3, 81, 159);
    }
    .status-box {
      border: none;
      font-size: 10px;

      span:nth-child(1) {
        margin-right: 1px;
      }
    }
  }
  .star-liangdu {
    display: flex;
    line-height: 1;

    span {
      transform: scale(.9);
      min-width: 10px;
      font-size: 10px;
      margin-right: 1px;
    }
  }
  .star-sihua {
    display: flex;
    height: 16px;
    div {
      display: flex;
      text-align: center;
      align-items: center;
      color: #fff;
      width: 11px;
      font-size: 8px;
      margin-right: 1px;
      padding: 0 2px;
    }
    .active {
      background-color: rgba(231, 86, 70);
    }
  }
  .pp-infos {
    position: absolute;
    top: 94px;
    left: 94px;
    width: 170px;
    height: 170px;
    /* background-color: red; */
    border: none;
    font-size: 8px;

    span {
      margin-right: 8px;
    }
  }
  .daxian {
    position: absolute;
    top: 54px;
    left: 28px;
    font-size: 10px;
  }
  .changsheng {
    position: absolute;
    right: -6px;
    bottom: 34px;
    writing-mode: vertical-rl;
    text-align: bottom;
    font-size: 10px;
    transform: scale(.7);
  }
  .shiershen {
    position: absolute;
    left: -1px;
    bottom: -2px;
    font-size: 10px;
    line-height: 1;
    transform: scale(.8);

    .boshi {
      color: rgba(24, 162, 163);
    }
  }
}

/* PC端样式 */
@media screen and (min-width: 769px) {
  .lx-zw-pp-main {
    width: 640px;
    height: 600px;
    > div {
      width: 150px;
      height: 150px;
      .tgdz {
        font-size: 18px;
      }
      .baseName {
        bottom: -2px;
        span {
          font-size: 16px;
        }
      }
    }
    .scale-box {
      left: -24px;
      top: -6px;
    }
    .star-container {
      width: 150px;
      span {
        font-size: 16px;
        writing-mode: vertical-lr;
      }

      .status-box {
        span:nth-child(1) {
          margin-right: 2px;
        }
        .status-name {
          font-size: 14px;
        }
      }
    }
    .star-liangdu {
      padding-left: 1px;
      span {
        min-width: 16px;
        font-size: 16px;
        margin-right: 2px;
      }
    }
    .star-sihua {
      height: 20px;

      div {
        width: 16px;
        font-size: 14px;
        margin-right: 2px;
        padding: 0 1px;
      }
    }
    .pp-infos {
      width: 300px;
      height: 300px;
      position: absolute;
      top: 158px;
      left: 158px;
      font-size: 16px;

      span {
        margin-right: 20px;
      }
    }
    .daxian {
      top: 109px;
      left: 55px;
      font-size: 14px;
    }
    .changsheng {
      right: -3px;
      bottom: 46px;
      writing-mode: vertical-rl;
      text-align: bottom;
      font-size: 16px;
    }
    .shiershen {
      position: absolute;
      left: -1px;
      bottom: -2px;
      font-size: 16px;
      line-height: 1;
    }
  }
}

</style>