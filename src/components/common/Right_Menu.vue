<template>
  <div
    class="right-menu"
    :class="{
      'right-menu-show': store.state.rightMenu.isShow,
      'right-menu-hide': !store.state.rightMenu.isShow,
    }"
    :style="{
      display: rightMenuIsShow ? 'block' : 'none',
      top: store.state.rightMenu.top,
      left: store.state.rightMenu.left,
    }"
  >
    <div
      class="menu-item"
      v-for="item in store.state.rightMenu.list"
      @click="item.handler"
    >
      <div class="icon">
        <i class="iconfont" :class="item.icon"></i>
      </div>
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, watch, ref } from "vue"
import { useStore } from "vuex"

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore()

    const rightMenuIsShow = ref("")

    watch(
      computed(() => store.state.rightMenu.isShow),
      (newValue) => {
        if (newValue || !rightMenuIsShow) {
          rightMenuIsShow.value = true
        } else if (rightMenuIsShow && !newValue) {
          setTimeout(() => {
            rightMenuIsShow.value = false
          }, 200)
        }
      }
    )

    document.addEventListener("click", () => {
      // 隐藏右键菜单
      store.dispatch("updateRightMenu", {
        isShow: false,
      })
    })

    return {
      store,
      rightMenuIsShow,
    }
  },
})
</script>

<style lang="less" scoped>
.right-menu-hide {
  animation: hide-elastic 0.4s;
}

@keyframes hide-elastic {
  0% {
    opacity: 1;
    transform: scale(1.05);
  }

  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

.right-menu-show {
  animation: show-elastic 0.4s;
}

@keyframes show-elastic {
  70% {
    opacity: 1;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.right-menu {
  position: absolute;
  width: 140px;
  z-index: 999;
  border-radius: 10px;
  overflow: hidden;

  background-color: var(--background-pure);
  transform-origin: left top;
  transition: transform 0.4s, top 0.4s, left 0.4s, opatity 0.4s;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px;

  opacity: 0;
  transform: scale(0.5);
  animation-fill-mode: forwards;

  .menu-item {
    height: 40px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.25s;

    &:hover {
      background-color: var(--background-transparent-hover);
    }

    .icon {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
