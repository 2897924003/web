<template>
  <q-page class="user-info-page q-pa-md">
    <div class="row justify-center">
      <q-card class="q-pa-lg user-card" flat bordered>
        <!-- 用户头像和欢迎语 -->
        <div class="text-center q-mb-md">
          <q-avatar size="120px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="User Avatar" />
          </q-avatar>
          <h3 class="q-pt-md text-white">{{ user.name }}</h3>
          <q-btn icon="edit" flat round color="white" @click="editProfile" />
        </div>

        <!-- 用户基本信息 -->
        <q-list padding dense>
          <q-item>
            <q-item-section>
              <q-item-label class="text-white">Email</q-item-label>
              <q-item-label caption>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset spaced />

          <q-item>
            <q-item-section>
              <q-item-label class="text-white">Phone</q-item-label>
              <q-item-label caption>{{ user.phone }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <!-- 设置和修改密码按钮 -->
        <div class="q-mt-md">
          <q-btn color="primary" glossy icon="settings" label="Settings" class="q-mb-md" @click="openSettingsDialog" />
          <q-btn color="primary" glossy icon="lock" label="Change Password" @click="openChangePasswordDialog" />
        </div>
      </q-card>
    </div>

    <!-- 设置弹窗 -->
    <q-dialog v-model="showSettingsDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Settings</div>
        </q-card-section>
        <q-card-section>
          <q-toggle v-model="user.notifications" label="Enable Notifications" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- 修改密码弹窗 -->
    <q-dialog v-model="showChangePasswordDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Change Password</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="password.oldPassword" type="password" label="Old Password" />
          <q-input v-model="password.newPassword" type="password" label="New Password" />
          <q-input v-model="password.confirmPassword" type="password" label="Confirm New Password" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn color="primary" label="Submit" @click="changePassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Sun Jianhao',
  email: 'sun_jh@example.com',
  phone: '+86 123 456 7890',
  notifications: true
})

const password = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showSettingsDialog = ref(false)
const showChangePasswordDialog = ref(false)

const openSettingsDialog = () => {
  showSettingsDialog.value = true
}

const openChangePasswordDialog = () => {
  showChangePasswordDialog.value = true
}

const changePassword = () => {
  if (password.value.newPassword === password.value.confirmPassword) {
    console.log('Password changed successfully')
    // 执行密码修改逻辑
  } else {
    console.log('Passwords do not match')
  }
}
</script>

<style scoped>
.user-info-page {
  background: linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%);
  height: 100%;
}

.user-card {
  max-width: 500px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.text-white {
  color: white;
}

.q-btn {
  width: 100%;
}
</style>
