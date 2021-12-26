<template>
  <transition name="appear">
    <Tab :tabAttribute="tabAttribute" v-if="store.state.appStatus.search_engines">
      <div class="content">
        <div class="row search-engines" v-if="!isAddSearchEngineShow">
          <p class="search-engines-header">搜索引擎设置</p>

          <div class="search-list">
            <draggable v-model="store.state.searchEngines" tag="transition-group" animation="300" item-key="id">
              <template #item="{ element, index }">
                <div class="search-item" @click="changeEnginesStatus(index)" v-right-click="getRightMenu(index)">
                  <transition name="fade">
                    <div class="selected" v-show="element.status">
                      <i class="iconfont icon-select"></i>
                    </div>
                  </transition>
                  <div class="search-logo">
                    <img :src="element.icon" :alt="element.engineName">
                  </div>
                  <div class="search-title">{{element.engineName}}</div>
                </div>
              </template>
              <template #footer>
                <div class="search-item add-search-engine" key="addSearchEngine" @click="isAddSearchEngineShow = true">+</div>
              </template>
            </draggable>
          </div>
        </div>
        <div class="row add-search-engine-from" v-if="isAddSearchEngineShow">
          <div class="row">
            <span class="input-span">搜索引擎名称<span class="cancel-button" @click="isAddSearchEngineShow = false">取消</span></span>
            <input type="text" class="search-engine-name" v-model="addSearchEngineFrom.engineName" placeholder="必应"/>
          </div>
          <div class="row">
            <span>搜索引擎地址</span>
            <input type="text" class="search-engine-website" v-model="addSearchEngineFrom.url" placeholder="https://cn.bing.com/search?q=">
          </div>
          <div class="row">
            <span>搜索引擎图标地址</span>
            <input type="text" class="search-engine-icon" v-model="addSearchEngineFrom.icon" placeholder="URL 地址">
          </div>
          <div class="row">
            <span class="tips">1. 搜索引擎地址在目标搜索引擎截取URL地址获取</span>
            <span class="tips">1.1 类似于Bing截取到?q=</span>
          </div>
          <div class="row">
            <input type="button" class="submit-input" value="保存" @click="addSearchEngine">
          </div>
        </div>
      </div>
    </Tab>
  </transition>
</template>

<script setup>
import { computed, reactive, ref } from "vue"
import { useStore } from "vuex"
import draggable from "vuedraggable"
import Tab from "@/components/common/Tab_Container"

const store = useStore()

const changeEnginesStatus = (index) => {
  store.commit('CHANGE_SEARCH_ENGINSE_STATUS', index)
}

const isAddSearchEngineShow = ref(false)
const addSearchEngineFrom = reactive({
  engineName: '',
  url: '',
  icon: '',
  status: true
})

const addSearchEngine = (event) => {
  event.target.setAttribute('disabled', '')

  if (addSearchEngineFrom.engineName && addSearchEngineFrom.url && addSearchEngineFrom.icon) {
    event.target.value = '正在添加...'
    store.commit('ADD_SERCH_ENGINE', addSearchEngineFrom)
    setTimeout(() => {
      event.target.removeAttribute('disabled')
      event.target.value = '添加成功'
    }, 1000);
  } else {
    event.target.value = '输入不能为空'
    setTimeout(() => {
      event.target.removeAttribute('disabled')
      event.target.value = '保存'
    }, 2000);
  }
}

const getRightMenu = (index) => {
  return {
    list: [
      {
        text: "删除",
        icon: "icon-delete",
        handler: () => {
          store.commit("REMOVE_SEARCH_ENGINE", index)
        },
      },
      {
        text: "切换状态",
        icon: "icon-order",
        handler: () => changeEnginesStatus(index)
      }
    ]
  }
}

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
.search-engines {
  .search-engines-header {
    font-size: 14px;
    margin: 0 0 16px;
  }
  .search-list, .search-engines-header {
    color: var(--secondary-text-color);
  }


  .search-list {
    border-radius: 6px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    .search-item {

      width: 100%;
      height: 140px;
      border-radius: 6px;
      padding: 10px 20px;
      cursor: pointer;

      background-color: var(--tertiary-background-color);
      transition: background-color 0.2s linear;

      position: relative;
      overflow: hidden;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .search-logo {
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          object-fit: cover;
        }
      }

      .search-title {
        height: 20%;
        font-size: 14px;
      }

      .selected {
        position: absolute;
        top: 10px;
        right: 10px;
        color: var(--theme-color);

        .iconfont {
          font-size: 20px;
        }
      }

    }

    .add-search-engine {
      font-size: 2rem;
    }
  }

}

.add-search-engine-from > .row {
  width: 100%;
  display: flex;
  flex-direction: column;

  span {
    font-size: 14px;
    margin: 0 0 8px;
    color: var(--secondary-text-color);
  }

  .cancel-button {
    float: right;
    cursor: pointer;
    margin: 0 10px 0;
  }

  input {
    outline: none;
    border: none;
    height: 50px;
    width: 100%;
    border-radius: 8px;
    padding: 0px 20px;
    margin: 0 0 12px 0px;
    background: var(--tertiary-background-color);
    color: var(--primary-text-color);
    transition: color 0.4s ease, background-color 0.4s ease;
    font-size: 14px;
  }

  .submit-input {
    position: absolute;
    margin: 0;
    bottom: 20px;
    width: calc(100% - 40px);
    background-color: var(--theme-color);
    cursor: pointer;
  }

  .submit-input:disabled {
    background-color: var(--tertiary-background-color);
  }
  
  .tips {
    font-size: 12px;
  }
}

</style>
