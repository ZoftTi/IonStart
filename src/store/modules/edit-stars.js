import { markRaw } from "vue"
export default {
  state: {
    // 编辑菜单
    isShow: false,
    top: null,
    left: null,
    dataIndex: {},
    data: {
      link: "",
      title: "",
      icon: "",
      iconDefault: { status: true, color: 'white', themeColor: '#5aa1d4' },
      iconGroup: [],
    },
  },
  mutations: {
    // 更新编辑收藏网址容器位置
    UPDATE_EDIT_STARS: (state, beforeData) => {
      if (beforeData.isShow != undefined) {
        state.isShow = beforeData.isShow
      }
      if (beforeData.top && beforeData.left) {
        state.top = beforeData.top
        state.left = beforeData.left
      }
      if (beforeData.dataIndex != undefined) {
        state.dataIndex = beforeData.dataIndex
      }
      if (beforeData.data != undefined) {
        Object.keys(beforeData.data).forEach((key) => {
          if (key === "iconDefault") {
            let obj = state.data.iconDefault
            Object.keys(beforeData.data.iconDefault).forEach((k) => {
              obj[k] = beforeData.data.iconDefault[k]  
            })
            state.data[key] = markRaw({ ...obj })
          } else {
            state.data[key] = beforeData.data[key]
          }
        })
      }
    },
  },
}
