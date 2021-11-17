<template>
  <div class="tab" :style="tabAttribute.style">
    <transition name="crosswise-appear">
      <div class="float-control" v-if="show_float_control">
        <div class="control-item flex-center" @click="closeTab()">
          <i class="iconfont icon-close" />
        </div>
        <div class="control-item control-move flex-center" v-drag="{ type: 'tab' }">
          <i class="iconfont icon-move2"></i>
        </div>
      </div>
    </transition>
    <div class="scroll_wrap" :style="{ height: tabAttribute.style.height }" ref="scroll_content">
      <div class="container">
        <div class="header" v-drag="{ type: 'tab' }">
          <h2>{{ tabAttribute.subTitle }}</h2>
          <i class="iconfont icon-close close-tab" @click="closeTab()" />
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useStore } from "vuex"

const store = useStore()
const props = defineProps({
  tabAttribute: {
    type: Object,
  },
})

const closeTab = () => {
  store.commit("CHANGE_APP_STATUS", {
    appKey: props.tabAttribute.title,
    isShow: false,
  })
}

const scroll_content = ref(null)
const show_float_control = ref(false)

onMounted(() => {
  scroll_content.value.addEventListener("scroll", () => {
    if (scroll_content.value.scrollTop >= 80) {
      show_float_control.value = true
    }else if(scroll_content.value.scrollTop < 80) {
      show_float_control.value = false
    }
  })
})
</script>

<style lang="less" scoped>
.tab {
  position: absolute;

  width: 280px;
  height: 400px;
  left: 80px;
  top: 60px;

  border-radius: 8px;

  background-color: var(--primary-background-color);
  transition: background-color 0.4s ease;
  -webkit-transition: background-color 0.4s ease;

  z-index: 100;

  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.2);

  .scroll_wrap {
    overflow-y: scroll;
    height: 400px;
    padding-bottom: 20px;

    .container {
      width: 100%;
      padding: 0 20px;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        color: var(--primary-text-color);
        background-color: var(--primary-background-color);

        transition: color 0.4s ease, background-color 0.4s ease;
        -webkit-transition: color 0.4s ease, background-color 0.4s ease;

        h2 {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          cursor: move;

          font-size: 24px;
          font-weight: 400;
        }

        .close-tab {
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }

  .float-control {
    position: absolute;
    z-index: -10;
    right: -55px;
    top: 15px;

    .control-item {
      width: 40px;
      height: 40px;
      margin-bottom: 10px;

      border-radius: 50%;
      cursor: pointer;
      background-color: var(--primary-background-color);
      color: var(--primary-text-color);

      transition: color 0.4s ease, background-color 0.4s ease;
      -webkit-transition: color 0.4s ease, background-color 0.4s ease;
    }

    .control-move {
      cursor: move;
    }
  }

  .crosswise-appear-enter-active {
    animation: crosswise-appear-in 0.4s;
  }

  .crosswise-appear-leave-active {
    animation: crosswise-appear-in 0.4s reverse;
  }

  @keyframes crosswise-appear-in {
    0% {
      opacity: 0;
      transform: translateX(-55px);
    }
    50% {
      transform: translateX(7px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}
</style>
