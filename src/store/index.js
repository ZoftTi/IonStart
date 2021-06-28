import { createStore } from "vuex"

export default createStore({
  state: {
    // 搜索索引
    searchIndex: 0,
    // 搜索引擎
    searchEngines: [
      {
        engineName: "Bing",
        url: "https://cn.bing.com/search?q=",
      },
      {
        engineName: "Baidu",
        url: "https://www.baidu.com/s?word=",
      },
      {
        engineName: "Google",
        url: "https://www.google.com/search?q=",
      },
    ],
    // 右键菜单
    rightMenu: {
      isShow: false,
      top: null,
      left: null,
      list: [],
    },
    // 列表
    stars: [
      {
        // 容器宽度
        size: 2,
        // 数据
        data: [
          {
            title: "微软 Bing 搜索 - 国内版",
            icon: "https://images.zoft.work/images/bing-icon.jpg",
            link: "https://cn.bing.com/",
          },
          {
            title: "微软 Bing 搜索 - 国内版",
            icon: "https://images.zoft.work/images/bing-icon.jpg",
            link: "https://cn.bing.com/",
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            title: "微软 Bing 搜索 - 国内版",
            icon: "https://images.zoft.work/images/bing-icon.jpg",
            link: "https://cn.bing.com/",
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            title:
              "Dribbble - Discover the World’s Top Designers & Creative Professionals",
            icon: "https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico",
            link: "https://dribbble.com/",
          },
        ],
      },
      {
        size: 2,
        data: [
          {
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
            icon: "http://images.zoft.work/images/bilibili-icon.jpg",
            link: "https://bilibili.com",
          },
          {
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
            icon: "http://images.zoft.work/images/bilibili-icon.jpg",
            link: "https://bilibili.com",
          },
          {
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
            icon: "http://images.zoft.work/images/bilibili-icon.jpg",
            link: "https://bilibili.com",
          },
          {
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
            icon: "http://images.zoft.work/images/bilibili-icon.jpg",
            link: "https://bilibili.com",
          },
          {
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
            icon: "http://images.zoft.work/images/bilibili-icon.jpg",
            link: "https://bilibili.com",
          },
          {
            title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
            icon: "http://images.zoft.work/images/bilibili-icon.jpg",
            link: "https://bilibili.com",
          },
        ],
      },
    ],
  },
  mutations: {
    // 更新右键菜单
    UPDATE_RIGHT_MENU: (state, rightMenu) => {
      state.rightMenu.isShow = rightMenu.isShow
      state.rightMenu.top = rightMenu.top || state.rightMenu.top
      state.rightMenu.left = rightMenu.left || state.rightMenu.left
      state.rightMenu.list = rightMenu.list || state.rightMenu.list
    },
    // 更新链接容器的宽度
    UPDATE_STARS_SIZE: (state, stars) => {
      state.stars[stars.groupindex].size = stars.size
    },
    // 更新搜索引擎索引
    UPDATE_SEARCH_ACTIVE_INDEX: (state, searchIndex) => {
      state.searchIndex = searchIndex
    },
  },
  actions: {
    updateRightMenu(context, menuObj) {
      context.commit("UPDATE_RIGHT_MENU", menuObj)
    },
    updateStarsSize(context, starsObj) {
      context.commit("UPDATE_STARS_SIZE", starsObj)
    },
    updateSearchIndex(context, searchIndex) {
      context.commit("UPDATE_SEARCH_ACTIVE_INDEX", searchIndex)
    },
  },
  modules: {},
})
