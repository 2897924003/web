<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-md" style="width: 600px">
      <h1 class="text-center text-h5 q-mb-md">C 语言在线编译器</h1>
      <q-input
        filled
        type="textarea"
        v-model="code"
        label="在这里输入您的 C 语言代码..."
        rows="10"
        lazy-rules
        :rules="[(val) => val.length > 0 || '代码不能为空']"
        class="text-left q-mb-md"
        style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)"
      />

      <!-- 使用 q-slide-item 替代 q-btn -->
      <div class="text-center q-mt-md">
        <q-list bordered separator>
          <q-slide-item ref="slideItem" @left="handleRunCode" @right="clearAll">
            <template v-slot:left>
              <q-icon name="play_arrow" />
            </template>
            <template v-slot:right>
              <q-icon name="delete" />
            </template>

            <q-item>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="code" />
              </q-item-section>
              <q-item-section>运行代码</q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
      </div>

      <!-- 输出卡片 -->
      <q-card
        v-if="output"
        class="q-mt-md bg-light-green text-dark q-pa-md"
        style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)"
      >
        <q-card-section>
          <strong>输出：</strong>
          <pre class="q-mt-xs">{{ output }}</pre>
        </q-card-section>
      </q-card>

      <!-- 错误卡片 -->
      <q-card
        v-if="error"
        class="q-mt-md bg-light-red text-dark q-pa-md"
        style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)"
      >
        <q-card-section>
          <strong>错误：</strong>
          <pre class="q-mt-xs">{{ error }}</pre>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { api, CodeServiceApi, gatewayCodeService } from "boot/axios.js";

const code = ref("");
const output = ref("");
const error = ref("");
const path = ref("");
const slideItem = ref(); // 引用 q-slide-item

// 处理运行代码的函数
const handleRunCode = async () => {
  output.value = "";
  error.value = "";
  path.value = "";

  try {
    // 第一步：编译代码
    const compileResponse = await gatewayCodeService.post(
      "/compile",
      code.value,
      {
        headers: {
          "Content-Type": "text/plain",
          access_token: sessionStorage.getItem("access_token"),
        },
        withCredentials: true,
      },
    );

    // 检查编译是否成功
    if (compileResponse.data.error) {
      error.value = compileResponse.data.error;
      return;
    }

    // 第二步：使用编译结果的 output 字段运行代码
    path.value = compileResponse.data.output; // 获取编译生成的文件路径

    const runResponse = await gatewayCodeService.post("/run", path.value, {
      headers: {
        "Content-Type": "text/plain",
        access_token: sessionStorage.getItem("access_token"),
      },
      withCredentials: true,
    });

    // 检查运行是否成功
    if (runResponse.data.error) {
      error.value = runResponse.data.error;
    } else {
      output.value = runResponse.data.output;
    }
  } catch (err) {
    error.value = "网络错误：" + err.message;
  } finally {
    resetSlideItem(); // 运行代码后重置滑动状态
  }
};

// 清空输入框和输出
const clearAll = () => {
  error.value = "";
  code.value = "";
  output.value = "";
  resetSlideItem(); // 清空后重置滑动状态
};

// 重置 q-slide-item 状态
const resetSlideItem = () => {
  if (slideItem.value) {
    slideItem.value.reset(); // 调用 reset 方法重置状态
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0; /* 清除默认的 margin */
}

.bg-light-green {
  background-color: #e0f7fa;
  border-left: 4px solid #26a69a;
}

.bg-light-red {
  background-color: #ffebee;
  border-left: 4px solid #e57373;
}
</style>
