<template>


      <q-splitter v-model="splitterModel"  class="full-height">

        <template v-slot:before>
          <q-tabs vertical v-model="tab" @update:model-value="onTabChange" class="bg-green">
            <q-tab name="article" label="文章" ripple />
            <q-tab name="draft" label="草稿箱" ripple />
          </q-tabs>
        </template>

        <template v-slot:after>
          <!-- ViewCenter panels -->
          <q-tab-panels v-model="tab" class="full-height">
            <!-- ViewCenter panel-->
            <q-tab-panel name="article">

              <q-infinite-scroll
                @load="loadPublishedArticles"
                :offset="200"
                >
                <div class="row">
                  <ArticleCard
                    v-for="article in articles"
                    :key="article.id"
                    :article="article"
                    @delete="showDeleteDialog"
                  />
                </div>
              </q-infinite-scroll>

            </q-tab-panel>

            <q-tab-panel  name="draft" >
              <q-infinite-scroll
                @load="loadUnPublishedArticles"
                :offset="200"
               >
                <div class="row">
                <ArticleCard
                  v-for="article in articles"
                  :key="article.id"
                  :article="article"
                  @delete="showDeleteDialog"
                  @edit="showEditDialog"
                />
                </div>
              </q-infinite-scroll>
            </q-tab-panel>
          </q-tab-panels>

        </template>
      </q-splitter>

  <!-- 删除确认对话框 -->
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6">确认删除文章？</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="确认" @click="deleteArticle" />
        <q-btn color="secondary" label="取消" @click="cancelDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- 修改对话框 -->
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6">确认删除文章？</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="确认" @click="editArticle" />
        <q-btn color="secondary" label="取消" @click="cancelDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import ArticleCard from "pages/article_management/ArticleCard.vue";
import {ref} from "vue";
import { gatewayArticleService } from "boot/axios.js";
import { SessionStorage } from "quasar";
import { useAuthStore } from "stores/auth.js";

const tab = ref('article');
const splitterModel = ref(20);
const loading = ref(false);
const hasMore = ref(true);
const articles = ref([]);
const page = ref(1);
const size = ref(10);
const authStore = useAuthStore();

const dialogVisible = ref(false); // 控制对话框显示与隐藏
const articleToDelete = ref(null); // 存储待删除的文章ID


const onTabChange = async (newTab) => {
  articles.value = [];
  page.value = 1; // 重置页数
  hasMore.value = true;
};

const loadUnPublishedArticles = async (index,done) => {
  if (!hasMore.value) return;
  loading.value = true;
    const {data} = await gatewayArticleService.get(
      `/articles/unpublished`,
      {
        params: {userId: authStore.getUser.id, page: page.value, size: size.value},
        headers: {access_token: SessionStorage.getItem('access_token')},
      }
    );
    if (data.length > 0) {
      page.value++;
      articles.value.push(...data)
      done()
    }else {
      hasMore.value = false;
    }
};

const loadPublishedArticles = async (index,done) => {
  if (!hasMore.value) return;

  try {
    const { data } = await gatewayArticleService.get(
      `/articles/published`,
      {
        params: { userId: authStore.getUser.id, page: page.value, size: size.value },
        headers: { access_token: SessionStorage.getItem('access_token') },
      }
    );

    if (data.length > 0) {
      articles.value.push(...data)
      done()
      page.value++;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Error loading articles:', error);
  }
};

const deleteArticle = async () => {
  if (!articleToDelete.value) return; // 如果没有待删除文章ID，退出

  try {
    await gatewayArticleService.post(
      '/articles/delete',
      {
        actorId: useAuthStore().user.id,
        articleId: articleToDelete.value,
      },
      {
        headers: { access_token: SessionStorage.getItem('access_token') },
      }
    );

    // 删除成功后更新文章列表
    articles.value = articles.value.filter((article) => article.id !== articleToDelete.value);
    dialogVisible.value = false; // 隐藏对话框
  } catch (error) {
    console.error(error);
  }
};

const cancelDelete = () => {
  dialogVisible.value = false; // 取消删除，关闭对话框
};


const editArticle = async () => {
  if (!articleToDelete.value) return; // 如果没有待删除文章ID，退出

  try {
    await gatewayArticleService.post(
      '/articles/delete',
      {
        actorId: useAuthStore().user.id,
        articleId: articleToDelete.value,
      },
      {
        headers: { access_token: SessionStorage.getItem('access_token') },
      }
    );

    // 删除成功后更新文章列表
    articles.value = articles.value.filter((article) => article.id !== articleToDelete.value);
    dialogVisible.value = false; // 隐藏对话框
  } catch (error) {
    console.error(error);
  }
};


const showDeleteDialog = (articleId) => {
  articleToDelete.value = articleId;  // 设置待删除的文章ID
  dialogVisible.value = true;  // 显示对话框
};
const showEditDialog = (articleId) => {
  articleToDelete.value = articleId;  // 设置待删除的文章ID
  dialogVisible.value = true;  // 显示对话框
};

</script>
