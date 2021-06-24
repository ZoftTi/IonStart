<template>
  <div class="search-bar">
    <div class="search-list-container">
      <div class="google">Google</div>
      <div class="baidu">Baidu</div>
      <div class="Bing">Bing</div>
    </div>
    <div class="search-input-container">
      <form action="" method="get">
        <input type="text" name="" id="" placeholder="Search"  />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
export default defineComponent({
  name: "App",
  setup() {
    
    return {
    }
  },
})
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

    div:nth-child(2) {
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
