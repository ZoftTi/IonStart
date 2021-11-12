<template>
  <div
    class="item-many"
    :style="{ 'flex-direction': data.length <= 3 ? 'row' : 'column' }"
  >
    <a
      v-for="(item, index) in data"
      :href="item.link"
      @click.prevent="jumpLink(item)"
    >
      <img
        :src="item.icon"
        :title="item.title"
        alt=""
        v-right-click.stop="getMenuData(item, index)"
      />
    </a>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useStore } from "vuex"
const store = useStore()

const props = defineProps({
  data: Array,
  groupIndex: Number,
})

const jumpLink = (data) => {
  if (data.type === "application") {
    store.commit("CHANGE_APP_STATUS", {
      appKey: data.link,
      isShow: true,
    })
    return false
  } else {
    window.open(
      data.link,
      store.state.setting.target_blank ? "_blank" : "_self"
    )
  }
}

const getMenuData = (item, itemIndex) => {
  return reactive({
    list: [
      {
        text: "编辑",
        icon: "icon-edit",
        handler: (e) => {
          console.log(item)
          console.log(itemIndex, props.groupIndex)
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
  })
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
