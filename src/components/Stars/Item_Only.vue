<template>
  <div class="item-only" v-right-click="rightMenuObj">
    <a :href="data.link">
      <div class="item-top flex-center">
        <img
          :src="data.icon"
          data-groupindex="1"
          data-index="0"
        />
      </div>
      <div class="item-bottom">
        <h4>
          {{data.title}}
        </h4>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
export default defineComponent({
  name: "App",
  props: {
    data: Object
  },
  setup() {
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
    return {
      rightMenuObj,
    }
  },
})
</script>

<style lang="less" scoped>
.item-only {
  width: 100%;
  height: 100%;

  a {
    text-decoration: none;

    .item-top {
      width: 100%;
      height: 70%;
      padding-top: 10%;

      img {
        width: 45px;
        border-radius: 7px;
      }
    }

    .item-bottom {
      width: 100%;
      height: 30%;
      padding: 0px 20px 10px;
      font-size: 0.8em;
      color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;

      h4 {
        white-space: nowrap;
        overflow: hidden;
        text-decoration: none;
      }
    }
  }
}
</style>
