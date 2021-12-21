<template>
  <transition name="elastic">
    <div class="edit-stars" v-if="store.state.editStars.isShow" :class="{mask: editIconShow}">
      <div class="edit-header flex-center select-none cursor-move" v-drag="{ type: 'store', content: 'UPDATE_EDIT_STARS' }" >
        <h4>编辑收藏网址</h4>
        <i class="iconfont icon-close" @click="closeEditStar"></i>
      </div>
      <div class="edit-content flex-center">
        <input type="text" placeholder="网址" v-model="editStarFromLink"/>
        <input type="text" placeholder="标题" v-model="editStarFromTitle"/>
        <div class="icon_list">
          <div class="header">
            <h4>图标设置<span @click="editIconShow = true">编辑</span></h4>
          </div>
          <div class="icon_item_wrap">
            <div class="icon_item flex-center icon_default_item" :class="{ active: editStarFromIconDefault.status }"  @click="switchActiveIcon('default')">
              {{editStarFromTitle.slice(0,1)}}
            </div>
            <div v-for="(item, index) in store.state.editStars.data.iconGroup" class="icon_item flex-center" :class="{ active: !editStarFromIconDefault.status && editStarFromIcon == item}" @click="switchActiveIcon(item)">
              <img :src="item" alt="" :key="index"/>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-footer flex-center">
        <input type="button" value="保存" @click="saveEditStars"/>
      </div>
      <div class="edit_default_icon">
        <EditDefaultIcon :iconDefault="editStarFromIconDefault" :editIconShow="editIconShow" @updateIconDefault="updateIconDefault" @closeEditIcon="editIconShow = !editIconShow"/>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref } from "vue"
import { useStore } from "vuex"
import EditDefaultIcon from "./EditStars/EditDefaultIcon.vue"  

const store = useStore()

const bindState = (getObjectKey) => {
  return computed({
    get() {
      return store.state.editStars.data[getObjectKey]
    },
    set(value) {
      store.commit("UPDATE_EDIT_STARS", {
        data: {
          [getObjectKey] : value
        }
      })
    }
  })
}

let editStarFromLink = bindState('link')
let editStarFromTitle = bindState('title')
let editStarFromIcon = bindState('icon')
let editStarFromIconDefault = bindState('iconDefault')

const editIconShow = ref(false)
const updateIconDefault = (iconDefault) => {
  store.commit("UPDATE_EDIT_STARS", {
    data: { iconDefault }
  })
}

const switchActiveIcon = (afterIcon) => {
  switch (afterIcon) {
    case 'default':
      console.log('true defaultIcon', editStarFromIconDefault.value);
      store.commit("UPDATE_EDIT_STARS", {
        data: { 
          iconDefault : {
            status: true, color: editStarFromIconDefault.value.color, themeColor: editStarFromIconDefault.value.themeColor
          }
        }
      })
      break;
  
    default:
      store.commit("UPDATE_EDIT_STARS", {
        data: { 
          iconDefault : {
            status: false, color: editStarFromIconDefault.value.color, themeColor: editStarFromIconDefault.value.themeColor
          }
        }
      })
      editStarFromIcon.value = afterIcon
      break;
  }
}

const closeEditStar = () => {
  store.commit('UPDATE_EDIT_STARS', {
    isShow: false
  })
}

const saveEditStars = () => {
  store.commit("UPDATE_STAR_DATA", {
    dataIndex: store.state.editStars.dataIndex,
    star: {
      link: editStarFromLink.value,
      icon: editStarFromIcon.value,
      title: editStarFromTitle.value,
      iconDefault: editStarFromIconDefault.value
    },
  })
  closeEditStar()
}



</script>

<style lang="less" scoped>
.edit-stars {
  position: absolute;
  left: v-bind('store.state.editStars.left');
  top: v-bind('store.state.editStars.top');
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

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 12px;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.4s ease, visibility 0.4s ease;;
    visibility: hidden;
  }

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
      font-size: 12px;

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

          span {
            font-size: 12px;
            display: inline-block;
            padding-left: 5px;
            color: var(--secondary-text-color);
            cursor: pointer;
          }
        }
      }

      .icon_item_wrap {
        width: 100%;
        max-height: 110px;

        display: grid;
        grid-template-columns: repeat(4, 21%);
        justify-content: space-between;
        grid-row-gap: 15px;
        margin-bottom: 10px;

        .icon_item {
          width: 100%;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
          border-radius: 7px;

          background-color: var(--tertiary-background-color);

          img {
            width: 100%;
          }
        }

        .icon_default_item {
          font-size: 18px;
          color: v-bind('editStarFromIconDefault.color');
          background-color: v-bind('editStarFromIconDefault.themeColor');
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

  .edit_default_icon {
    position: absolute;
    top: 60px;
    right: -50px;
    z-index: 110;
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

.mask::before {
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
