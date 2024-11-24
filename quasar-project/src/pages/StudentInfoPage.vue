<template>
  <q-layout class="row justify-center">
    <q-page class="bg-accent">
      <div class="q-pa-md" style="width: 100%; height: 100%">
        <q-table
          grid
          card-class="bg-amber-5 text-purple"
          color="red"
          title="班级学生信息"
          :rows="rows"
          :columns="columns"
          row-key="id"
          selection="multiple"
          :selected-rows-label="getSelectedString"
          v-model:selected="selected"
          :loading="loading"
          :filter="filter"
          v-model:pagination="pagination"
          @request="getInfos"
          no-data-label="没有指定数据"
          no-results-label="没有匹配数据"
          @row-click="openRowOfStudentInfoDialog"
        >
          <template v-slot:pagination="scope">
            <q-btn
              v-if="scope.pagesNumber > 2"
              icon="first_page"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isFirstPage"
              @click="scope.firstPage"
            />
            <q-btn
              icon="chevron_left"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isFirstPage"
              @click="scope.prevPage"
            />
            <q-btn
              icon="chevron_right"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isLastPage"
              @click="scope.nextPage"
            />
            <q-btn
              v-if="scope.pagesNumber > 2"
              icon="last_page"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isLastPage"
              @click="scope.lastPage"
            />
          </template>

          <!-- 搜索框 -->
          <template v-slot:top>
            <div class="row q-gutter-lg">
              <q-btn
                color="primary"
                label="新增学生"
                @click="openAddStudentDialog"
              />
              <q-btn color="primary" label="删除学生" @click="deleteStudent" />

              <q-btn
                color="primary"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
              <q-input
                borderless
                dense
                debounce="800"
                v-model="filter"
                placeholder="搜索..."
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </template>

          <!-- 未搜索到的信息显示 -->
          <template v-slot:no-data="{ icon, message, filter }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <q-icon size="2em" name="sentiment_dissatisfied" />
              <span> Well this is sad... {{ message }} </span>
              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
            </div>
          </template>

          <!-- 修改学生信息 -->
        </q-table>
      </div>
      <q-dialog v-model="rowDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ isEditing ? "修改学生信息" : "添加学生" }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-input
              clearable
              :readonly="isEditing"
              v-model="rowDetails.id"
              label="id"
            />
            <q-input clearable v-model="rowDetails.dormitory" label="寝室号" />
            <q-input clearable v-model="rowDetails.name" label="姓名" />
            <q-input
              clearable
              maxlength="11"
              v-model="rowDetails.phone"
              label="电话"
              mask=""
              :rules="[
                (val) =>
                  /^(?:1[3-9])\d{9}$/.test(val) || '请输入有效的中国手机号',
              ]"
            >
              <template v-slot:prepend>
                <q-avatar>
                  <q-img fit="cover" src="/icons/china1.png" />
                </q-avatar>
              </template>
            </q-input>
            <!-- Add more fields as needed -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="返回" color="primary" v-close-popup />
            <q-btn
              flat
              label="确认"
              color="primary"
              @click="isEditing ? updateStudentInfo() : addStudent()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { exportFile, useQuasar } from "quasar";
import { api } from "boot/axios.js";
const $q = useQuasar();

// 定义学生信息表格列
const columns = [
  {
    name: "userId",
    required: true,
    label: "ID", // 标签
    field: (row) => row.id,
    format: (val) => `${val}`,
    align: "center",
    sortable: false,
  },
  {
    name: "dormitory",
    required: true,
    label: "寝室",
    field: "dormitory",
    align: "center",
    sortable: false,
  },
  {
    name: "name",
    required: true,
    label: "姓名",
    field: "name",
    align: "center",
    sortable: false,
  },
  {
    name: "phone",
    required: false,
    label: "电话",
    field: "phone",
    align: "center",
    sortable: false,
  },
];

const rows = ref([]);
const originalRows = ref([]);
const selected = ref([]);
const filter = ref("");
const loading = ref(false);
const rowDialog = ref(false);
const isEditing = ref(false);
const rowDetails = ref({ id: null, dormitory: null, name: null, phone: null });
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1, // 起始页数
  rowsPerPage: 12, // 每页行数
  rowsNumber: 0, // 总行数
});

