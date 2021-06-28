<template>
  <div
    class="item-many"
    :style="{ 'flex-direction': data.length <= 3 ? 'row' : 'column' }"
  >
    <a v-for="(item, index) in data" :href="item.link">
      <img :src="item.icon" :title="item.title" v-right-click="rightMenuObj" />
    </a>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue"
import { useStore } from "vuex"

const props = defineProps({
  data: Array,
})

const store = useStore()
const rightMenuObj = reactive({
  list: [
    {
      text: "编辑",
      icon: "icon-edit",
      handler: () => {
        console.log("编辑")
      },
    },
    {
      text: "删除",
      icon: "icon-delete",
      handler: () => {
        console.log("删除")
      },
    },
  ],
})
</script>

<style lang="less" scoped>
.item-many {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: column;

  .item-button {
    width: 45px;
    height: 45px;
    margin-left: 13px;
    margin-top: 13px;
    position: relative;
    border-radius: 7.425px;
    background: var(--background-shallow-transparent);
    order: 2;

    i {
      font-size: 30px;
    }
  }

  a {
    width: 45px;
    height: 45px;
    margin-left: 13px;
    margin-top: 13px;
    position: relative;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 100%;
      border-radius: 7.425px;
    }
  }
}
</style>
