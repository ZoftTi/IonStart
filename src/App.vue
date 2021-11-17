<template>
  <div :class="{ dark: store.state.setting.dark_mode }">
    <Header />

    <Search />

    <Stars />

    <Menu />

    <Setting />

    <BackgroundSetting />

    <SetStarsIcons />

    <TouchMask />

    <EditStars />

    <EditGroup />

    <AddStars />

    <NewTips />

    <Footer />

  </div>
</template>

<script setup>
import Header from "./components/Header.vue"
import Search from "./components/Search.vue"
import Stars from "./components/Stars.vue"
import Menu from "./components/common/Right_Menu.vue"
import Setting from "./components/Setting.vue"
import BackgroundSetting from "./components/Background_Setting.vue"
import SetStarsIcons from "./components/SetStarsIcons.vue"
import TouchMask from "./components/common/TouchMask.vue"
import EditStars from "./components/common/Edit_Stars.vue"
import EditGroup from "./components/common/Edit_Group.vue"
import AddStars from "./components/common/Add_Stars.vue"
import NewTips from "./components/NewTips.vue"
import Footer from "./components/Footer.vue"
import { useStore } from "vuex"
import { computed, onMounted, useAttrs, watch } from "@vue/runtime-core"

const store = useStore()

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const autoDarkMode = computed(() => store.state.setting.auto_dark_mode)
const userAgent = navigator.userAgent

const changeDarkMode = (value) => {
  store.commit("UPDATE_SETTING_DATA", {
    changeKey: "dark_mode",
    beforeData: value,
  })
}

onMounted(() => {
  if (autoDarkMode.value) {
    changeDarkMode(prefersDarkScheme.matches)
    prefersDarkScheme.onchange = () => {
      console.log(userAgent)
      if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1) {
          changeDarkMode(prefersDarkScheme.matches)
      } else {
        setTimeout(() => {
          changeDarkMode(prefersDarkScheme.matches)
        }, 600)
      }
    }
  }
})

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
