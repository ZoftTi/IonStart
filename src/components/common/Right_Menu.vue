<template>
  <transition name="elastic">
    <div
      class="right-menu"
      v-if="state.menu.isShow"
      :style="{
        top: state.menu.top,
        left: state.menu.left,
      }"
      @contextmenu.prevent
    >
      <div
        class="menu-item"
        v-for="item in state.menu.list"
        @click="item.handler"
      >
        <div class="icon">
          <i class="iconfont" :class="item.icon"></i>
        </div>
        <span>{{ item.text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useStore } from "vuex"

const store = useStore()
const state = store.state

document.addEventListener("click", () => {
  // 隐藏右键菜单
  store.commit("UPDATE_RIGHT_MENU", {
    isShow: false,
  })
})
</script>

<style lang="less" scoped>
.elastic-enter-active {
  animation: elastic-in 0.4s;
}

.elastic-leave-active {
  animation: elastic-out 0.4s;
}

@keyframes elastic-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  70% {
    opacity: 1;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes elastic-out {
  0% {
    opacity: 1;
    transform: scale(1.05);
  }

  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

.right-menu {
  position: absolute;
  width: 140px;
  z-index: 999;
  border-radius: 8px;
  overflow: hidden;

  color: var(--primary-text-color);
  background-color: var(--primary-background-color);
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px;

  transform-origin: left top;
  transition: transform 0.4s, top 0.4s, left 0.4s, opatity 0.4s, background-color 0.4s ease, color 0.4s ease;
  -webkit-transition: transform 0.4s, top 0.4s, left 0.4s, opacity 0.4s, background-color 0.4s ease, color 0.4s ease;

  .menu-item {
    height: 40px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.25s;

    &:hover {
      background-color: var(--tertiary-background-color);
    }

    .icon {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
