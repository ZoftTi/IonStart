<template>
  <transition name="appear">
    <Tab :tabAttribute="tabAttribute" v-if="store.state.appStatus.setstars_icons">
      <div class="content">
        <div class="row input-box">
          <span class="input-span">网站地址</span>
          <input
            type="text"
            class="input-website"
            placeholder="https://cn.bing.com/"
          />
        </div>
        <div class="row input-box">
          <span class="input-span">图标地址</span>
          <input
            type="text"
            class="input-icons"
            placeholder="https://cn.bing.com/"
          />
        </div>

        <div class="row span-box">
          <span>1. 网页地址为需要缓存网页的地址</span>
          <span>2. 图标地址为缓存的图标地址</span>
        </div>

        <div class="row submit-box">
          <input type="button" value="提交" disabled />
        </div>
      </div>
    </Tab>
  </transition>
</template>

<script setup>
import { reactive } from "vue"
import { useStore } from "vuex"
import Tab from "./common/Tab_Container.vue"

const store = useStore()

const tabAttribute = reactive({
  style: {
    width: "320px",
    height: "480px",
  },
  title: "SetStars_Icons",
  subTitle: "图标设置( 暂不可用 )",
})
</script>

<style lang="less" scoped>
.row {
  width: 100%;

  span {
    display: block;
    font-size: 14px;
    color: var(--secondary-text-color);
    transition: color 0.4s ease;
  }
}

.input-box {
  span {
    padding: 15px 0px 15px 10px;
  }

  input {
    outline: none;
    border: none;
    height: 50px;
    width: 100%;
    border-radius: 8px;
    padding: 0px 20px;
    background: var(--tertiary-background-color);
    color: var(--primary-text-color);
    transition: color 0.4s ease, background-color 0.4s ease;
  }
}

.span-box {
  padding: 20px 0px 10px 10px;
  margin-bottom: 20px;
  max-height: 90px;
  overflow-y: hidden;

  span {
    line-height: 200%;
    font-size: 12px;
  }
}

.submit-box {
  position: absolute;
  width: calc(100% - 40px);
  bottom: 20px;
  left: 20px;

  input {
    outline: none;
    border: none;
    height: 50px;
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    background: var(--theme-color);
    transition: color 0.4s ease, background-color 0.4s ease;

    &:hover {
      background: var(--theme-color-hover);
    }
  }
}
</style>
