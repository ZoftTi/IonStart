<template>
  <div class="item" :style="{ width: itemWidth }">
    <ItemOnly />
    <ItemMany />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import ItemOnly from "./Item_Only.vue"
import ItemMany from "./Item_Many.vue"

export default defineComponent({
  name: "App",
  props: {
    item: Object,
    rows: Number
  },
  components: {
    ItemOnly,
    ItemMany,
  },
  setup(props) {
    const itemWidth = computed(
      () => 45 * props.rows + 13 * (props.rows + 1) + "px"
    )
    return {
      itemWidth,
    }
  },
})
</script>

<style lang="less" scoped>
.item {
  width: 129px;
  height: 129px;
  margin: 0px 10px;
  border-radius: 15px;
  vertical-align: top;
  cursor: pointer;
  background-color: var(--background-shallow-transparent);
  box-shadow: 0px 8px 20px rgba(0 0 0 / 0.06);
  -webkit-box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.06);
  transition: width 0.4s, transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
}
</style>
