export default {
  state: {
    // 右键菜单
    isShow: false,
    top: null,
    left: null,
    list: [],
  },
  mutations: {
    // 更新右键菜单
    UPDATE_RIGHT_MENU: (state, rightMenu) => {
      state.isShow = rightMenu.isShow
      state.top = rightMenu.top || state.top
      state.left = rightMenu.left || state.left
      state.list = rightMenu.list || state.list
    },
  },
}
