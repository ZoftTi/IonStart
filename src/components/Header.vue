<template>
  <div
    class="header"
    v-if="!logo_attribute.logo_hidden"
    :style="{ top: logo_attribute.logo_distance + 'px' }"
  >
    <div class="title" v-if="!logo_attribute.show_time">
      <h3>「 Ion 」</h3>
      <span>离子起始页</span>
    </div>
    <div class="time flex-center" v-else>
      {{ date.hour }}
      <span :class="{ black: flashing }">:</span>
      {{ date.minute}}
      <span :class="{ black: flashing }" v-if="logo_attribute.show_second">:</span>
      {{ logo_attribute.show_second ? date.second : ''}}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { computed, defineComponent, onMounted, reactive, ref } from "vue"

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore()
    const logo_attribute = store.state.setting.logo_attribute

    let date = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      second: new Date().getSeconds(),
    }

    const flashing = ref(false)

    onMounted(() => {
      let timer = setInterval(() => {
        date.hour = new Date().getHours()
        date.minute = new Date().getMinutes()
        date.second = new Date().getSeconds()
        date.hour = date.hour < 10 ? "0" + date.hour : date.hour
        date.minute = date.minute < 10 ? "0" + date.minute : date.minute
        date.second = date.second < 10 ? "0" + date.second : date.second

        if (Number.isInteger(parseInt(date.second))) {
          flashing.value = !flashing.value
        }
      }, 1000)
    })

    return {
      logo_attribute,
      flashing,
      date,
    }
  },
})
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  width: 160px;
  top: 110px;
  left: calc(50% - 80px);
  color: white;

  .title {
    cursor: pointer;
    text-align: center;
    transition: transform 0.2s;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: scale(1.1);

      & > span {
        opacity: 1;
      }
    }

    h3 {
      font-size: 28px;
      font-weight: bold;
      margin: 0;
    }

    span {
      opacity: 0;
      line-height: 1.8;
      font-size: 10px;
      transition: opacity 0.2s;
    }
  }

  .time {
    width: 160px;
    height: 50px;
    font-size: 36px;
    transition: transform 0.2s;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: scale(1.1);
    }

    span {
      transition: color 0.5s;
    }

    .black {
      color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
