import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import axios from './network/axios.js'
import "./assets/css/base.less";
import * as directives from './directives/index'

const app = createApp(App);

// 注册自定义指令
Object.keys(directives).forEach(k => app.directive(k, directives[k]))

// 全局注册 axios
app.config.globalProperties.$axios = axios

app.use(store).mount("#app");
