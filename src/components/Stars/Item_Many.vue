<template>
  <div class="item-many" :style="{ 'flex-direction': data.length <= 3 ? 'row' : 'column' }">
    <a v-for="(item, index) in data" :href="item.link" @click="clickLink(item)">
      <div class="icon-box" v-if="item.iconDefault.status" v-right-click.stop="getMenuData(item, index)" :style="{ color: item.iconDefault.color, background: item.iconDefault.themeColor }">
        {{ item.title.slice(0,1) }}
      </div>
      <img :src="item.icon" :title="item.title" class="icon-box" v-else v-right-click.stop="getMenuData(item, index)" alt="" />
    </a>
  </div>
</template>

<script setup>
import { isProxy, markRaw, reactive } from "vue"
import { useStore } from "vuex"

const store = useStore()
const props = defineProps({
  data: Array,
  groupIndex: Number,
})

const clickLink = (item) => {
  if (item.type) {
    switch (item.type) {
      case "application":
        window.event.preventDefault()
        store.commit("CHANGE_APP_STATUS", {
          appKey: item.link,
          isShow: true,
        })
        break
    }
  }
}

const getMenuData = (item, itemIndex) => {
  return {
    list: [
      {
        text: "编辑",
        icon: "icon-edit",
        handler: (e) => {
          store.commit("UPDATE_EDIT_STARS", {
            isShow: true,
            top: e.clientY - 300 + "px",
            left: e.clientX - 125 + "px",
            dataIndex: {
              groupIndex: props.groupIndex,
              itemIndex: itemIndex,
            },
            data: item,
          })
        },
      },
      {
        text: "组样式",
        icon: "icon-info",
        handler: (e) => {
          store.commit("UPDATE_EDIT_GROUP", {
            isShow: true,
            top: e.clientY - 300 + "px",
            left: e.clientX - 125 + "px",
            groupIndex: props.groupIndex,
          })
        },
      },
      {
        text: "添加到组",
        icon: "icon-add",
        handler: (e) => {
          store.commit("UPDATE_ADD_STARS", {
            isShow: true,
            title: "添加到组",
            top: e.clientY - 300 + "px",
            left: e.clientX - 125 + "px",
            groupIndex: props.groupIndex,
          })
        },
      },
      {
        text: "删除",
        icon: "icon-delete",
        handler: () => {
          store.commit("REMOVE_STAR_DATA", {
            groupIndex: props.groupIndex,
            itemIndex: itemIndex,
          })
        },
      },
    ],
  }
}
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
    transition: background-color 0.2s linear, transform 0.2s linear;
    text-decoration: none;
    border-radius: 8px;
    background-color: #ffffffcc;

    .icon-box {
      width: 45px;
      height: 45px;
      border-radius: 7px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;

      white-space: nowrap;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
    }
  }
}
</style>
