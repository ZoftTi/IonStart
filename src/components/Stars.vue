<template>
  <div class="stars-bar">
    <Item/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import Item from "./Stars/Item.vue"
import { useStore } from 'vuex';

export default defineComponent({
  name: "App",
  components: {
    Item,
  },
  setup() {
    const store = useStore()
    const stars = computed(() => store.state.stars)

    return {
      stars
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
  display: flex;
}
</style>
