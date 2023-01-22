import { LOGIN_TOKEN } from "@/global/constants";
import { localCache } from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("../views/login/Login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/not-found/NotFound.vue")
    }
  ]
});

// 导航守卫
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN);
  if (to.path.startsWith("/main") && !token) {
    return "/login";
  }

  // 如果是进入到main
  if (to.path === "/main") {
    return firstMenu?.url;
  }
});

export default router;
