import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/css/base.css";

let app = createApp(App);

// 自定义指令
app.directive("rightClick", (el, binding) => {
  el.oncontextmenu = function(e) {
    const oX = e.clientX;
    const oY = e.clientY;
    console.log(oX, oY);
    // 右键菜单出现后的位置
    store.dispatch("updateRightMenu", {
      isShow: true,
      left: oX + "px",
      top: oY + "px",
      list: binding.value.list,
    });
    return false;
  };
});

app.use(store).mount("#app");
