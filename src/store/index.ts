import { createStore } from "vuex"

export default createStore({
  state: {
    rightMenu: {
      isShow: false,
      top: null,
      left: null,
      list: [],
    },
    stars: [
      {
        size: 2,
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
            icon:
              "https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico",
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
    UPDATE_RIGHT_MENU: (state, rightMenu) => {
      state.rightMenu.isShow = rightMenu.isShow
      state.rightMenu.top = rightMenu.top || state.rightMenu.top
      state.rightMenu.left = rightMenu.left || state.rightMenu.left
      state.rightMenu.list = rightMenu.list || state.rightMenu.list
    },
    UPDATE_STARS_SIZE: (state, stars) => {
      state.stars[stars.groupindex].size = stars.size
    }
  },
  actions: {
    updateRightMenu(context, menuObj) {
      context.commit("UPDATE_RIGHT_MENU", menuObj)
    },
    updateStarsSize(context, starsObj) {
      context.commit("UPDATE_STARS_SIZE", starsObj)
    }
  },
  modules: {},
})
