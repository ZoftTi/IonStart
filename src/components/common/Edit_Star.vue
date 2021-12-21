<template>
  <div class="edit-star">
    <div class="edit-header flex-center">
      <h4>编辑收藏网址</h4>
      <i class="iconfont icon-close"></i>
    </div>
    <div class="edit-content flex-center">
      <input type="text" placeholder="网址" />
      <input type="text" placeholder="标题" />
    </div>
    <div class="edit-footer flex-center">
      <input type="button" value="图标设置" />
      <input type="button" value="保存" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "App",
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.edit-star {
  position: absolute;
  left: 691px;
  top: 279px;
  width: 250px;
  height: 170px;
  border-radius: 15px;
  background: var(--background-pure);
  padding: 15px 20px;
  transform-origin: 50% 100%;
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
      height: 28px;
      border-radius: 4px;
      border: none;
      outline: none;
      margin: 5px 0;
      padding: 2px 10px;
      font-size: 10px;
      background-color: var(--background-transparent-hover);
      color: var(--text-color-pure);
    }
  }

  .edit-footer {
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
