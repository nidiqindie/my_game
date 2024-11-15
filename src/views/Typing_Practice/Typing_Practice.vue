<template>
  <div class="all">
    <div class="nav" :class="{ 'hovered': isHovered }" @mouseover="isHovered = true" @mouseleave="isHovered = false">
      <img :src="p1" alt="你爹没加载出来">
      <el-button type="success" tag="router-link" to="/Typing_Practice/about" plain>游戏玩法介绍</el-button>
      <div class="settings">
        <div class="about" v-if="isabout_Hovered && isHovered">
          <div class="title">游戏难度：</div>
          <div class="set">
            倒计时：
            <el-button-group size="small" style="margin-bottom:0 ;">
              <el-button :icon="Minus" @click="decrease(1)" />
              <el-button :icon="Plus" @click="increase(1)" />
            </el-button-group>
            <el-progress :percentage="percentage1" :color="customColorMethod" :format="format" />
          </div>
          <div class="set">目标数：
            <el-button-group size="small" style="margin-bottom:0 ;">
              <el-button :icon="Minus" @click="decrease(2)" />
              <el-button :icon="Plus" @click="increase(2)" />
            </el-button-group>
            <el-progress :percentage="percentage2" :color="customColorMethod" />
          </div>
        </div>
        <img :src="p2" class="setting" alt="你爹没加载出来" @click="isabout_Hovered = !isabout_Hovered">

      </div>
    </div>
    <router-view class="content"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import p1 from '@/assets/p1.svg';
import p2 from '@/assets/p2.svg';
import { useSettingStore } from '@/stores/setting';
import { Minus, Plus } from '@element-plus/icons-vue'
const isHovered = ref(false);
const isabout_Hovered = ref(false);
let setting = useSettingStore()
const percentage1 = ref(10);
const percentage2 = ref(10);
setting.set_setting_all(percentage2.value, 11 - percentage1.value / 10)
const format = () => (`${11 - percentage1.value / 10}`);
watch(percentage1, () => {
  setting.set_setting_time(11 - percentage1.value / 10);
});
watch(percentage2, () => {
  setting.set_setting_count(percentage2.value);
});
const increase = (type: number) => {
  if (type == 1 && percentage1.value < 100)
    percentage1.value = percentage1.value + 10
  else if (type == 2 && percentage2.value < 100)
    percentage2.value = percentage2.value + 10
}//increase
const decrease = (type: number) => {
  if (type == 1 && percentage1.value >10)
    percentage1.value = percentage1.value - 10
  else if (type == 2 && percentage2.value >10)
    percentage2.value = percentage2.value - 10
}//increase
const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399'
  }
  if (percentage < 70) {
    return '#e6a23c'
  }
  return '#67c23a'
}
</script>

<style scoped lang="scss">
.all {
  width: 100vw;
  height: 100vh;
  background-color: rgb(23, 92, 153);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  //  justify-content: center;
  align-items: center;

  .content {
    margin-top: 20px;
  }

  .nav {
    caret-color: transparent;
    width: 75%;
    height: 10%;
    background-color: rgb(104, 134, 161);
    position: fixed;
    border-radius: 0px 0px 20px 20px;
    bottom: 97%;
    transition: bottom 1s ease-in-out;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .settings {
      width: 40px;
      height: 40px;
      position: relative;
      display: flex;
      flex-direction: column;

      .about {
        border-radius: 20px;
        position: absolute;
        top: 40px;
        left: 0;
        width: 200px;
        height: 200px;
        background-color: rgb(176, 180, 61);
        animation: fadeIn 0.3s ease-out;

        .set {
          text-align: center;
          border-radius: 20px;
          background-color: rgb(81, 34, 109);
        }

        div {
          margin: 10px 10px 20px 10px;
          color: rgb(124, 211, 172);

          &.title {
            font-weight: 600;
            font-size: 15px;

          }
        }
      }

      .setting {
        position: absolute;
        top: 0;
        left: 0;


        &:hover {
          cursor: pointer;
          animation: rotateIcon 2s infinite linear;
        }

      }
    }

    &.hovered {
      bottom: 90%;
    }

    img {
      width: 40px;
      height: 40px;
      margin: 0 10px;



    }
  }

}

@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
    /* 起始状态，不旋转 */
  }

  100% {
    transform: rotate(720deg);
    /* 结束时旋转两圈，即720度 */
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>



