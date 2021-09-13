export default {
  state: {
    // 添加收藏
    isShow: false,
    title: null,
    top: null,
    left: null,
    groupIndex: null,
  },
  mutations: {
    UPDATE_ADD_STARS: (state, AddStarInfo) => {
      state.isShow =
        AddStarInfo.isShow == undefined
          ? state.isShow
          : AddStarInfo.isShow
      state.title =
        AddStarInfo.title == undefined ? state.title : AddStarInfo.title
      state.top =
        AddStarInfo.top == undefined ? state.top : AddStarInfo.top
      state.left =
        AddStarInfo.left == undefined ? state.left : AddStarInfo.left
      state.groupIndex =
        AddStarInfo.groupIndex == undefined
          ? state.groupIndex
          : AddStarInfo.groupIndex
    },
  },
}
