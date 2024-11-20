<template>
  <q-page padding>
    <q-card class="q-ma-md" v-if="article">
      <q-card-section>
        <div class="text-h4">{{ article.title }}</div>
        <div class="text-subtitle2 text-grey-7">{{ article.publishDate }}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-body1">{{ article.content }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="row items-center">
        <div class="q-ml-md">
          作者: <q-avatar>
          <q-img :src="article.img" />
        </q-avatar>
          {{ article.author }}
        </div>
      </q-card-actions>
    </q-card>

    <q-btn flat label="返回" @click="goBack" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {api, gatewayArticleService} from 'boot/axios';  // 根据你项目的 axios 配置路径调整

const route = useRoute();
const router = useRouter();

// 文章数据
const article = ref(null);

// 加载文章详情
const loadArticle = async () => {
  try {

    const articleId = route.params.article_id;
    const response = await gatewayArticleService.get(`/article/${articleId}`);
    article.value = response.data;
  } catch (error) {
    console.error('Failed to load article:', error);
  }
};

// 返回上一个页面
const goBack = () => {
  router.go(-1);  // 返回到上一个页面
};

onMounted(() => {
  loadArticle();
});
</script>

<style scoped>
.q-card {
  max-width: 800px;
  margin: 0 auto;
}
.q-avatar img {
  width: 30px;
  height: 30px;
}
</style>
