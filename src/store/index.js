import { createStore } from "vuex"
import { computed } from "vue"
import createPersistedState from "vuex-persistedstate"
import setting from "./modules/setting.js"
import background_setting from "./modules/background-setting.js"
import menu from "./modules/right-menu.js"
import editStars from "./modules/edit-stars.js"
import editGroup from "./modules/edit-group.js"
import addStars from "./modules/add-stars.js"

const store = createStore({
  plugins: [
    createPersistedState({
      key: "LocalData",
      reducer(val) {
        return {
          newTips: val.newTips,
          searchIndex: val.searchIndex,
          stars: val.stars,
          setting: val.setting,
          background_setting: val.background_setting,
          searchEngines: val.searchEngines
        }
      }
    }),
  ],
  state: {
    newTips: true,
    // 搜索索引
    searchIndex: 0,
    // 搜索引擎
    searchEngines: [
      {
        id: 1,
        engineName: "Bing",
        url: "https://cn.bing.com/search?q=",
        icon: "https://images.zoft.work/images/bing-icon.jpg",
        status: true
      },
      {
        id: 2,
        engineName: "Baidu",
        url: "https://www.baidu.com/s?word=",
        icon: "https://images.zoft.work/images/baidu-icon.jpg",
        status: true
      },
      {
        id: 3,
        engineName: "Google",
        url: "https://www.google.com/search?q=",
        icon: "https://images.zoft.work/images/google-icon.jpg",
        status: true
      },
      {
        id: 4,
        engineName: "Bilibili",
        url: "https://search.bilibili.com/all?keyword=",
        icon: "https://images.zoft.work/images/bilibili-preview-icon.jpg",
        status: false
      },
      {
        id: 5,
        engineName: "Mdn",
        url: "https://developer.mozilla.org/zh-CN/search?q=",
        icon: "https://images.zoft.work/images/mdn-icon.png",
        status: false
      },
    ],

    app: [
      {
        type: "application",
        title: "设置",
        icon: "images/appIcons/setting.png",
        iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
        iconGroup: [
          "/images/appIcons/setting.png",
        ],
        link: "Setting",
      },
      {
        type: "application",
        title: "背景设置",
        icon: "/images/appIcons/picture.png",
        iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
        iconGroup: [
          "/images/appIcons/picture.png",
        ],
        link: "Background_Setting",
      },
      {
        type: "application",
        title: "图标设置",
        icon: "/images/appIcons/upload.png",
        iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
        iconGroup: [
          "/images/appIcons/upload.png",
        ],
        link: "SetStars_Icons",
      },
    ],
    appStatus: {
      setting: false,
      setstars_icons: false,
      background_setting: false,
      search_engines: false,
    },
    // 列表
    stars: [
      {
        size: 2,
        data: [
          {
            link: "https://www.bilibili.com/",
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
            icon: "https://images.zoft.work/images/bilibili-icon.jpg",
            iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
            iconGroup: [
              "https://www.bilibili.com/favicon.ico",
              "https://images.zoft.work/images/bilibili-icon.jpg",
            ],
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            link: "https://dribbble.com/",
            title: "Dribbble - Discover the World’s Top Designers & Creative Professionals",
            icon: "https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico",
            iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
            iconGroup: ["https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico",],
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            link: "https://tools.miku.ac/",
            title: "MikuTools - 一个轻量的工具集合",
            icon: "https://tools.miku.ac/favicon.ico",
            iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
            iconGroup: ["https://tools.miku.ac/favicon.ico"],
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            link: "https://juejin.cn/",
            title: "掘金 - 代码不止，掘金不停",
            icon: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png",
            iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
            iconGroup: ["https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png",],
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            link: "https://gitee.com/",
            title: "Gitee - 基于 Git 的代码托管和研发协作平台",
            icon: "https://gitee.com/assets/favicon.ico",
            iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
            iconGroup: ["https://gitee.com/assets/favicon.ico"],
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            type: "application",
            link: "Setting",
            title: "设置",
            icon: "/images/appIcons/setting.png",
            iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
            iconGroup: [
              "/images/appIcons/setting.png",
            ],
          },
          {
            type: "application",
            link: "Background_Setting",
            title: "背景设置",
            icon: "/images/appIcons/picture.png",
            iconDefault: { status: false, color: 'white', themeColor: '#5aa1d4' },
            iconGroup: [
              "/images/appIcons/picture.png",
            ],
          },
        ],
      },
    ],
  },
  mutations: {
    // 更新链接容器的宽度
    UPDATE_STARS_SIZE: (state, stars) => {
      state.stars[stars.groupIndex].size = stars.size
    },
    // 更新搜索引擎索引
    UPDATE_SEARCH_ACTIVE_INDEX: (state, searchIndex) => {
      state.searchIndex = searchIndex
    },
    UPDATE_STAR_DATA: (state, starData) => {
      if (starData.star.link !== "") {
        state.stars[starData.dataIndex.groupIndex].data[starData.dataIndex.itemIndex].link = starData.star.link
      }
      if (starData.star.icon !== "") {
        state.stars[starData.dataIndex.groupIndex].data[starData.dataIndex.itemIndex].icon = starData.star.icon
      }
      if (starData.star.title !== "") {
        state.stars[starData.dataIndex.groupIndex].data[starData.dataIndex.itemIndex].title = starData.star.title
      }
      if (starData.star.iconDefault !== "") {
        state.stars[starData.dataIndex.groupIndex].data[starData.dataIndex.itemIndex].iconDefault = starData.star.iconDefault
      }
    },
    REPLACE_STAR_DATA: (state, replaceStar) => {
      state.stars[replaceStar.targetIndex.groupIndex].data[replaceStar.targetIndex.itemIndex] = replaceStar.replaceStar
    },
    REMOVE_STAR_DATA: (state, dataIndex) => {
      if (dataIndex.itemIndex !== false) {
        state.stars[dataIndex.groupIndex].data.splice(dataIndex.itemIndex, 1)
      } else {
        state.stars.splice(dataIndex.groupIndex, 1)
      }
    },
    ADD_STAR_DATA: (state, starData) => {
      if (starData.groupIndex === false) {
        let temp = { size: 2, data: [starData.starItem] }
        state.stars.push(temp)
      } else {
        state.stars[starData.groupIndex].data.push(starData.starItem)
      }
    },
    CHANGE_APP_STATUS: (state, beforeData) => {
      state.appStatus[beforeData.appKey.toLowerCase()] = beforeData.isShow
    },
    TOGGLE_NEWTIPS: (state, value) => {
      state.newTips = value || !state.newTips
    },
    REPLACE_STAR_ORDER: (state, starsIndex) => {
      state.stars = starsIndex
    },
    CHANGE_SEARCH_ENGINSE_STATUS: (state, index) => {
      state.searchEngines[index].status = !state.searchEngines[index].status
    },
    ADD_SERCH_ENGINE: (state, value) => {
      let temp = { id: state.searchEngines.length + 1, ...value }
      state.searchEngines.push(temp)
    },
    REMOVE_SEARCH_ENGINE: (state, index) => {
      state.searchEngines.splice(index, 1)
    }
  },
  actions: {},
  modules: {
    setting,
    background_setting,
    menu,
    editStars,
    editGroup,
    addStars,
  },
})

export default store
