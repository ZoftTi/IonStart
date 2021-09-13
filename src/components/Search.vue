<template>
  <div
    class="search-bar"
    :style="{ top: search_attribute.search_distance + 'px' }"
    v-if="!search_attribute.search_hidden"
  >
    <div
      class="search-list-container"
      v-if="!search_attribute.search_list_hidden"
    >
      <div
        v-for="(item, index) in store.state.searchEngines"
        :title="item.engineName"
        :class="store.state.searchIndex === index ? 'active' : null"
        :keys="item.engineName"
        @click="changeSearchEngine(index)"
      >
        {{ item.engineName }}
      </div>
    </div>
    <div class="search-input-container">
      <input
        v-model="searchInput"
        type="text"
        v-focus="store.state.setting.focusInput"
        placeholder="Search"
        @keydown.enter="jumpPage"
        :style="{
          'border-radius':
            store.state.setting.search_attribute.search_radius + 'px',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, withDirectives } from "vue"
import { useStore } from "vuex"

const store = useStore()
const search_attribute = store.state.setting.search_attribute
// 搜索表单
const searchInput = ref("")
// 选择的搜索引擎
const activeEngine = computed(() => {
  return store.state.searchEngines[store.state.searchIndex]
})

// 改变搜索的引擎
const changeSearchEngine = (index) => {
  store.commit("UPDATE_SEARCH_ACTIVE_INDEX", index)
}

// 跳转页面
const jumpPage = () => {
  window.open(
    `${activeEngine.value.url}${searchInput.value}`,
    store.state.setting.target_blank ? "_blank" : "_self"
  )
  if (store.state.setting.clearInput) {
    searchInput.value = ""
  }
}
</script>

<style lang="less" scoped>
.search-bar {
  position: absolute;
  max-width: 420px;
  width: 100%;
  top: 250px;
  left: calc(50% - 210px);

  .search-list-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    div {
      width: 70px;
      height: 40px;
      margin: 0px 10px;
      color: white;
      text-align: center;
      cursor: pointer;

      transition: border-color 0.3s;
      border-bottom: 4px solid;
      border-color: transparent;
      text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }

    .active {
      border-color: white;
    }
  }

  .search-input-container {
    z-index: 1;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 8px 20px rgba(0 0 0 / 0.06);
    -webkit-box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);

    input {
      width: 100%;
      height: 46px;
      padding: 10px 20px;
      border: none;
      outline: none;
      background: var(--custom-fill-color);
      color: var(--primary-text-color);
      border-radius: 8px;
      font-size: 14px;
      
      transition: color 0.4s ease, background-color 0.4s ease;
      -webkit-transition: color 0.4s ease, background-color 0.4s ease;

      -webkit-backdrop-filter: blur(30px);
      backdrop-filter: blur(30px);

      &::-webkit-input-placeholder {
        color: var(--secondary-text-color);
      }
    }
  }
}
</style>
