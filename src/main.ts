import { createApp } from "vue";
import "normalize.css";
import "./assets/css/index.less";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import icons from "./global/register-icons";
// npm i -D vite-plugin-style-import自动引入element样式
// 导入全部element样式
// import "element-plus/theme-chalk/el-message.css";

const app = createApp(App);
app.use(icons);
app.use(store);
app.use(router);
app.mount("#app");
