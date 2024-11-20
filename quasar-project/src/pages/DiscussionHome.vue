<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import {api, gatewayArticleService} from "boot/axios.js";
import { useRouter } from 'vue-router';

const page = ref(1);//mybatisplus：1；springdatajpa：0
const size = ref(10);
const articles = ref([]);
const hasMore = ref(true);    // 控制是否还有更多文章

// 模拟排行榜数据
const dailyRank = reactive([
  { id: 1, title: 'Vue3响应式系统揭秘', views: 500 },
  { id: 2, title: 'Node.js多线程编程指南', views: 450 },
  { id: 3, title: '前端性能优化基础', views: 400 },
]);

const weeklyRank = reactive([
  {id: 1, title: 'JavaScript最佳实践', views: 1500},
  {id: 2, title: 'Quasar布局与组件', views: 1300},
  {id: 3, title: 'CSS Grid布局教程', views: 1100},
]);

const monthlyRank = reactive([
  {id: 1, title: 'React vs Vue性能对比', views: 3000},
  {id: 2, title: '前端框架发展史', views: 2800},
  {id: 3, title: 'JavaScript内存管理', views: 2500},
]);

// 获取文章数据
const loadArticles = async (index,done) => {
  if (!hasMore.value) return;  // 防止多次触发请求


  try {
    const response = await gatewayArticleService.get(`/articles?page=${page.value}&size=${size.value}`);
    const newArticles = response.data;

    if (newArticles.length > 0) {
      articles.value.push(...newArticles);
      done();
      page.value++;
    } else {
      hasMore.value = false;  // 没有更多文章
    }
  } catch (error) {
    console.error('Error loading articles:', error);
  }

};
/*文章*/
const article = {
  id: null,
  title: null,
  img: null,
  summary: null,
  link: null,//文章链接
  rate: null,
  views: null,
  votes: null,
  publishDate: null,
  editDate: null,
  author: null,
  author_img: null,
}
// 跳转到文章详情
const router = useRouter();

const goToArticle = (articleId) => {
  //window.open("http://localhost:8100/discuss/article/11")
  window.open("/discuss/article/11")
  //router.push({ name: 'ArticleDetail', params: { article_id: articleId } });
};


</script>

<template>

  <q-page class="column full-height ">

    <!--文章推荐模式选择按钮-->
    <div class="full-height row q-col-gutter-md ">
      <div class="col-2"></div>
      <!-- 文章列表 -->
      <div class="full-height col-7 scroll">
       <q-infinite-scroll
         @load="loadArticles"
         :offset="200">
        <q-card

          v-for="article in articles"
          :key="article.id"
          class="q-mb-md rounded-borders"
          @click="goToArticle(article.id)"
          style="cursor: pointer"
        >
          <q-card-section>
            <div class="text-h6">{{ article.title }}</div>
            <div class="text-subtitle2 text-grey-7">
              {{ article.publishDate }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-body2">
              {{ article.summary }}
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-actions class="row items-center justify-between">
            <!-- 第一部分：浏览和点赞 -->
            <div class="row items-center q-pr-md">
              <div class="q-mr-sm">
                {{ article.views }} 浏览
              </div>
              <div>
                {{ article.votes }} 点赞
              </div>
            </div>
            <!-- 垂直分隔符 -->
            <q-separator vertical class="q-mx-md" />
            <!-- 第二部分：作者信息和收藏按钮 -->
            <div class="row items-center">
              作者：
              <q-avatar>
                <q-img src="/icons/china1.png" />
              </q-avatar>
              <div class="q-ml-sm">{{ article.author }}</div>
              <q-btn flat label="收藏" class="q-ml-md" />
            </div>
          </q-card-actions>
        </q-card>

       </q-infinite-scroll>

      </div>


      <!-- 排行榜 -->
      <div class="col-3">

        <!-- 日榜 -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">日榜</div>
          </q-card-section>
          <q-separator/>
          <q-list>
            <q-item v-for="post in dailyRank" :key="post.id">
              <q-item-section>{{ post.title }}</q-item-section>
              <q-item-section side>{{ post.views }} 浏览</q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <!-- 周榜 -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">周榜</div>
          </q-card-section>
          <q-separator/>
          <q-list>
            <q-item v-for="post in weeklyRank" :key="post.id">
              <q-item-section>{{ post.title }}</q-item-section>
              <q-item-section side>{{ post.views }} 浏览</q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <!-- 月榜 -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">月榜</div>
          </q-card-section>
          <q-separator/>
          <q-list>
            <q-item v-for="post in monthlyRank" :key="post.id">
              <q-item-section>{{ post.title }}</q-item-section>
              <q-item-section side>{{ post.views }} 浏览</q-item-section>
            </q-item>
          </q-list>
        </q-card>

      </div>

    </div>
  </q-page>
</template>

<style scoped>
/* 添加卡片的美化样式 */
.q-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.q-card:hover {
  transform: scale(1.02); /* 鼠标悬停时放大效果 */
}

.q-card-actions {
  margin-top: 10px;
}
</style>
