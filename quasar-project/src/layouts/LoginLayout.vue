<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth";
import { api, gatewayCAS } from "boot/axios.js";

const $q = useQuasar();
const username = ref();
const password = ref();
const $router = useRouter();
const authStore = useAuthStore();
const rememberMe = ref(false);
const selectedSystem = ref({ label: null, path: null });
const systems = ref([
  { label: "学生管理系统", path: "systemA" },
  { label: "项目管理系统", path: "systemB" },
  { label: "测试系统", path: "authentication" },
  { label: "聊天室", path: "chat" },
]);

/*匿名登陆,访问受限*/
const anonymous = async () => {
  await $router.push("mainlayout");
};

/*表单登录*/
const formLogin = async () => {

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

  if (!selectedSystem.value.path) {
    $q.notify({
      message: "请选择一个系统",
      position: "top",
      color: "red",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
    return;
  }

  const response = await gatewayCAS.post(
    "/login",
    {
      username: username.value,
      password: password.value,
      "remember-me": rememberMe.value ? "on" : "off",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    },
  );
  console.log(response.status);
  console.log(response.data);

  if (response.status === 200) {
    // 将JWT令牌存入会话存储
    sessionStorage.setItem(
      "access_token",
      response.headers.get("access_token"),
    );
    $q.notify({
      message: "欢迎!",
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });

    authStore.login(response.data);
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
  if (!selectedSystem.value.label) {
    $q.notify({
      message: "请选择一个系统",
      position: "top",
      color: "red",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
    return;
  }

  const response = await gatewayCAS.post(
    "/users/register",
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
  <q-layout>
    <q-page-container>
      <q-page class="bg-paper flex " style="">
        <template #default>
            <q-card  class="absolute-center" style="background-color: transparent; box-shadow: none;width: 500px">
              <q-card-section>
                <q-form class="q-gutter-md" @submit="formLogin">
                  <q-select
                    v-model="selectedSystem"
                    :options="systems"
                    label="选择系统"
                    outlined
                    dense
                    clearable
                    color="black"
                  />

                  <q-input
                    clearable
                    rounded
                    outlined
                    v-model="username"
                    label="账号"
                    lazy-rules
                    :rules="[(val) => (val && val.length > 0) || '不能为空']"
                  />

                  <q-input
                    clearable
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

                  <q-card-actions>
                    <q-btn label="登录" type="submit" />
                    <q-btn push label="注册" @click="register" />
                    <q-btn push label="匿名访问" @click="anonymous" />
                    <q-btn href="https://test.opensun.asia/oauth2/authorization/github">
                      <q-avatar><q-icon name="fa-brands fa-github"/></q-avatar>
                    </q-btn>

                  </q-card-actions>



                </q-form>

              </q-card-section>




            </q-card>
        </template>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.bg-paper {
  background-image: url("/icons/login.png");
  background-size: cover;
  background-position: center;
  filter: brightness(100%);
}
</style>
