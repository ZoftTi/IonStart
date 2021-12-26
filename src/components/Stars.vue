<template>
  <div class="stars-bar" v-if="!stars_attribute.stars_hidden" :style="{ top: stars_attribute.stars_distance + 'px' }" >
    <draggable
      v-model="itemData"
      tag="transition-group"
      :item-key="(key) => key"
      animation="300"
      @start="isTransition = true"
      @end="isTransition = false"
    >
      <template #item="{ element, index }">
        <Item :item="element" :groupIndex="index" :class="{ 'transition-clear': isTransition }"/>
      </template>
    </draggable>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue"
import { useStore } from "vuex"
import Item from "./Stars/Item.vue"
import draggable from "vuedraggable"

export default defineComponent({
  components: {
    Item,
    draggable,
  },
  setup() {
    const store = useStore()
    const stars_attribute = store.state.setting.stars_attribute

    const itemData = computed({
      get() {
        return store.state.stars
      },
      set(value) {
        store.commit("REPLACE_STAR_ORDER", value)
      },
    })

    const isTransition = ref(false)

    return {
      stars_attribute,
      itemData,
      isTransition,
    }
  },
})
</script>

<style lang="less" scoped>
.stars-bar {
  position: absolute;
  top: 430px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 90%;
  min-width: 80%;
  text-align: center;

  .transition-clear {
    transition: none;
    box-shadow: none;
  }
}
</style>
