<template>
  <div class="search-bar">
    <div class="search-list-container">
      <div
        v-for="(item, index) in store.state.searchEngines"
        class="item.engineName"
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
        name=""
        id=""
        placeholder="Search"
        @keydown.enter="jumpPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    // 搜索表单
    const searchInput = ref("");
    // 选择的搜索引擎
    const activeEngine: any = computed(() => {
      return store.state.searchEngines[store.state.searchIndex];
    });
    console.log(activeEngine);

    // 改变搜索的引擎
    const changeSearchEngine = (index: number) => {
      store.dispatch("updateSearchIndex", index);
    };

    // 跳转页面
    const jumpPage = () => {
      window.open(`${activeEngine.value.url}${searchInput.value}`, "_blank");
    };
    return {
      changeSearchEngine,
      store,
      searchInput,
      activeEngine,
      jumpPage,
    };
  },
});
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
      border-color: white;
      cursor: pointer;
    }

    .active {
      border-bottom: 3px solid;
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
      background: var(--background-shallow-transparent);
      border-radius: 8px;
      font-size: 16px;
      transition: color 0.25s, background-color 0.25s;
    }
  }
}
</style>
