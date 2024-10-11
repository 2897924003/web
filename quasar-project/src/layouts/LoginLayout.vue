<script setup>
import { onMounted, ref } from "vue";
import { useQuasar, useTimeout } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth";

const $q = useQuasar();
const username = ref(null);
const password = ref(null);
const $router = useRouter();
const authStore = useAuthStore();
const rememberMe = ref(false);
const selectedSystem = ref({ label: null, value: null });
const systems = ref([
  { label: "学生管理系统", value: "systemA" },
  { label: "项目管理系统", value: "systemB" },
  { label: "测试系统", value: "authentication" },
  { label: "聊天室", value: "chat" }
]);

/*匿名登陆,访问受限*/
const anonymous = async () => {
  await $router.push("mainlayout");
};

/*账号密码登陆*/
const login = async () => {
  $q.loadingBar.start();
  $q.loadingBar.stop();

  //const recaptchaResponse = grecaptcha.getResponse();

  /*
  测试期间不需要这个
  if (recaptchaResponse.length === 0) {
    $q.notify({
      message: "请进行人机身份验证",
      position: "top",
    });
    return;
  }*/
  /*
  暂时简化,等学了ssr,用nodejs.
  const recaptchaVerify = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    { secret: "6Ld8j_spAAAAAJpQxXF2uy3cM3YOLPgCzfM2vgXK", response: recaptchaResponse }
  )

  if (!recaptchaVerify.data.success) {
    $q.notify({
      message: "请重新进行安全验证",
      position: "top",
      color: "red",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
    return;
  }
*/

  if (!selectedSystem.value.value) {
    $q.notify({
      message: "请选择一个系统",
      position: "top",
      color: "red",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
    return;
  }

  const response = await axios.post(
    //'http://localhost:8080/login',
    //'http://localhost:8080/api/authentication/client-login',
    `https://test.opensun.asia/api/${selectedSystem.value.value}/client-login`,
    {
      username: username.value,
      password: password.value,
      "remember-me": rememberMe.value ? "on" : "off",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true
    },
  );

  if (response.data.status === 200) {
    // 将JWT令牌存入会话存储
    sessionStorage.setItem("jwt", response.headers.get("Authorization"));
    alert( response.headers.get("Authorization") );

    $q.notify({
      message: "欢迎!",
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
    authStore.login();
    await $router.push("/mainlayout");
  } else {
    $q.notify({
      message: response.data.message,
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
  }
};

const register = async () => {
  if (!selectedSystem.value.value) {
    $q.notify({
      message: "请选择一个系统",
      position: "top",
      color: "red",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
    return;
  }

  const response = await axios.post(
    //'http://localhost:8082/api/authentication/client-register',
    `https://test.opensun.asia/api/${selectedSystem.value.value}/client-register`,
    { username: username.value, password: password.value },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.data.code === 1) {
    $q.notify({
      message: "注册成功!",
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
    authStore.login();
    await $router.push("/mainlayout");
  } else {
    $q.notify({
      message: "账号已存在",
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
  }
};

onMounted(async () => {
  const script = document.createElement("script");
  script.src = "https://recaptcha.net/recaptcha/api.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page
        class="login-page-background flex flex-center"
        style="max-width: 100%; max-height: 100%"
      >
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="login" class="q-gutter-md">
            <q-select
              v-model="selectedSystem"
              :options="systems"
              label="选择系统"
              outlined
              dense
              clearable
              color="black"
              bg-color="teal"
            />

            <q-input
              clearable
              bg-color="teal"
              rounded
              outlined
              v-model="username"
              label="账号"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '不能为空']"
            />

            <q-input
              clearable
              bg-color="teal"
              rounded
              outlined
              v-model="password"
              label="密码"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || '不能为空',
                (val) => (val.length > 0 && val.length < 50) || '密码过长',
              ]"
            />

<!--            <div
              class="g-recaptcha"
              data-sitekey="6Ld8j_spAAAAAJpQxXF2uy3cM3YOLPgCzfM2vgXK"
              data-callback="login"
            ></div>-->

            <div class="row justify-around">
              <q-btn
                push
                label="登录"
                type="login"
                color="teal"
                text-color="black"
              >
              </q-btn>

              <q-btn push label="注册" @click="register" color="teal" />
              <q-btn push label="匿名访问" @click="anonymous" color="teal" />

              <q-btn
                push
                href="https://test.opensun.asia/oauth2/authorization/github"
                color="teal"
                ><q-avatar><q-icon name="fa-brands fa-github" /></q-avatar
              ></q-btn>

              <q-checkbox
                label="记住密码"
                checked-icon="star"
                unchecked-icon="star_border"
                v-model="rememberMe"
              />
            </div>
          </q-form>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.login-page-background {
  background-image: url("/icons/login2.png");

  background-size: cover;
  background-position: center;
  filter: brightness(100%);
}
</style>
