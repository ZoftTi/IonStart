<template>
  <Header/>

  <Search/>

  <Stars/>

  <Menu />

  <!-- <EditStar /> -->

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';
import Stars from '@/components/Stars.vue';
import Menu from '@/components/common/Right_Menu.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Search,
    Stars,
    Menu
  },
  setup() {
    return {

    }
  }
});
</script>

<style lang="less">


</style>
