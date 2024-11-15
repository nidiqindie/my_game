<template>
  <div class="all" @keyup="handleKeyUp">
    <h1 style="color: aquamarine;">bro你要输入的是：</h1>
    <hr style="width: 100%;">
    <h2 style="color: aquamarine;">{{ word }}</h2>
    <h3>输入框(养成好习惯，输完敲回车😎😎)</h3>
    <input class="input" v-model="keyin" type="text">
    <h2>请在：{{ time_long }}s内输入指定的单词</h2>
    <div class="Scorebox">
      计分板
      <hr style="width: 100%; margin-bottom: 0;">
      <div class="boxall">
        <div class="score">得分😍😍
          <div class="flip">
            <transition name="fade">
              <p :key="count_POINT">{{ count_POINT }}</p>
            </transition>
          </div>
        </div>
        <div class="target">目标数🤓👆
          <div class="flip">
            <transition name="fade">
              <p :key="count_target">{{ count_target }}</p>
            </transition>
          </div>
        </div>
      </div>

    </div>
    <div class="start" @click="start">准备好了？那就开始吧</div>
  </div>

</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue';
import { getRandomUniqueNumbers } from '@/api/api';
import confetti from 'canvas-confetti';
import { useSettingStore } from '@/stores/setting';
const word_stdio = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "ice cream",
  "jackfruit",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pineapple",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "ugli fruit",
  "victoria plum",
  "watermelon",
  "xigua",
  "yellow passionfruit",
  "zucchini",
  "blueberry",
  "cantaloupe",
  "dragon fruit",
  "pomegranate",
  "apricot",
  "avocado",
  "berry",
  "blackberry",
  "boysenberry",
  "clementine",
  "damson",
  "feijoa",
  "gooseberry",
  "greengage",
  "guava",
  "huckleberry",
  "ilama",
  "jaboticaba",
  "kumquat",
  "loquat",
  "lychee",
  "mandarin",
  "mangosteen",
  "melon",
  "miracle fruit",
  "monstera deliciosa",
  "mulberry",
  "nectarina",
  "orangequat",
  "papaya",
  "passion fruit",
  "peach",
  "pear",
  "persimmon",
  "physalis",
  "pummelo",
  "quenepa",
  "rambutan",
  "redcurrant",
  "rockmelon",
  "rose apple",
  "santol",
  "satsuma",
  "soursop",
  "starfruit",
  "strawberry guava",
  "sugar apple",
  "tamarillo",
  "tangelo",
  "tayberry",
  "tomato",
  "ugli",
  "victoria",
  "white sapote",
  "yellow fig",
  "yuzu",
  "zabergau",
  "acerola",
  "ackee",
  "acorn squash",
  "adzuki bean",
  "almond",
  "ancho chili",
  "angelica",
  "anise",
  "aprium",
  "artichoke",
  "arugula",
  "asian pear",
  "asparagus",
  "aubergine",
  "avocado pear"
]
const word = ref('')
const keyin = ref('')
const time_long = ref(0)
const count_POINT = ref(0);
const count_target = ref(0);
let setting = useSettingStore();
let count = 0;
let index_array: number[] = [];
const simulateEnterKey = () => {
  const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
  handleKeyUp(enterEvent);
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (keyin.value != null) {

      count_target.value--;
      if (keyin.value === word.value) {
        count_POINT.value++;
      }
      keyin.value = '';
      if (count_target.value == 0) {
        //这里写游戏结束的动画
        if (timer) {
          clearInterval(timer);
        }
        alert("你完成他了！！这是你这轮的分数:" + count_POINT.value)
        if (count_POINT.value == setting.Setting.count) {
          confetti({
            particleCount: 200,
            spread: 70,
            angle: 45,
            origin: { y: 1, x: 0 }
          });
        }
      }
      else {
        word.value = word_stdio[index_array[++count]];
        startTimer();
      }

    }

  }
}
const start = () => {
  if (timer) {
    clearInterval(timer);
  }
  count_POINT.value = 0;
  count_target.value = setting.Setting.count;
  index_array = getRandomUniqueNumbers(0, word_stdio.length - 1, setting.Setting.count);
  isRunning.value = false;
  count = 0;
  startTimer();
  word.value = word_stdio[count];

}
const isRunning = ref<boolean>(false);
let timer: number | null = null;

const startTimer = () => {
  time_long.value = setting.Setting.time;
  if (!isRunning.value && time_long.value > 0) {
    isRunning.value = true;
    timer = window.setInterval(() => {

      if (time_long.value > 0) {
        time_long.value--;
      } else {
        stopTimer();
      }
    }, 1000);
  }
};

const stopTimer = () => {
  time_long.value = 0;
  isRunning.value = false;
  if (timer) {
    clearInterval(timer);
  }

  //在这里处理一次输入结束的逻辑
  simulateEnterKey();
};

// const resetTimer = (retime: number) => {
//   stopTimer();
//   time_long.value = retime; // 重置为 60 秒
// };

// 组件销毁期间清理定时器
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped lang="scss">
.all {

  caret-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    border-radius: 20px;
  }

  h1,
  h2,
  h3 {
    color: aquamarine;
  }

  .start {
    box-shadow: 0 0 10px #000;
    cursor: pointer;
    margin-top: 10%;
    height: 10%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: rgb(103, 211, 186);
    position: relative;
    overflow: hidden;
    z-index: 11;
    transition: transform 1s ease-in-out;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, red, blue);
      top: 0;
      left: 0;
      z-index: -1; // 确保伪元素在文本下面
    }

    &:hover {
      transform: scale(1.2); // 将组件等比放大20%
    }
  }

  .Scorebox {
    font-weight: 700;
    background-color: aquamarine;
    width: 50%;
    height: 30%;
    color: rgb(53, 105, 177);
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px #000;

    .boxall {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 30%;
      margin: 2% 2%;
      flex: 1; // 占据剩余的高度

      .flip {
        // perspective: 1000px; // 增强3D效果
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40%;
        height: 70%;
        background-color: rgb(233, 223, 223);
        // overflow: hidden;
        box-shadow: 0 0 10px;
        transition: transform 1s ease-in-out;
        position: relative;

        .fade-enter-active,
        .fade-leave-active {
          transition: opacity 0.5s;
        }

        .fade-enter-to,
        .fade-leave-from {
          opacity: 1;
        }

        .fade-enter-from,
        .fade-leave-to {
          opacity: 0;
        }
      }

      .score {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 40%;
        height: 80%;
        // background-color: black;
        // flex: 1;
      }

      .target {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 40%;
        height: 80%;
      }
    }
  }

  .input {
    width: 50%;
    height: 4%;
    border-radius: 20px;
    border: olive 5px solid;
    font-size: 20px;
    box-shadow: 0 0 10px #000;
  }
}
</style>
