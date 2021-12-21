<template>
  <transition name="appear">
    <Tab :tabAttribute="tabAttribute">
      <div class="content">
        <div class="row">
          <p>选择搜索引擎</p>
          <div></div>
        </div>
      </div>
    </Tab>
  </transition>
</template>

<script setup>
import { reactive } from "vue"
import { useStore } from "vuex"
import Tab from "@/components/common/Tab_Container"

const store = useStore()

const tabAttribute = reactive({
  style: {
    width: "320px",
    height: "480px",
  },
  title: "Search_Engines",
  subTitle: "搜索引擎设置",
})
</script>

<style lang="less" scoped>

</style>
