<template>
  <Item-Container>
    <ItemOnly/>
    <ItemMany/>
  </Item-Container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ItemContainer from "./Item_Container.vue"
import ItemOnly from "./Item_Only.vue"
import ItemMany from "./Item_Many.vue"

export default defineComponent({
  name: "App",
  props: {
    item: Object
  },
  components: {
    ItemContainer,
    ItemOnly,
    ItemMany,
  },
  setup(props) {
    return {}
  },
})
</script>

<style lang="less"></style>
