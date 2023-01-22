import type { App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

function registerIcons(app: App<Element>) {
  // 注册所有icon图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}

export default registerIcons;
