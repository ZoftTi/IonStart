<template>
  <div class="item-only" v-right-click="rightMenuObj">
    <a :href="data.link" @click.prevent="jumpLink(data)">
      <div class="item-top flex-center">
        <img :src="data.icon" alt="" data-groupindex="1" data-index="0" />
      </div>
      <div class="item-bottom">
        <h4>
          {{ data.title }}
        </h4>
      </div>
    </a>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import { useStore } from "vuex"
const store = useStore()

const props = defineProps({
  data: Object,
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

const rightMenuObj = reactive({
  list: [
    {
      text: "编辑",
      icon: "icon-edit",
      handler: (e) => {
        console.log(props.data)
        store.commit("UPDATE_EDIT_STARS", {
          isShow: true,
          top: e.clientY - 300 + "px",
          left: e.clientX - 125 + "px",
          dataIndex: {
            groupIndex: props.groupIndex,
            itemIndex: 0,
          },
          data: props.data,
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
          itemIndex: false,
        })
      },
    },
  ],
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
        text-overflow: ellipsis;
        
        color: var(--secondary-text-color);

        transition: color 0.4s ease;
        -webkit-transition: color 0.4s ease;
      }
    }
  }
}
</style>
