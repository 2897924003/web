<template>
  <q-page class="q-pa-md bg-yellow-1">
    <q-card>
      <q-card-section>
        <div class="text-h6">我的信息</div>
      </q-card-section>

      <q-card-section>
        <div><strong>ID:</strong> {{ user.id }}</div>
        <div><strong>用户名:</strong> {{ user.username }}</div>
        <div><strong>权限:</strong> {{ user.authorities }}</div>
        <div>
          <strong>账号是否未过期:</strong>
          {{ user.accountNonExpired ? "是" : "否" }}
        </div>
        <div>
          <strong>账号是否未锁定:</strong>
          {{ user.accountNonLocked ? "是" : "否" }}
        </div>
        <div><strong>是否启用:</strong> {{ user.enabled ? "是" : "否" }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="编辑信息" @click="editProfile" color="primary" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios.js";
import { useAuthStore } from "stores/auth.js";

const user = ref({});

onMounted(async () => {
  const authStore = useAuthStore();
  const username = authStore.getUser?.username || "";

  const response = await api.get(`/user/${username}`);
  user.value = response.data;
});

const editProfile = () => {
  // 编辑用户信息的逻辑
};
</script>

<style scoped></style>
