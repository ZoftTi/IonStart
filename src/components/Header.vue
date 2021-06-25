<template>
  <div class="header">
    <div class="h4 title">「 Ion 」</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "App",
  setup() {
    return {
      
    }
  },
})
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  width: 150px;
  top: 110px;
  text-align: center;
  left: calc(50% - 75px );

  .title {
    font-size: 28px;
    font-weight: bold;
    color: var(--text-white-pure);
  }
}
</style>
