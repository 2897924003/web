<script setup>


import {useAuthStore} from "stores/auth.js";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const $router = useRouter();
const authStore = useAuthStore();
let user = ref()
const userImg = ref()
onMounted(async ()=>{
  user.value = authStore.getUser
  userImg.value = `http://localhost:9000/icons/${'china'+user.value.id+'.png'}`
})
const logout = () => {
  // 退出登录逻辑

  $router.push({ path: '/login'});
};
</script>

<template>
  <q-layout>

    <!-- 最终父容器 -->
    <q-page-container class="fullscreen">
      <!-- 页眉 -->
      <q-header elevated>
        <q-toolbar>
          <q-btn flat label="首页" to="/discuss"/>
          <q-btn flat label="技术文章" />
          <q-btn flat label="问答中心" />
          <q-btn flat label="资源中心" />
          <q-btn flat label="在线代码" :to="{ name: 'CodeRunner' }" />
          <q-btn flat label="工具箱" :to="{name: 'ArticleManagement'}"/>
          <q-btn flat label="创作中心" :to="{name: 'ArticleManagement'}"/>
          <q-btn flat label="个人中心" to="/discuss/user"/>
          <q-space />
          <q-avatar>
            <img :src=userImg alt="User Profile" />
          </q-avatar>
          <q-btn flat label="退出登录" color="black" @click="logout" />
        </q-toolbar>
      </q-header>
      <!-- 路由子容器 -->
      <router-view></router-view>
      <!-- 页脚 -->
      <q-footer>
        <p>&copy; 2024 2897924003. All Rights Reserved.</p>
      </q-footer>
    </q-page-container>

  </q-layout>
</template>

<style scoped>

</style>
