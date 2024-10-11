<template>
  <q-layout view="lHh Lpr lFf">
    <!--
    <q-header class="bg-black">
      <q-toolbar class="flex">

        <div class="flex">
          <q-toolbar-title>OpenSun</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
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
-->

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/auth";
import axios from "axios";

const $q = useQuasar();
const drawer = ref(false);
const miniState = ref(true);
const $router = useRouter();
const authStore = useAuthStore();

const menuList = [
  {
    label: "Inbox",
    separator: true,
  },
  {
    label: "Outbox",
    separator: false,
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false,
  },
  {
    icon: "error",
    label: "Spam",
    separator: true,
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false,
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false,
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false,
  },
];

/*---------------------*/
/*日间夜间模式监控*/
const model = ref("day");
watch(model, (newValue, oldValue) => {
  if (newValue === "day") {
    $q.dark.set(false);
  } else {
    $q.dark.set(true);
  }
});
</script>
