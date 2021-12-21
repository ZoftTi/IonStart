<template>
  <div class="switch-size">
    <div @click="switchSize(2)" :class="{ 'active-span' : groupSize == 2 }"><span>{{switchText[0]}}</span></div>
    <div @click="switchSize(3)" :class="{ 'active-span' : groupSize == 3 }"><span>{{switchText[1]}}</span></div>
    <div @click="switchSize(4)" :class="{ 'active-span' : groupSize == 4 }"><span>{{switchText[2]}}</span></div>
    <div class="active" :class="groupSize == 2 ? 'active-two' : groupSize == 3 ? 'active-three' : 'active-four'"></div>
    <div class="separator"></div>
  </div>
</template>

<script setup>

const props = defineProps({
  groupSize: Number,
  switchText: Array
})

const emits = defineEmits(['switchSize'])

const switchSize = (size) => {
  emits('switchSize', size)
}

</script>

<style lang='less' scoped>
.switch-size {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-radius: 7px;
  position: relative;
  
  background-color: rgba(120, 120, 128, 0.16);

  div {
    width: 33.3333%;
    height: 32px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    span {
      font-size: 12px;
    }
  }

  .separator {
    position: absolute;
    left: 34%;
    width: 33.3333%;
    z-index: 8;

    &::before {
      content: "";
      position: absolute;
      border-left: 1px solid black;
      border-right: 1px solid black;
      height: 12px;
      width: 100%;
      z-index: 8;
    }
  }

  .active-span {
    color: black;
  }

  .active {
    width: 32%;
    height: 26px;
    z-index: 9;
    position: absolute;
    background-color: white;
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
    transition: left 0.4s ease, width 0.4s ease;
  }

  .active-two {
    left: 2%;
  }
  .active-three {
    left: 33%;
    width: 35%;
  }
  .active-four {
    width: 31%;
    left: 67%;
  }
}
</style>