<template>
  <q-layout view="hHh LpR fFf">

    <!-- 页眉 -->
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          用户中心
        </q-toolbar-title>
      </q-toolbar>


    </q-header>

    <!-- 侧边抽屉 -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <q-tabs vertical>
          <q-route-tab to="/profile" label="个人信息" />
          <q-separator />
          <q-route-tab to="/security" label="账号安全" />
          <q-separator />
          <q-route-tab to="/users" label="用户管理" />
          <q-separator />
          <q-route-tab to="/security" label="角色管理" />
          <q-separator />
          <q-route-tab to="/security" label="权限管理" />
          <q-separator />
          <q-route-tab to="/security" label="日志审计" />
        </q-tabs>

    </q-drawer>

    <!-- 主内容区域 -->
    <q-page-container>
      <router-view :key="currentPage" />
    </q-page-container>

    <!-- 页脚 -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

    const leftDrawerOpen = ref(false)
    const currentPage = ref('profile')
    const router = useRouter()

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const navigateTo = (page) => {
      currentPage.value = page
      if (page === 'profile') {
        router.push('/profile')
      } else if (page === 'security') {
        router.push('/security')
      }
    }




</script>
