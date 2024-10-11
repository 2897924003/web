import { boot } from "quasar/wrappers";
import { useAuthStore } from "stores/auth";

export default boot(({ router, store, redirect }) => {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    console.log("to", to);
    console.log("from", from);
    // Access the authentication store
    if (to.meta.requireAuthenticated && !authStore.isLoggedIn) {
      // Redirect to login page if the route requires auth and user is not logged in
      next({ name: "login" });
      // Redirect to login page
    } else {
      next(); // Proceed to route
    }
  });
});
