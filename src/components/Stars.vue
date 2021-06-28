<template>
  <div class="stars-bar">
    <Item v-for="item in stars" :item="item" :rows="item.size" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import Item from "./Stars/Item.vue"

const store = useStore()
const stars = computed(() => store.state.stars)

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
