import store from "../../store";

export default (el, binding) => {
  el.oncontextmenu = function (e) {
    e.stopPropagation()
    
    const oX = e.clientX;
    const oY = e.clientY;
    
    // 右键菜单出现后的位置
    store.commit("UPDATE_RIGHT_MENU", {
      isShow: true,
      left: oX + "px",
      top: oY + "px",
      list: binding.value.list,
    });

    return false;
  };
}