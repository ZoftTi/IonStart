<template>
  <transition name="elastic">
    <div
      class="edit-group"
      v-if="state.editGroup.isShow"
      :style="{
        left: state.editGroup.left,
        top: state.editGroup.top,
      }"
    >
      <div
        class="edit-header flex-center select-none cursor-move"
        v-drag="'UPDATE_EDIT_GROUP'"
      >
        <h4>编辑组样式</h4>
        <i class="iconfont icon-close" @click="closeEditGroup"></i>
      </div>
      <div class="edit-content flex-center">
        <div class="group-size">
          <div class="header"><h4>大小</h4></div>
          <SegmentedControls
            :switchText="switchText"
            :groupSize="groupSize"
            @switchSize="switchSize"
          />
        </div>
        <div class="group-stars-order">
          <div class="header">
            <h4>收藏网址管理</h4>
          </div>
          <div
            class="stars-list"
            :style="{ height: starListAttr.isOpen ? '182px' : '32px' }"
          >
            <div
              class="list-header"
              :style="{
                background: starListAttr.isOpen ? 'white' : 'none',
                color: starListAttr.isOpen
                  ? 'black'
                  : 'var(--primary-text-color)',
              }"
            >
              <h4>#组名称</h4>
              <span>
                <i
                  class="iconfont icon-refresharrow i-rotate"
                  v-if="starListAttr.isControl"
                  @click="starUp"
                ></i>
                <i
                  class="iconfont icon-refresharrow"
                  v-if="starListAttr.isControl"
                  @click="starDown"
                ></i>
                <i
                  class="iconfont icon-close"
                  v-if="starListAttr.isControl"
                  @click="removeStar"
                ></i>
                <i
                  class="iconfont icon-unfold"
                  :class="{ 'i-rotate': starListAttr.isOpen }"
                  @click="switchStarList"
                ></i>
              </span>
            </div>
            <div class="list-content">
              <div
                class="row"
                v-for="(item, index) in state.stars[
                  store.state.editGroup.groupIndex
                ].data"
                :key="index"
                :class="{ active: listActive == index }"
                @click="switchActive(index)"
              >
                <div class="icon">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="title">
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue"
import { useStore } from "vuex"
import SegmentedControls from "./Segmented_ Controls.vue"

const store = useStore()
const state = store.state
const switchText = ["默认", "大", "很大"]
const listActive = ref(null)
let groupSize = ref(2)

let starListAttr = reactive({
  isOpen: false,
  isControl: false,
})

const switchStarList = () => {
  starListAttr.isOpen = !starListAttr.isOpen
}

const switchSize = (size) => {
  groupSize.value = size
  store.commit("UPDATE_STARS_SIZE", {
    groupIndex: state.editGroup.groupIndex,
    size: groupSize.value,
  })
}

const switchActive = (index) => {
  listActive.value = index
}

const removeStar = () => {
  if (listActive.value != null) {
    store.commit("REMOVE_STAR_DATA", {
      groupIndex: state.editGroup.groupIndex,
      itemIndex: listActive.value,
    })
    listActive.value = null
  }
}

const starUp = () => {
  if (listActive.value != 0) {
    let temp =
      state.stars[state.editGroup.groupIndex].data[listActive.value - 1]
    store.commit("REPLACE_STAR_DATA", {
      targetIndex: {
        groupIndex: state.editGroup.groupIndex,
        itemIndex: listActive.value - 1,
      },
      replaceStar:
        state.stars[state.editGroup.groupIndex].data[listActive.value],
    })
    store.commit("REPLACE_STAR_DATA", {
      targetIndex: {
        groupIndex: state.editGroup.groupIndex,
        itemIndex: listActive.value,
      },
      replaceStar: temp,
    })

    listActive.value--
  }
}

const starDown = () => {
  if (
    listActive.value !=
    state.stars[state.editGroup.groupIndex].data.length - 1
  ) {
    let temp =
      state.stars[state.editGroup.groupIndex].data[listActive.value + 1]
    store.commit("REPLACE_STAR_DATA", {
      targetIndex: {
        groupIndex: state.editGroup.groupIndex,
        itemIndex: listActive.value + 1,
      },
      replaceStar:
        state.stars[state.editGroup.groupIndex].data[listActive.value],
    })
    store.commit("REPLACE_STAR_DATA", {
      targetIndex: {
        groupIndex: state.editGroup.groupIndex,
        itemIndex: listActive.value,
      },
      replaceStar: temp,
    })
    listActive.value++
  }
}

watch(listActive, (count, prevCount) => {
  if (count !== null && prevCount === null) {
    starListAttr.isControl = true
  } else if (count === null && prevCount !== null) {
    starListAttr.isControl = false
  }
})

watch(
  computed(() => state.editGroup.top),
  () => {
    groupSize.value = state.stars[state.editGroup.groupIndex].size
  }
)

const closeEditGroup = () => {
  store.commit("UPDATE_EDIT_GROUP", {
    isShow: false,
  })
  console.log(state.editGroup.isShow)
}
</script>

<style lang="less" scoped>
.edit-group {
  position: absolute;
  left: 691px;
  top: 279px;
  width: 250px;
  border-radius: 12px;
  padding: 15px 20px;

  z-index: 11;
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
    }

    i {
      cursor: pointer;
      font-size: 18px;
    }
  }

  .edit-content {
    flex-wrap: wrap;
    margin-bottom: 7px;

    .group-size {
      width: 100%;
      margin: 0 0 10px;

      .header {
        width: 100%;
        padding: 0 0 10px;

        h4 {
          font-size: 12px;
          text-indent: 2px;
          margin: 0;
        }
      }
    }

    .group-stars-order {
      width: 100%;

      .header {
        width: 100%;
        padding: 0 0 10px;

        h4 {
          font-size: 12px;
          text-indent: 2px;
          margin: 0;
          font-weight: normal;
        }
      }

      .stars-list {
        width: 100%;
        height: 32px;
        border-radius: 7px;
        overflow: hidden;
        background-color: rgba(120, 120, 128, 0.16);
        transition: height 0.4s;

        .list-header {
          padding: 0 10px;
          height: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 7px;

          color: var(--primary-text-color);
          background-color: var(--tertiary-background-color);

          transition: color 0.4s ease, background-color 0.4s ease;
          -webkit-transition: color 0.4s ease, background-color 0.4s ease;

          h4 {
            margin: 0;
            font-size: 13px;
            font-weight: normal;
          }

          span {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .i-rotate {
              transform: rotate(180deg);
            }

            i {
              cursor: pointer;
              margin-left: 10px;
              display: block;
              transition: transform 0.4s;
            }
          }
        }

        .list-content {
          padding: 10px 10px;
          overflow: scroll;
          max-height: 150px;

          .active {
            background-color: white;
            color: black;
          }

          .row {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-radius: 7px;
            margin-bottom: 7px;
            cursor: pointer;
            overflow: hidden;

            transition: background-color 0.2s ease;

            &:hover {
              background-color: white;
              color: black;
            }

            .icon {
              width: 28px;
              height: 28px;
              border-radius: 7px;
              overflow: hidden;
              margin-right: 8px;

              img {
                width: 100%;
              }
            }

            .title {
              height: 26px;
              width: 150px;
              overflow: hidden;
              white-space: nowrap;

              span {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
