<template>
  <div class="header-button-box flex-center">
    <span class="open-setting">
      <i class="iconfont icon-Setting"></i>
    </span>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.header-button-box {
  position: fixed;
  top: 25px;
  right: 40px;
  color: white;

  span {
    cursor: pointer;

    i {
      font-size: 24px;
    }
  }
}
</style>
