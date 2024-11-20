<script setup>
import { useRouter } from "vue-router";
const $router = useRouter();

</script>

<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <q-btn
        class="col-12 col-sm-4"
        color="primary"
        icon="home"
        label="首页"
        @click="$router.push('/mainlayout')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="secondary"
        icon="star"
        label="跳转到indexpage"
        @click="$router.push('/indexpage')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="positive"
        icon="send"
        label="动漫"
        @click="$router.push('/targetpage')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="amber"
        icon="drafts"
        label="用户管理"
        @click="$router.push('/userauthpage')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="green"
        icon="group"
        label="班级管理"
        @click="$router.push('/studentinfopage')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="blue"
        icon="architecture"
        label="建筑图纸"
        @click="$router.push('/examplepage')"
        rounded
        dense
        glossy
      />

      <q-btn
        class="col-12 col-sm-4"
        color="blue"
        icon="me"
        label="我的信息"
        @click="$router.push('/me')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="blue"
        icon="me"
        label="在线代码编译运行平台"
        @click="$router.push('/code')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="blue"
        icon="me"
        label="用户管理系统"
        @click="$router.push('/admin')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="blue"
        icon="me"
        label="论坛"
        @click="$router.push('/discuss')"
        rounded
        dense
        glossy
      />
      <q-btn
        class="col-12 col-sm-4"
        color="blue"
        icon="me"
        label="文章管理"
        @click="$router.push('/discuss/article')"
        rounded
        dense
        glossy
      />
    </div>
  </q-page>
</template>

<style scoped>

</style>
