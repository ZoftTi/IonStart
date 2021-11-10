<template>
  <transition name="elastic">
    <div
      class="add-star"
      v-if="state.addStars.isShow"
      :style="{
        top: state.addStars.top,
        left: state.addStars.left,
      }"
    >
      <div
        class="edit-header flex-center select-none cursor-move"
        v-drag="'UPDATE_ADD_STARS'"
      >
        <h4>
          添加收藏网址<span v-if="state.addStars.title"
            >({{ state.addStars.title }})</span
          >
        </h4>
        <i class="iconfont icon-close" @click="closeAddStar"></i>
      </div>
      <div class="edit-content flex-center">
        <input
          type="text"
          placeholder="网址"
          v-model="addStarFrom.link"
          @input="resetFrom"
        />
        <input
          type="text"
          placeholder="标题( 为空可自动获取 )"
          v-model="addStarFrom.title"
          @input="resetFrom"
        />
        <div class="default_app">
          <div class="header">
            <h4>添加默认应用</h4>
          </div>
          <div class="app_wrap">
            <div
              class="app_item flex-center"
              :class="{ active: addStarFrom.link === item.link }"
              v-for="(item, index) in state.app"
            >
              <img
                :src="item.icon"
                alt=""
                :key="index"
                @click="appClick(item)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="edit-footer flex-center">
        <span>( {{ tips }} )</span>
        <input
          type="button"
          :class="{ loading: loadingStatus }"
          value="添加"
          @click="saveAddStar"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, getCurrentInstance, reactive } from "vue"
import { useStore } from "vuex"

const store = useStore()
const state = store.state
const addStarFrom = reactive({
  type: "",
  link: "",
  title: "",
})
const tips = ref("图标在编辑中设置")
const loadingStatus = ref(false)

const { proxy } = getCurrentInstance()

const closeAddStar = () => {
  store.commit("UPDATE_ADD_STARS", {
    isShow: false,
  })

  for (let i in addStarFrom) {
    addStarFrom[i] = ""
  }
}

const saveAddStar = () => {
  if (addStarFrom.type === "application") {
    tips.value = `添加${addStarFrom.title}`
    store.commit("ADD_STAR_DATA", {
      groupIndex: state.addStars.groupIndex,
      starItem: {
        type: addStarFrom.type,
        link: addStarFrom.link,
        title: addStarFrom.title,
        icon: addStarFrom.icon,
        iconGroup: addStarFrom.iconGroup,
      },
    })
    closeAddStar()
  } else {
    tips.value = "正在获取数据..."
    loadingStatus.value = true

    proxy.$axios.post("/info", { url: addStarFrom.link }).then((response) => {
      if (response.data.code === 200) {
        tips.value = "获取成功"
        loadingStatus.value = false

        console.log(response.data)

        store.commit("ADD_STAR_DATA", {
          groupIndex: state.addStars.groupIndex,
          starItem: {
            link: addStarFrom.link,
            title:
              addStarFrom.title != "" ? addStarFrom.title : response.data.title,
            icon: response.data.icons[0],
            iconGroup: response.data.icons,
          },
        })
        closeAddStar()
      } else {
        loadingStatus.value = false
        tips.value = response.data.message
      }
    })
  }
}

const resetFrom = () => {
  addStarFrom.type = ""
}

const appClick = (item) => {
  addStarFrom.type = item.type
  addStarFrom.title = item.title
  addStarFrom.link = item.link
  addStarFrom.icon = item.icon
  addStarFrom.iconGroup = item.iconGroup
}
</script>

<style lang="less" scoped>
.add-star {
  position: absolute;
  left: 691px;
  top: 279px;
  width: 250px;
  border-radius: 12px;
  padding: 15px 20px;

  color: var(--primary-text-color);
  background-color: var(--primary-background-color);
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px;

  transform-origin: 50% 100%;
  transition: transform 0.4s, top 0.4s, left 0.4s, opatity 0.4s,
    background-color 0.4s ease, color 0.4s ease;
  -webkit-transition: transform 0.4s, top 0.4s, left 0.4s, opacity 0.4s,
    background-color 0.4s ease, color 0.4s ease;

  .edit-header {
    height: 20px;
    margin-bottom: 7px;
    justify-content: space-between;

    h4 {
      font-size: 14px;

      span {
        margin-left: 2px;
        font-size: 12px;
        font-weight: 500;
      }
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

    .default_app {
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

      .app_wrap {
        width: 100%;
        max-height: 105px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        overflow-y: scroll;

        .app_item:nth-child(1),
        .app_item:nth-child(5),
        .app_item:nth-child(9),
        .app_item:nth-child(13),
        .app_item:nth-child(17) {
          margin-left: 0;
        }

        .app_item {
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
    justify-content: space-between;

    span {
      font-size: 12px;
    }

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
      transition: background-color 0.4s;
    }

    .loading {
      color: var(--primary-text-color);
      background-color: var(--tertiary-background-color);
    }
  }
}
</style>
