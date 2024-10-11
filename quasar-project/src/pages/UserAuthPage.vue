<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
// 定义表格列
const columns = [
  {
    name: "userId",
    required: true,
    label: "ID",
    field: "userId",
    align: "center",
    sortable: false,
  },

  {
    name: "username",
    required: true,
    label: "用户名",
    field: "username",
    align: "center",
    sortable: false,
  },
  {
    name: "createUser",
    required: true,
    label: "创建人",
    field: "createUser",
    align: "center",
    sortable: false,
  },
  {
    name: "updateUser",
    required: true,
    label: "修改人",
    field: "updateUser",
    align: "center",
    sortable: false,
  },
  {
    name: "createTime",
    required: true,
    label: "创建时间",
    field: "createTime",
    align: "center",
    sortable: true,
  },
  {
    name: "updateTime",
    required: true,
    label: "修改时间",
    field: "updateTime",
    align: "center",
    sortable: true,
  },
  {
    name: "authLevel",
    required: true,
    label: "权限级别",
    field: "authLevel",
    align: "center",
    sortable: true,
  },
  {
    name: "enabled",
    required: true,
    label: "账号状态",
    field: "enabled",
    align: "center",
    sortable: true,
  },
];
const rows = ref([]);
/*查询用户信息*/
onMounted(async () => {
  const response = await axios.post(
    //"http://localhost:8082/api/authentication/user_infos",
    "https://test.opensun.asia/api/authentication/user_infos",
    {},
    {
      headers: {
        Authorization: sessionStorage.getItem("jwt"),
      },
    },
  );
  rows.value = response.data.records;
});

const selected = ref([]);
const filter = ref("");
const loading = ref(false);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 2,
  rowsPerPage: 10,
  rowsNumber: 1,
});
const getSelectedString = () => {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""} selected of ${rows.value.length}`;
};
</script>

<template>
  <q-page class="row justify-center">
    <div class="q-pa-md justify-center" style="width: 100%; height: 100%">
      <q-table
        card-class="bg-green"
        color="red"
        title="用户管理"
        :rows="rows"
        :columns="columns"
        row-key="userId"
        selection="multiple"
        :selected-rows-label="getSelectedString"
        v-model:selected="selected"
        :loading="loading"
        v-model:pagination="pagination"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
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

        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="500"
            v-model="filter"
            hint="Debouncing 500ms"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<style scoped></style>
