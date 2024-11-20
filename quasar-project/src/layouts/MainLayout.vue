<template>
  <q-layout view="hHh Lpr lFf">

    <q-header class="bg-black">
      <q-toolbar class="row justify-between">
        <div class="flex">
          <q-toolbar-title>OpenSun</q-toolbar-title>
        </div>

        <div class="flex">
          <q-btn flat round dense class="q-mr-xs">
            <q-avatar>
              <q-img src="/icons/search1.png"/>
            </q-avatar>
          </q-btn>
          <q-avatar>
            <img :src=userImg alt="User Profile" />
          </q-avatar>
          <q-btn flat round dense class="q-mr-xs" @click="logout">
            <q-avatar>
              <q-img src="/icons/logout.png"/>
            </q-avatar>
          </q-btn>
        </div>

        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/mainlayout"/>
            <q-breadcrumbs-el
              label="Docs"
              icon="widgets"
              to="/mainlayout"
            />
            <q-breadcrumbs-el
              label="Breadcrumbs"
              icon="navigation"
              to="/vue-components/breadcrumbs"
            />
            <q-breadcrumbs-el label="Build" icon="build"/>
          </q-breadcrumbs>
        </div>
        <div class="q-pa-md q-gutter-md">
          <q-btn-toggle
            v-model="model"
            push
            glossy
            toggle-color="primary"
            :options="[
              { value: 'day', icon: 'light_mode' },
              { value: 'night', icon: 'dark_mode' },
            ]"
          />
        </div>
      </q-toolbar>
    </q-header>





    <q-page-container>

      <router-view></router-view>

      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="accent"/>
      </q-page-scroller>
    </q-page-container>
  </q-layout>

</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {useQuasar} from "quasar";
import {useAuthStore} from "stores/auth";
import axios from "axios";

const $q = useQuasar();
const $router = useRouter();
const model = ref("day");
const authStore = useAuthStore();
let user = ref()
let userImg = ref()
/*用户基本信息*/
onMounted(async ()=>{
  user.value = authStore.getUser
  userImg.value = `http://localhost:9000/icons/${'china'+user.value.id+'.png'}`
})
/* 日间夜间模式监控 */
watch(model, (newValue) => {
  if (newValue === "day") {
    $q.dark.set(false);
  } else {
    $q.dark.set(true);
  }
});

/* 退出登录 */
const logout = () => {
  axios.get("https://smooth-werewolf-rich.ngrok-free.app/api/logout");
  authStore.logout();
  $q.notify({
    message: "退出登录成功",
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
  });
  $router.push("/");
};
</script>

<style>
/* 添加必要的样式来美化按钮和布局 */
</style>
