export default {
  state: {
    // 编辑菜单
    isShow: false,
    top: null,
    left: null,
    dataIndex: {},
    data: {},
  },
  mutations: {
    // 更新编辑收藏网址容器位置
    UPDATE_EDIT_STARS: (state, editStar) => {
      if (editStar.isShow != undefined) {
        state.isShow = editStar.isShow
      }
      if (editStar.top && editStar.left) {
        state.top = editStar.top
        state.left = editStar.left
      }
      if (editStar.dataIndex != undefined) {
        state.dataIndex = editStar.dataIndex
      }
      if (editStar.data != undefined) {
        state.data = editStar.data
      }
    },
  },
}
