<template>
  <transition name="appear">
    <Tab :tabAttribute="tabAttribute" v-if="state.appStatus.setting">
      <div class="row_wrap" id="account">
        <div class="head flex-center">
          <img src="../assets/head_shot.jpg" alt="" />
        </div>
        <div class="row" style="color: var(--disabled)">
          <span>管理你的账户「 开发中暂不可用 」</span>
          <span>></span>
        </div>
      </div>
      <div class="row_wrap">
        <div class="row">
          <span>自动清空搜索框</span>
          <Switch v-model:value="clearInput" />
        </div>
        <div class="row">
          <span>打开时聚焦到搜索框</span>
          <Switch v-model:value="focusInput" />
        </div>
        <div class="row">
          <span>在新标签页打开搜索结果</span>
          <Switch v-model:value="target_blank" />
        </div>
        <div class="row">
          <span>深色模式</span>
          <Switch v-model:value="dark_mode" />
        </div>
        <div class="row">
          <span>自动深色模式( 跟随系统 )</span>
          <Switch v-model:value="auto_dark_mode" />
        </div>
        <div class="row">
          <span>更简洁的页脚信息</span>
          <Switch v-model:value="mini_footer_info" />
        </div>
      </div>
      <span class="row_subtitle">标题和距离</span>
      <div class="row_wrap">
        <div class="row">
          <span class="row_number">{{ logo_distance }}</span>
          <input
            type="range"
            min="0"
            max="500"
            class="range"
            v-model="logo_distance"
          />
        </div>
        <div class="row">
          <span>不显示标题</span>
          <Switch v-model:value="logo_hidden" />
        </div>
        <div class="row">
          <span>使用时间代替标题</span>
          <Switch v-model:value="show_time" />
        </div>
        <div class="row">
          <span>显示秒</span>
          <Switch v-model:value="show_second" />
        </div>
      </div>
      <span class="row_subtitle">搜索框和距离</span>
      <div class="row_wrap">
        <div class="row">
          <span class="row_number">{{ search_distance }}</span>
          <input
            type="range"
            min="0"
            max="600"
            class="range"
            v-model="search_distance"
          />
        </div>
        <div class="row">
          <span>不显示搜索框</span>
          <Switch v-model:value="search_hidden" />
        </div>
        <div class="row">
          <span>不显示搜索选项</span>
          <Switch v-model:value="search_list_hidden" />
        </div>
        <div class="row">
          <span>搜索框圆角半径 ( {{ search_radius }} )</span>
          <input
            type="range"
            min="0"
            max="30"
            class="range-half"
            v-model="search_radius"
          />
        </div>
      </div>
      <span class="row_subtitle">收藏栏和距离</span>
      <div class="row_wrap">
        <div class="row">
          <span class="row_number">{{ stars_distance }}</span>
          <input
            type="range"
            min="0"
            max="700"
            class="range"
            v-model="stars_distance"
          />
        </div>
        <div class="row">
          <span>不显示收藏栏</span>
          <Switch v-model:value="stars_hidden" />
        </div>
        <div class="row">
          <span>活跃放大效果</span>
          <Switch v-model:value="stars_scale" />
        </div>
        <div class="row">
          <span>在新标签页打开收藏网址</span>
          <Switch v-model:value="stars_target" />
        </div>
        <div class="row">
          <span>收藏栏圆角半径 ( {{ stars_radius }} )</span>
          <input type="range" min="0" max="16" class="range-half" v-model="stars_radius" />
        </div>
      </div>
    </Tab>
  </transition>
</template>

<script setup>
import { computed, reactive } from "vue"
import Switch from "@/components/common/Switch"
import Tab from "@/components/common/Tab_Container"
import { useStore } from "vuex"

const store = useStore()
const state = store.state

const bindSettingData = (dataKey, itemKey) => {
  return computed({
    get() {
      if (itemKey) {
        return state.setting[dataKey][itemKey]
      }
      return state.setting[dataKey]
    },
    set(beforeData) {
      let changeKey = dataKey
      if (itemKey) {
        changeKey = {
          dataKey,
          itemKey,
        }
      }
      store.commit("UPDATE_SETTING_DATA", {
        changeKey,
        beforeData,
      })
    },
  })
}

const clearInput = bindSettingData("clearInput")
const focusInput = bindSettingData("focusInput")
const target_blank = bindSettingData("target_blank")
const dark_mode = bindSettingData("dark_mode")
const auto_dark_mode = bindSettingData("auto_dark_mode")
const mini_footer_info = bindSettingData("mini_footer_info")

const logo_hidden = bindSettingData("logo_attribute", "logo_hidden")
const logo_distance = bindSettingData("logo_attribute", "logo_distance")
const show_time = bindSettingData("logo_attribute", "show_time")
const show_second = bindSettingData("logo_attribute", "show_second")

const search_hidden = bindSettingData("search_attribute", "search_hidden")
const search_distance = bindSettingData("search_attribute", "search_distance")
const search_radius = bindSettingData("search_attribute", "search_radius")
const search_list_hidden = bindSettingData("search_attribute", "search_list_hidden" )

const stars_hidden = bindSettingData("stars_attribute", "stars_hidden")
const stars_distance = bindSettingData("stars_attribute", "stars_distance")
const stars_radius = bindSettingData("stars_attribute", "stars_radius")
const stars_scale = bindSettingData("stars_attribute", "stars_scale")
const stars_target = bindSettingData("stars_attribute", "stars_target")

const tabAttribute = reactive({
  style: {
    width: "320px",
    height: "480px",
  },
  title: "Setting",
  subTitle: "设置",
})
</script>

<style lang="less" scoped>
#account {
  cursor: pointer;
  padding-left: 0;

  .head {
    height: 250px;
    padding: 20px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .row {
    padding-left: 15px;
    border-top: 0.5px solid var(--primary-line-color);
  }
}

.row_subtitle {
  font-size: 12px;
  display: block;
  padding-left: 12px;
  padding-bottom: 8px;
  color: var(--primary-text-color);
}

.row_wrap {
  overflow: hidden;
  border-radius: 6px;
  margin-bottom: 20px;
  padding-left: 15px;

  color: var(--primary-text-color);
  background-color: var(--tertiary-background-color);

  transition: color 0.4s ease, background-color 0.4s ease;
  -webkit-transition: color 0.4s ease, background-color 0.4s ease;
  
  .row {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
    border-top: 0.5px solid var(--primary-line-color);

    &:nth-child(1) {
      border: none;
    }

    input[type="range"] {
      background-size: 98% 3px;
      margin: 0;
      width: 85%;
      background: linear-gradient(to right, #ccc 0%, #ccc 100%);
      outline: none;
      -webkit-appearance: none; /*清除系统默认样式*/
      height: 3px; /*横条的高度*/
    }

    input[type="range"]::-webkit-slider-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      -webkit-appearance: none;
      border: 0;
    }

    .row_number {
      width: 40px;
    }

    span {
      font-size: 13px;
    }

    .range {
      width: 100%;
    }

    .range-half {
      width: 40% !important;
    }
  }
}
</style>
