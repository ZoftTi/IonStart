<template>
  <div class="touch-mask" v-right-click="rightMenuObj">
    <img :src="background_setting.background_url" alt="" />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue"
import { useStore } from "vuex"
const store = useStore()

const background_setting = computed(() => store.state.background_setting)

const judgeY = (clientY) => {
  if (clientY - 270 > 0) {
    return clientY - 270 + "px"
  } else {
    return clientY + "px"
  }
}

const rightMenuObj = {
  list: [
    {
      text: "添加网址",
      icon: "icon-edit",
      handler: (e) => {
        store.commit("UPDATE_ADD_STARS", {
          isShow: true,
          title: "",
          top: judgeY(e.clientY),
          left: e.clientX - 125 + "px",
          groupIndex: false,
        })
      },
    },
    {
      text: "刷新",
      icon: "icon-refresh",
      handler: () => {
        window.location.reload()
      },
    },
    {
      text: "设置",
      icon: "icon-settings",
      handler: () => {
        store.commit("CHANGE_APP_STATUS", {
          appKey: "setting",
          isShow: true,
        })
      },
    },
    {
      text: "搜索设置",
      icon: "icon-biaoshi",
      handler: () => {
        store.commit("CHANGE_APP_STATUS", {
          appKey: "search_engines",
          isShow: true,
        })
      },
    },
    {
      text: "背景设置",
      icon: "icon-beijingtupian",
      handler: () => {
        store.commit("CHANGE_APP_STATUS", {
          appKey: "background_setting",
          isShow: true,
        })
      },
    },
  ],
}
</script>

<style lang="less" scoped>
.touch-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 101vh;
  z-index: -1;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
