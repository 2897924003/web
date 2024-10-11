<template>
  <q-layout view="lHh LpR lFf">
    <q-page class="q-pa-md">
      <q-toolbar>
        <q-toolbar-title> 建筑图纸分类 </q-toolbar-title>
        <q-input
          v-model="search"
          placeholder="暂未实现..."
          outlined
          @keyup.enter="applyFilter"
        >
          <template v-slot:append>
            <q-icon name="search" @click="applyFilter" />
          </template>
        </q-input>
      </q-toolbar>

      <q-fab
        color="amber"
        text-color="black"
        icon="keyboard_arrow_left"
        direction="right"
        @click="drawer = !drawer"
      >
        <template v-slot:label="{ opened }">
          <div :class="{ 'example-fab-animate--hover': opened !== true }">
            {{ opened !== true ? "Category" : "Close" }}
          </div>
        </template>
      </q-fab>

      <q-drawer
        v-model="drawer"
        side="right"
        :width="width"
        class="flex row"
        show-if-above
      >
        <q-splitter
          v-model="splitterModel"
          class="window-height window-width"
          separator-class="bg-black"
          separator-style="width: 2px"
        >
          <template v-slot:before>
            <q-tree
              v-model:selected="selectedCategory"
              @update:selected="fetchImages"
              :nodes="category"
              no-transition
              default-expand-all
              node-key="categoryId"
            />
          </template>

          <template v-slot:after>
            <q-input
              ref="filterRef"
              filled
              v-model="filter"
              label="搜索项目--暂未实现"
              clearable
            >
              <template v-slot:append>
                <q-icon
                  v-if="filter !== ''"
                  name="search"
                  class="cursor-pointer"
                  @click="doFilter"
                />
              </template>
            </q-input>

            <q-tab-panels
              v-model="selectedCategory"
              animated
              @before-transition="fetchProject"
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="1">
                <div class="text-h4 q-mb-md">二层</div>
                <p>新中式在此</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="2">
                <div class="text-h4 q-mb-md">二层</div>
                <p>欧式</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="3">
                <div class="text-h4 q-mb-md">二层</div>
                <p>现代风</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="4">
                <div class="text-h4 q-mb-md">二层</div>
                <p>北欧风</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="5">
                <div class="text-h4 q-mb-md">三层</div>
                <p>新中式在此</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="6">
                <div class="text-h4 q-mb-md">三层</div>
                <p>欧式</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="7">
                <div class="text-h4 q-mb-md">三层</div>
                <p>现代风</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="8">
                <div class="text-h4 q-mb-md">三层</div>
                <p>北欧风</p>
                <q-list v-for="project in projects" :key="project">
                  <q-item clickable v-ripple @click="fetchProjectImg(project)">
                    <q-item-section avatar>
                      <q-avatar>
                        <q-img src="/icons/china.png" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ project }}号项目</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced />
                </q-list>
              </q-tab-panel>

              <!-- 根据需要添加更多的 q-tab-panel -->
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-drawer>

      <q-page-container>
        <div class="fit">
          <q-list>
            <q-card v-for="image in images" :key="image.entity">
              <q-card-section>
                <q-img
                  :src="image.path"
                  alt="Drawing Image"
                  class="cursor-pointer"
                  @click="showImage(image)"
                />
              </q-card-section>
              <q-card-section> 暂时没有描述 </q-card-section>
            </q-card>

            <q-item v-if="images.length === 0">
              <q-item-section>
                <div class="text-accent">没有匹配的数据。</div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-page-scroller
          position="bottom-right"
          :scroll-offset="150"
          :offset="[18, 18]"
        >
          <q-btn fab icon="keyboard_arrow_up" color="accent" />
        </q-page-scroller>
      </q-page-container>

      <q-dialog v-model="dialog">
        <q-card class="window-width">
          <q-img :src="dialogImage" draggable decoding="auto"></q-img>
          <q-card-actions align="center">
            <q-btn flat label="返回" color="primary" v-close-popup />
            <q-btn
              flat
              label="下载"
              color="primary"
              v-close-popup
              @click="download(dialogImage)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-layout>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
const miniState = ref(false);
const drawer = ref(false);
const $q = useQuasar();
const screen = ref();
const width = ref();
onMounted(() =>{screen.value = window.innerWidth
  width.value = screen.value > 600 ? 1500 : 300;
})


const category = [
  {
    categoryId: "Number of facades",
    label: "二层",
    children: [
      { categoryId: "1", label: "New Chinese style" },
      { categoryId: "2", label: "European style" },
      { categoryId: "3", label: "modern style" },
      { categoryId: "4", label: "Nordic style" },
    ],
  },
  {
    categoryId: "Storeys / plantas",
    label: "三层",
    avatar: "",
    children: [
      { categoryId: "5", label: "New Chinese style" },
      { categoryId: "6", label: "European style" },
      { categoryId: "7", label: "modern style" },
      { categoryId: "8", label: "Nordic style" },
    ],
  },
];

const search = ref("");
const selectedCategory = ref("");
const dialog = ref(false);
const dialogImage = ref("");
const splitterModel = ref(40);
const filter = ref("");
const applyFilter = () => {
  // 可以在这里实现过滤逻辑
};
const doFilter = () => {};

/*获取目录下的项目集合,并展示以供选择查看*/
const projects = ref();
const fetchProject = async (newVal) => {
  if (newVal === null) {
    return;
  }
  try {
    const response = await axios.get(
      `https://test.opensun.asia/api/file/projects/${newVal}`,
    );
    projects.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
/*根据项目id获取图片路径*/
const fetchProjectImg = async (project) => {
  if (project === null) {
    return;
  }
  try {
    const response = await axios.get(
      `https://test.opensun.asia/api/file/ids?project=${project}&category=${selectedCategory.value}`,
    );
    images.value = response.data.map((entity) => ({
      entity,
      path: `https://test.opensun.asia/api/file/image/${entity.id}`,
    }));
  } catch (error) {
    console.error(error);
  }
};

// 获取目录下的全部图片(似乎用不上了)
const images = ref([]);
const fetchImages = async () => {
  if (selectedCategory.value === null) {
    return;
  }
  try {
    const response = await axios.get(
      `https://test.opensun.asia/api/file/ids?category=${selectedCategory.value}`,
    );
    images.value = response.data.map((entity) => ({
      entity,
      path: `https://test.opensun.asia/api/file/image/${entity.id}`,
    }));
  } catch (error) {
    console.error("获取图片路径失败:", error);
  }
};

// 下载图片
const download = (dialogImage) => {
  const link = document.createElement("a");
  link.href = dialogImage;
  link.download = "image.jpg";
  link.click();
};

// 弹出图片
const showImage = (drawing) => {
  dialogImage.value = drawing.path;
  dialog.value = true;
};
</script>
<style lang="sass" scoped>
.example-fab-animate,
.q-fab:hover .example-fab-animate--hover
  animation: example-fab-animate 0.82s cubic-bezier(.36,.07,.19,.97) both
  transform: translate3d(0, 0, 0)
  backface-visibility: hidden
  perspective: 1000px

@keyframes example-fab-animate
  10%, 90%
    transform: translate3d(-1px, 0, 0)

  20%, 80%
    transform: translate3d(2px, 0, 0)

  30%, 50%, 70%
    transform: translate3d(-4px, 0, 0)

  40%, 60%
    transform: translate3d(4px, 0, 0)
</style>
