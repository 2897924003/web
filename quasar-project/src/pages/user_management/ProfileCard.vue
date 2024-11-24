<script setup>
import { ref } from "vue";

// 模拟用户信息
const user = ref({
  name: "李四",
  avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
  title: "美食博主",
  about: "热爱美食和摄影，喜欢探索新鲜事物，性格开朗，乐于与人分享生活。",
  tags: ["旅行", "美食", "摄影"],
  advantages: [
    "擅长烹饪，能做出多种地道美食",
    "经济稳定，有一定存款",
    "热爱健身，注重生活品质",
  ],
  spouseRequirements: [
    "年龄在25-35岁之间",
    "性格开朗，善于沟通",
    "热爱生活，喜欢旅行",
    "有稳定工作或明确职业规划",
  ],
});
</script>

<template>
  <q-page padding>
    <q-card>
      <!-- 用户头像和基础信息 -->
      <q-card-section class="text-center">
        <q-avatar size="100px" class="q-mb-sm">
          <img :src="user.avatar" />
        </q-avatar>
        <div class="text-h5">{{ user.name }}</div>
        <div class="text-subtitle2">{{ user.title }}</div>
        <p class="text-body2 q-mt-sm">{{ user.about }}</p>
      </q-card-section>

      <q-separator />

      <!-- 用户标签 -->
      <q-card-section>
        <div class="text-h6">个人标签</div>
        <div>
          <q-chip v-for="tag in user.tags" :key="tag" class="q-mt-sm">{{
            tag
          }}</q-chip>
        </div>
      </q-card-section>

      <q-separator />

      <!-- 个人优势 -->
      <q-card-section>
        <div class="text-h6">个人优势</div>
        <ul>
          <li v-for="advantage in user.advantages" :key="advantage">
            {{ advantage }}
          </li>
        </ul>
      </q-card-section>

      <q-separator />

      <!-- 配偶要求 -->
      <q-card-section>
        <div class="text-h6">配偶要求</div>
        <ul>
          <li v-for="requirement in user.spouseRequirements" :key="requirement">
            {{ requirement }}
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.q-mb-sm {
  margin-bottom: 0.5rem;
}
.q-chip {
  margin-right: 0.5rem;
}
</style>
