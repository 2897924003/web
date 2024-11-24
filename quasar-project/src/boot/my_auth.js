import { boot } from "quasar/wrappers";
import { useAuthStore } from "stores/auth";
import { useQuasar } from "quasar";
export default boot(({ router, store, redirect }) => {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const $q = useQuasar();

    // 打印调试信息
    console.log("to", to);
    console.log("from", from);

    // 检查是否需要认证且用户未登录
    if (to.meta.requireAuthenticated && !authStore.isLoggedIn) {
      // 显示未登录通知
      $q.notify({
        color: "negative",
        position: "top",
        message: "请先登录以访问该页面",
        timeout: 3000,
      });

      // 重定向到登录页
      next({ name: "login" });
    } else {
      // 否则继续导航
      next();
    }
  });
});
