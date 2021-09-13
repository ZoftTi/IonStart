<template>
  <transition name="elastic">
    <div
      class="edit-star"
      v-if="state.editStars.isShow"
      :style="{
        top: state.editStars.top,
        left: state.editStars.left,
      }"
    >
      <div
        class="edit-header flex-center select-none cursor-move"
        v-drag="'UPDATE_EDIT_STARS'"
      >
        <h4>编辑收藏网址</h4>
        <i class="iconfont icon-close" @click="closeEditStar"></i>
      </div>
      <div class="edit-content flex-center">
        <input
          type="text"
          placeholder="网址"
          v-model="editStarFrom.link"
          :disabled="state.editStars.data.type == 'application'"
        />
        <input type="text" placeholder="标题" v-model="editStarFrom.title" />
        <div class="icon_list">
          <div class="header">
            <h4>图标设置</h4>
          </div>
          <div class="icon_item_wrap">
            <div
              v-for="(item, index) in state.editStars.data.iconGroup"
              class="icon_item flex-center"
              :class="{ active: state.editStars.data.icon === item }"
            >
              <img :src="item" alt="" :key="index" @click="switchIcon(item)" />
            </div>
          </div>
        </div>
      </div>
      <div class="edit-footer flex-center">
        <input type="button" value="保存" @click="saveEditStar" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch, ref, onMounted, reactive } from "vue"
import { useStore } from "vuex"

const store = useStore()
const state = store.state

let editStarFrom = reactive({
  link: "",
  title: "",
  icon: "",
})

if (editStarFrom.icon == "") {
  watch(
    computed(() => state.editStars.data),
    () => {
      editStarFrom.link = state.editStars.data.link
      editStarFrom.title = state.editStars.data.title
    }
  )
}

const switchIcon = (iconUrl) => {
  if (iconUrl) {
    editStarFrom.icon = iconUrl
    store.commit("UPDATE_EDIT_STARS", {
      data: {
        title: state.editStars.data.title,
        icon: iconUrl,
        iconGroup: state.editStars.data.iconGroup,
        link: state.editStars.data.link,
      },
    })
  }
}

const closeEditStar = () => {
  store.commit("UPDATE_EDIT_STARS", {
    isShow: false,
  })
}

const saveEditStar = () => {
  console.log(editStarFrom)
  store.commit("UPDATE_STAR_DATA", {
    dataIndex: state.editStars.dataIndex,
    star: {
      link: editStarFrom.link,
      icon: editStarFrom.icon,
      title: editStarFrom.title,
    },
  })
  closeEditStar()
}
</script>

<style lang="less" scoped>
.edit-star {
  position: absolute;
  left: 691px;
  top: 279px;
  width: 250px;
  border-radius: 12px;
  padding: 15px 20px;

  color: var(--primary-text-color);
  background-color: var(--primary-background-color);

  transform-origin: 50% 100%;
  transition: transform 0.4s, top 0.4s, left 0.4s, opatity 0.4s,
    background-color 0.4s ease, color 0.4s ease;
  -webkit-transition: transform 0.4s, top 0.4s, left 0.4s, opacity 0.4s,
    background-color 0.4s ease, color 0.4s ease;

  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px;

  .edit-header {
    height: 20px;
    margin-bottom: 7px;
    justify-content: space-between;

    h4 {
      font-size: 14px;
    }

    i {
      cursor: pointer;
      font-size: 18px;
    }
  }

  .edit-content {
    flex-wrap: wrap;
    margin-bottom: 7px;

    input {
      width: 100%;
      height: 32px;
      border-radius: 5px;
      border: none;
      outline: none;
      margin: 7px 0;
      padding: 2px 10px;
      font-size: 10px;

      color: var(--primary-text-color);
      background-color: var(--tertiary-background-color);

      transition: color 0.4s ease, background-color 0.4s ease;
      -webkit-transition: color 0.4s ease, background-color 0.4s ease;
    }

    .icon_list {
      width: 100%;
      margin-top: 10px;

      .header {
        width: 100%;
        padding: 0 0 15px;

        h4 {
          font-size: 14px;
          margin: 0;
        }
      }

      .icon_item_wrap {
        width: 100%;
        max-height: 105px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        overflow-y: scroll;

        .icon_item:nth-child(1),
        .icon_item:nth-child(5),
        .icon_item:nth-child(9),
        .icon_item:nth-child(13),
        .icon_item:nth-child(17) {
          margin-left: 0;
        }

        .icon_item {
          width: 21%;
          overflow: hidden;
          cursor: pointer;
          margin-left: 10px;
          margin-bottom: 12px;
          position: relative;
          border-radius: 7.425px;
          transition: all 0.2s ease;

          background-color: var(--tertiary-background-color);

          img {
            width: 100%;
          }
        }

        .active::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .active::after {
          content: "";
          display: block;
          position: absolute;
          left: 32%;
          top: 47%;
          width: 8px;
          height: 14px;
          border-color: white;
          border-style: solid;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg) translate(-50%, -50%);
          border-radius: 2px;
        }
      }
    }
  }

  .edit-footer {
    bottom: 20px;
    justify-content: flex-end;

    input {
      cursor: pointer;
      line-height: 30px;
      width: 60px;
      height: 30px;
      border: none;
      background: var(--theme-color);
      color: white;
      font-size: 12px;
      border-radius: 7px;
      margin-left: 10px;
    }
  }
}
</style>