/*导出表格*/
const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  // Replace double quotes with two double quotes to escape them
  formatted = formatted.split('"').join('""');

  // Wrap the field with double quotes if it contains a comma, newline, or double quote
  return formatted.indexOf(",") > -1 ||
    formatted.indexOf("\n") > -1 ||
    formatted.indexOf('"') > -1
    ? `"${formatted}"`
    : formatted;
};
/*导出表格*/
const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.value.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row,
            ),
          )
          .join(","),
      ),
    )
    .join("\r\n");

  const status = exportFile("学生信息.csv", content, "text/csv");
  if (status !== true) {
    this.$q.notify({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
};

// 支持异步的数据获取方法
const fetchFromServer = async () => {
  try {
    const response = await api.get("users", {
      headers: { Authorization: sessionStorage.getItem("jwt") },
    });

    // 成功将响应的数据接收
    originalRows.value = response.data.content;
    // 更新总行数
    pagination.value.rowsNumber = originalRows.value.length;

    return originalRows.value;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const getInfos = async (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;

  // 插入等待画面
  loading.value = true;

  // 需要查询的条数
  const fetchCount =
    rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

  // calculate starting row of data
  const startRow = (page - 1) * rowsPerPage;

  // 等待从服务器获取数据
  await fetchFromServer();

  // 过滤要查询的数据
  let data = originalRows.value.slice();
  if (filter) {
    data = data.filter((row) => row.id.includes(filter));
  }

  // 排序
  if (sortBy) {
    const sortFn =
      sortBy === "desc"
        ? descending
          ? (a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0)
          : (a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)
        : descending
          ? (a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
          : (a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
    data.sort(sortFn);
  }

  // 分页
  rows.value = data.slice(startRow, startRow + fetchCount);

  // 结束等待画面
  loading.value = false;

  // 更新分页信息
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  pagination.value.sortBy = sortBy;
  pagination.value.descending = descending;
};

onMounted(() => {
  getInfos({
    pagination: pagination.value,
    filter: undefined,
  });
});

/* 统计选中项 */
const getSelectedString = () => {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${rows.value.length}`;
};

/*修改学生模式*/
const openRowOfStudentInfoDialog = (evt, row, index) => {
  isEditing.value = true; // 设置为编辑模式

  rowDetails.value = { ...row };
  rowDialog.value = true;
};
/*添加学生模式*/
const openAddStudentDialog = () => {
  isEditing.value = false; // 设置为添加模式
  rowDetails.value = { id: null, dormitory: null, name: null, phone: null }; // 重置学生信息
  rowDialog.value = true;
};

/*=============================CRUD=======================*/
/*修改学生信息*/
const updateStudentInfo = async () => {
  try {
    const response = await axios.post(
      "https://test.opensun.asia/api/class/update_student_info",
      rowDetails.value,
    );
    if (response.status === 200) {
      await getInfos({
        pagination: pagination.value,
        filter: undefined,
      });
      rowDialog.value = false;
      $q.notify({
        message: "更新信息成功",
        position: "top",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      });
    } else {
      $q.notify({
        message: "更新信息失败",
        position: "top",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      });
    }
  } catch (error) {
    $q.notify({
      message: "更新表失败",
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
  }
};

/*增加学生*/
const addStudent = async () => {
  try {
    const response = await axios.post(
      "https://test.opensun.asia/api/class/add_student",
      rowDetails.value,
    );
    if (response.status === 200) {
      await getInfos({
        pagination: pagination.value,
        filter: undefined,
      });
      rowDialog.value = false;
      $q.notify({
        message: "添加成功",
        position: "top",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      });
    }
  } catch (error) {
    $q.notify({
      message: "添加失败",
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
  }
};
/*删除学生*/
const deleteStudent = async () => {
  try {
    const response = await axios.post(
      "https://test.opensun.asia/api/class/delete_student",
      selected.value.map((student) => student.id),
    );
    if (response.status === 200) {
      selected.value = [];
      await getInfos({
        pagination: pagination.value,
        filter: undefined,
      });
      rowDialog.value = false;
      $q.notify({
        message: "删除成功",
        position: "top",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      });
    }
  } catch (error) {
    $q.notify({
      message: "删除失败",
      position: "top",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    });
  }
};
/*查询学生详细信息*/
</script>

<style scoped>
/* Add any desired styles here */
</style>
