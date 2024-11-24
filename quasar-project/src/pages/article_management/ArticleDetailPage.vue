<template>

  <q-page padding class="full-height flex row">
    <div class="col-2 bg-blue" >
      数据
    </div>
    <div class="col-5">
    <q-card class="scroll bg-yellow" style="height: 100%;width: 100%">
      <q-card-section>
        <div class="text-h4">{{ article.article.title }}</div>
        <div class="text-subtitle2 text-grey-7">
          {{ article.article.publishDate }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-markdown :src="article.articleContent.content" />
      </q-card-section>
      <q-separator />
      <q-card-actions class="row items-center">
        <div class="q-ml-md">
          作者:
          <q-avatar>
            <q-img :src="article.article.img" />
          </q-avatar>
          {{ article.article.author }}
        </div>
        <q-btn flat label="返回" @click="goBack" />
      </q-card-actions>
    </q-card>
    </div>
    <div class="col-5 bg-red">
      评论区
    </div>
  </q-page>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { gatewayArticleService } from "boot/axios";
import {QMarkdown} from "@quasar/quasar-ui-qmarkdown";

const route = useRoute();
const router = useRouter();

// 文章数据
const article = ref({
  articleContent: "",
  article: "",
});

// 加载文章详情
const loadArticle = async () => {
  try {
    const articleId = route.params.article_id;
    const response = await gatewayArticleService.get(`/article/${articleId}`);
    article.value = response.data;
  } catch (error) {
    console.error("Failed to load article:", error);
  }
};

// 返回上一个页面
const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  loadArticle();
});
</script>

<style scoped>
.q-avatar img {
  width: 30px;
  height: 30px;
}
</style>
