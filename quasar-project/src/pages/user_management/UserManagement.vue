<template>
  <q-page class="q-pa-md column">
    <q-card>
      <q-card-section class="row bg-yellow">
        <q-avatar>
          <q-img
            src="https://loremflickr.com/400/400?lock=3511949300144017"
          ></q-img>
        </q-avatar>
        <div class="column">
          <div>张三 - 3级 - 经验 -105/2563</div>
          <div>暂无描述</div>
        </div>

        <q-separator class="black" />
      </q-card-section>

      <q-card-section class="bg-red">
        <q-toolbar class="bg-amber">
          <q-tabs v-model="nav" shrink>
            <q-tab name="profile" label="主页" />
            <q-tab name="create" label="投稿" />
            <q-tab name="votes" label="收藏" />
            <q-tab name="setting" label="设置" />
          </q-tabs>
        </q-toolbar>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="bg-blue">
        <q-tab-panels v-model="nav" class="col">
          <q-tab-panel name="profile">
            <profile-card></profile-card>
          </q-tab-panel>
          <q-tab-panel name="create">
            <draft-page></draft-page>
          </q-tab-panel>
          <q-tab-panel name="data"> </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import ViewCenter from "pages/article_management/ViewCenter.vue";
import DraftPage from "pages/article_management/DraftPage.vue";
import { ref } from "vue";
import ProfileCard from "pages/user_management/ProfileCard.vue";
const nav = ref("view");
</script>
