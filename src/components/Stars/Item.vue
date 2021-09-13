<template>
  <div
    :class="{
      item: true,
      'item-scale': state.setting.stars_attribute.stars_scale,
    }"
    :style="{
      width: itemWidth,
      'border-radius': state.setting.stars_attribute.stars_radius + 'px',
    }"
    @contextmenu.prevent
  >
    <ItemOnly
      v-if="item.data.length == 1"
      :data="item.data[0]"
      :groupIndex="groupIndex"
    />
    <ItemMany v-else :data="item.data" :groupIndex="groupIndex" />
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, reactive, ref } from "vue"
import ItemOnly from "./Item_Only.vue"
import ItemMany from "./Item_Many.vue"
import { useStore } from "vuex"

const props = defineProps({
  item: Object,
  groupIndex: Number,
})

const state = useStore().state

const itemWidth = computed(
  () => 45 * props.item.size + 13 * (props.item.size + 1) + "px"
)

onMounted(() => {
  console.log(props.groupIndex)
})
</script>

<style lang="less" scoped>
.item {
  width: 129px;
  height: 129px;
  margin: 0px 10px 20px;
  border-radius: 15px;
  vertical-align: top;
  cursor: pointer;

  display: inline-block;

  background-color: var(--custom-fill-color);

  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);

  transition: width 0.4s, background-color 0.4s ease, transform 0.2s;
  -webkit-transition: width 0.4s, background-color 0.4s ease, transform 0.2s;

  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
}

.item-scale:hover {
  transform: scale(1.03);
}
</style>
