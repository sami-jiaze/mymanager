import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// <!-- 自动导入icon必须遵循名称格式 {prefix：默认为i}-{collection：图标集合的名称}-{icon：图标名称}  -->
// npm i -D unplugin-icons unplugin-vue-components
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createStyleImportPlugin, ElementPlusResolve } from "vite-plugin-style-import";
// 自动导入element组件样式
// npm install consola -D
// npm i -D vite-plugin-style-import

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver()
        // 自动导入图标组件
        // IconsResolver({
        //   prefix: "Icon"
        // })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver()
        // 自动引入icon
        // IconsResolver({}),
      ]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`;
          }
        }
      ]
    })
    // 自动引入icon
    // Icons({
    //   autoInstall: true
    // })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
