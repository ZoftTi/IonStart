<template>
  <div v-right-click="rightMenuObj" :class="{ item: true, 'item-scale': stars_attribute.stars_scale && !store.state.menu.isShow }" :style="{ width: itemWidth, 'border-radius': stars_attribute.stars_radius + 'px' }" >
    <ItemOnly v-if="item.data.length == 1" :data="item.data[0]" :groupIndex="groupIndex" />
    <ItemMany v-else :data="item.data" :groupIndex="groupIndex" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import ItemOnly from "./Item_Only.vue"
import ItemMany from "./Item_Many.vue"
import { useStore } from "vuex"

const props = defineProps({
  item: Object,
  groupIndex: Number,
})

const store = useStore()
const stars_attribute = store.state.setting.stars_attribute

const itemWidth = computed(() => 45 * props.item.size + 13 * (props.item.size + 1) + "px")

const rightMenuObj = {
  list: [
    {
      text: "添加到组",
      icon: "icon-add",
      handler: (e) => {
        store.commit("UPDATE_ADD_STARS", {
          isShow: true,
          title: "添加到组",
          top: e.clientY - 300 + "px",
          left: e.clientX - 125 + "px",
          groupIndex: props.groupIndex,
        })
      },
    },
    {
      text: "组样式",
      icon: "icon-info",
      handler: (e) => {
        store.commit("UPDATE_EDIT_GROUP", {
          isShow: true,
          top: e.clientY - 300 + "px",
          left: e.clientX - 125 + "px",
          groupIndex: props.groupIndex,
        })
      },
    },
  ]
}

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
