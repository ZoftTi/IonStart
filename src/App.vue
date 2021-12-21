<template>
  <div :class="{ dark: store.state.setting.dark_mode }">
    <Header />

    <Search />

    <Stars />

    <Menu />

    <Setting />

    <BackgroundSetting />

    <SearchEngines />

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
import Header from "@/components/Header"
import Search from "@/components/Search"
import Stars from "@/components/Stars"
import Menu from "@/components/common/Right_Menu"
import Setting from "@/components/Settings/Setting"
import BackgroundSetting from "@/components/Settings/BackgroundSetting"
import SetStarsIcons from "@/components/Settings/SetStarsIcons"
import TouchMask from "@/components/common/TouchMask"
import EditStars from "@/components/common/Edit_Stars"
import EditGroup from "@/components/common/Edit_Group"
import AddStars from "@/components/common/Add_Stars"
import NewTips from "@/components/NewTips"
import Footer from "@/components/Footer"
import SearchEngines from "./components/Settings/SearchEngines"

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

</script>
