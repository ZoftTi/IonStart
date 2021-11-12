<template>
  <div class="tab" :style="tabAttribute.style">
    <div class="scroll_wrap" :style="{ height: tabAttribute.style.height }">
      <div class="container">
        <div class="header" v-drag>
          <h2>{{ tabAttribute.subTitle }}</h2>
          <i class="iconfont icon-close close-tab" @click="closeTab()" />
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  
  overflow: hidden;
  z-index: 100;

  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.2);

  .container {
    width: 100%;
    padding: 0 20px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--primary-text-color);

      transition: color 0.4s ease;
      -webkit-transition: color 0.4s ease;

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

  .scroll_wrap {
    overflow-y: scroll;
    height: 400px;
    padding-bottom: 20px;
  }
}
</style>
