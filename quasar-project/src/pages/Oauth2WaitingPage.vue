<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">稍等...</div>
      <div class="text-h2" style="opacity: 0.4">正在进行安全检查...</div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "stores/auth.js";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const $router = useRouter();
const handleNavigation = async () => {
  const url = new URL(window.location.href);
  // 获取 URL 查询参数
  const urlParams = new URLSearchParams(url.search);
  const authorEmail = urlParams.get("email");
  setTimeout(async () => {
    if (authorEmail === "2897924003@qq.com") {
      authStore.login();
      await $router.push("/mainlayout");
      // 清除 URL 中的查询参数
      urlParams.delete("email");
      const newUrl = `${url.origin}${url.pathname}${urlParams.toString() ? "?" + urlParams.toString() : ""}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, 2000);
};
/*自动执行一次*/
onMounted(() => {
  handleNavigation();
});
</script>
