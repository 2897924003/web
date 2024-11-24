<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import {useAuthStore} from "stores/auth.js";
import {gatewayArticleService} from "boot/axios.js";
import {SessionStorage, useQuasar} from "quasar";


/*这里是q-markdown的所有插件的导入*/
import {QMarkdown} from "@quasar/quasar-ui-qmarkdown";

import abbreviation from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
//import emoji from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import taskLists from 'markdown-it-task-lists'
//import mermaid from '@datatraccorporation/markdown-it-mermaid'

// 引用的内容
const splitterModel = ref(50);
const markdown = ref('');
const noHtml = ref(false);
const noLink = ref(false);
const noLinkify = ref(false);
const noTypographer = ref(false);
const noBreaks = ref(false);
const noHighlight = ref(false);
const noEmoji = ref(false);
const noSubscript = ref(false);
const noSuperscript = ref(false);
const noFootnote = ref(false);
const noDeflist = ref(false);
const noAbbreviation = ref(false);
const noInsert = ref(false);
const noMark = ref(false);
const noImage = ref(false);
const noTasklist = ref(false);
const noContainer = ref(false);
const noMermaid = ref(false);
const plugins = ref([]);
const count = ref(0);

// 监听多个配置变量变化
watch([
  noAbbreviation,
  noDeflist,
  noEmoji,
  noFootnote,
  noInsert,
  noMark,
  noSubscript,
  noSuperscript,
  noTasklist,
  noMermaid
], rebuildPlugins);

// 根据插件状态重建插件数组
function rebuildPlugins() {
  plugins.value.splice(0, plugins.value.length);

  if (!noAbbreviation.value) plugins.value.push(abbreviation);
  if (!noDeflist.value) plugins.value.push(deflist);
  //if (!noEmoji.value) plugins.value.push(emoji);
  if (!noFootnote.value) plugins.value.push(footnote);
  if (!noInsert.value) plugins.value.push(insert);
  if (!noMark.value) plugins.value.push(mark);
  if (!noSubscript.value) plugins.value.push(subscript);
  if (!noSuperscript.value) plugins.value.push(superscript);
  if (!noTasklist.value) plugins.value.push(taskLists);

  // 强制刷新 QMarkdown
  count.value += 1;
}

// 挂载时初始化插件
onMounted(() => {
  rebuildPlugins();
});
/*这里是所有加载的插件*/
const editorPlugins = ref([
  abbreviation,
  deflist,
  //emoji,
  footnote,
  insert,
  mark,
  subscript,
  superscript,
  taskLists,

])

  /*-----------------------*/

  const page = ref(1);
  const size = ref(10);
  const authStore = useAuthStore();
  const $q = useQuasar();


const articleContent = ref({
  content: "",
});

const articleMeta = ref({
  title: "",
  summary: "",
  img: "",
  authorId: null,
  authorName: null,
  authorImg: null,
});
  const editorRef = ref(null)
  // 插入块引用功能
  function insertBlockquote() {
  const edit = editorRef.value
  edit.caret.restore()
  edit.runCmd('insertHTML', ` `)

}

  const mybar={

  block: {
  tip: '插入块',
  icon: 'save',
  label: '块',
  cmd: 'insertHTML',
  param: '<blockquote class="q-markdown--note"></blockquote>'
  },

}


  const editorToolbar = [
  ['block','link','code'],
  // 文本样式
  [ "italic", "strike", "underline", "subscript", "superscript"],

  // 对齐功能
  [
  {
    label: $q.lang.editor.align,
    icon: $q.iconSet.editor.align,
    tip:'aaaaaaaaaaaa',
    fixedLabel: true,
    options: ["left", "center", "right", "justify"],
  },
  ],

  // 插入功能
  ["token", "hr", "custom_btn"],

  // 页面功能
  ["print", "fullscreen"],

  // 格式化选项
  [
  {
    label: $q.lang.editor.formatting,
    icon: $q.iconSet.editor.formatting,
    list: "no-icons",
    options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
  },
  {
    label: $q.lang.editor.fontSize,
    icon: $q.iconSet.editor.fontSize,
    fixedLabel: true,
    fixedIcon: true,
    list: "no-icons",
    options: [
    "size-1",
    "size-2",
    "size-3",
    "size-4",
    "size-5",
    "size-6",
    "size-7",
    ],
  },
  "removeFormat",
  ],

  // 列表和缩进
  ["quote", "unordered", "ordered", "outdent", "indent"],
  // 查看源码
  ["viewsource"],
  // 撤销/重做
  ["undo", "redo"],


  ];

  const createArticle = async () => {
  try {
  await gatewayArticleService.post(
  "/articles/create",
{
  articleContent: articleContent.value,
  articleMeta: articleMeta.value,
  actorId: authStore.getUser.id,
},
{
  headers: {access_token: SessionStorage.getItem("access_token")},
},
  );
  $q.notify({type: "positive", message: "文章保存成功"});
} catch (error) {
  console.error("Error creating article:", error);
  $q.notify({type: "negative", message: "文章保存失败"});
}
};
  const onRejected = async (rejectedEntries) => {
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} -》图片过大`,
  });
};

  const onAdded = async (files) => {
  //TODO 现在文件系统基础设施还没完成，先全部默认图片
  articleMeta.value.img = "http://localhost:8100/icons/china1.png";
};

  onMounted(() => {
  articleMeta.value.authorId = authStore.getUser.id;
  articleMeta.value.authorName = authStore.getUser.nickname;
  articleMeta.value.authorImg = authStore.getUser.img;
  //TODO 移除
  articleMeta.value.img = "http://localhost:8100/icons/china1.png";
});

/*常见问题-确保光标能够跳出当前DOM*/
function  addNewLine(){
    nextTick(() => {
      if (!articleContent.value.content.startsWith('<br>')) {
        articleContent.value.content = '<br>' + articleContent.value.content;
      }
      if (!articleContent.value.content.endsWith('<br>')) {
        articleContent.value.content += '<br>';
      }
    });
}
</script>

<template>
  <q-page>
    <!-- 创建文章部分 -->
    <div class="q-pa-md bg-white rounded-borders">
      <q-input
        v-model="articleMeta.title"
        label="请输入标题（建议30字以内）"
        counter
        maxlength="30"
        filled
        class="q-mb-md"
      />

      <q-card class="row q-pt-md q-gutter-sm">
        <q-card-section>
          <q-input
            v-model="articleMeta.summary"
            label="请输入概览"
            counter
            maxlength="32"
            filled
          />
        </q-card-section>
        <q-space />

        <q-card-section>
          <q-uploader
            style="max-width: 300px"
            url=""
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
        ref="editorRef"
        placeholder="开始创作吧...."
        toolbar-push
        :definitions="mybar"
        v-model="articleContent.content"
        @click="addNewLine"
        :dense="$q.screen.lt.md"
        :toolbar="editorToolbar"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"/>

      <q-expansion-item label="更多设置" expand-icon="expand_more">
        <div>分类、封面、标签、文集、定时发布等设置</div>
      </q-expansion-item>

      <div class="row q-gutter-md justify-center">
        <q-btn color="primary" label="提交文章" />
        <q-btn @click="createArticle" color="primary" outline label="存草稿" />
        <q-btn color="primary" outline label="手机端预览" />
        <q-btn color="primary" outline label="网页端预览" />
      </div>

    </div>
  </q-page>
</template>

<style scoped></style>
