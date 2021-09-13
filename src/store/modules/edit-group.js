export default {
  state: {
    // 编辑组菜单
    isShow: false,
    top: null,
    left: null,
    groupIndex: {},
  },
  mutations: {
    UPDATE_EDIT_GROUP: (state, groupData) => {
      state.isShow =
        groupData.isShow == undefined ? state.isShow : groupData.isShow
      state.top = groupData.top == undefined ? state.top : groupData.top
      state.left = groupData.left == undefined ? state.left : groupData.left
      state.groupIndex =
        groupData.groupIndex == undefined
          ? state.groupIndex
          : groupData.groupIndex
    },
  },
}
