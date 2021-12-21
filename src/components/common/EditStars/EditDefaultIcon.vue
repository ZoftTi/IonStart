<template>
  <transition name="elastic">
    <div class="editDefaultIcon" v-if="editIconShow">
      <div class="editHeader flex-center select-none">
        <h4>编辑默认图标</h4>
        <i class="iconfont icon-close" @click="emits('closeEditIcon')"></i>
      </div>
      <div class="editContent">
        <div class="inputBox">
          <span>默认图标背景颜色</span>
          <input type="text" placeholder="图标背景颜色" v-model="iconDefault.themeColor"/>
        </div>
        <div class="inputBox">
          <span>默认图标文字颜色</span>
          <input type="text" placeholder="图标文字颜色" v-model="iconDefault.color"/>
        </div>
      </div>
      <div class="editFooter flex-center">
        <input type="button" value="保存" @click="saveIconDefault"/>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps(['iconDefault', 'editIconShow'])
const emits = defineEmits(['updateIconDefault', 'closeEditIcon'])

const saveIconDefault = () => {
  emits('updateIconDefault', props.iconDefault)
  emits('closeEditIcon')
}

</script>

<style lang='less' scoped>
.editDefaultIcon {
  width: 220px;
  height: 250px;
  border-radius: 12px;
  padding: 15px 18px;

  color: var(--primary-text-color);
  background-color: var(--primary-background-color);

  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px;

  .editHeader {
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

  .editContent {
    .inputBox {
      span {
        font-size: 10px;
      }

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
    }
  }
  
  .editFooter {
    position: absolute;
    width: calc(100% - 36px);
    bottom: 18px;
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