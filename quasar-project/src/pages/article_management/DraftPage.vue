<script setup>
import {onMounted, ref} from 'vue';
import {useAuthStore} from 'stores/auth.js';
import {gatewayArticleService} from 'boot/axios.js';
import {SessionStorage, useQuasar} from 'quasar';

const page = ref(1);
const size = ref(10);
const authStore = useAuthStore();
const $q = useQuasar();

const articleContent = ref({
  content: '',
});

const articleMeta = ref({
  title: '',
  summary: '',
  img: '',
  authorId: null,
  authorName: null,
  authorImg: null,
});

const editorToolbar = [
  // 文本样式
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],

  // 对齐功能
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
  ],

  // 插入功能
  ['token', 'hr', 'link', 'custom_btn'],

  // 页面功能
  ['print', 'fullscreen'],

  // 格式化选项
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'default_font',
        'arial',
        'arial_black',
        'comic_sans',
        'courier_new',
        'impact',
        'lucida_grande',
        'times_new_roman',
        'verdana'
      ]
    },
    'removeFormat'
  ],

  // 列表和缩进
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

  // 撤销/重做
  ['undo', 'redo'],

  // 查看源码
  ['viewsource']
];

const createArticle = async () => {
  try {
    await gatewayArticleService.post(
      '/articles/create',
      {
        articleContent: articleContent.value,
        articleMeta: articleMeta.value,
        actorId: authStore.getUser.id,
      },
      {
        headers: {access_token: SessionStorage.getItem('access_token')},
      }
    );
    $q.notify({type: 'positive', message: '文章保存成功'});

  } catch (error) {
    console.error('Error creating article:', error);
    $q.notify({type: 'negative', message: '文章保存失败'});
  }
};
const onRejected =async (rejectedEntries) =>{
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} -》图片过大`
  })
}

const onAdded = async (files) =>{
  //TODO 现在文件系统基础设施还没完成，先全部默认图片
  articleMeta.value.img = 'http://localhost:8100/icons/china1.png'
}


onMounted(() => {
  articleMeta.value.authorId = authStore.getUser.id;
  articleMeta.value.authorName = authStore.getUser.nickname;
  articleMeta.value.authorImg = authStore.getUser.img;

  //TODO 移除
  articleMeta.value.img = 'http://localhost:8100/icons/china1.png'
});
</script>

<template>
<q-page>

  <!-- 创建文章部分 -->
  <div class="q-pa-md bg-white rounded-borders">


    <q-input v-model="articleMeta.title" label="请输入标题（建议30字以内）" counter maxlength="30" filled
             class="q-mb-md"/>

    <q-card class="row q-pt-md q-gutter-sm">

      <q-card-section>
        <q-input v-model="articleMeta.summary" label="请输入概览" counter maxlength="32" filled/>
      </q-card-section>
      <q-space/>

      <q-card-section>
        <q-uploader
          style="max-width: 300px"
          url=''
          label="暂不支持上传，文件基础设施搭建中"
          multiple
          accept="image/*"
          max-file-size="2048000"
          max-files="1"
          @rejected="onRejected"
          @added="onAdded"
        />
      </q-card-section>
    </q-card>

    <q-editor
      v-model="articleContent.content"
      :dense="$q.screen.lt.md"
      :toolbar="editorToolbar"
      :fonts="{arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
  }"
    />

    <q-expansion-item label="更多设置" expand-icon="expand_more">
      <div>分类、封面、标签、文集、定时发布等设置</div>
    </q-expansion-item>
    <div class="row q-gutter-md justify-center">
      <q-btn color="primary" label="提交文章"/>
      <q-btn @click="createArticle" color="primary" outline label="存草稿"/>
      <q-btn color="primary" outline label="手机端预览"/>
      <q-btn color="primary" outline label="网页端预览"/>
    </div>
  </div>

</q-page>
</template>

<style scoped>

</style>
