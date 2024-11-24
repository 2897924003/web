<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="用户表"
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="content-center"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="img" :props="props"
            ><q-avatar size="32px" :src="props.row.img"
          /></q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="gender" :props="props">{{
            props.row.gender === "0" ? "男" : "女"
          }}</q-td>
          <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="create" :props="props">{{ props.row.create }}</q-td>
          <q-td key="update" :props="props">{{ props.row.update }}</q-td>
          <q-td key="status" :props="props">{{
            props.row.status === "1" ? "正常" : "禁用"
          }}</q-td>
          <q-td auto-width>
            <div class="row justify-around">
              <q-btn label="编辑" color="primary" flat />
              <q-btn label="删除" color="negative" flat />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
const columns = [
  { name: "img", label: "头像", field: "img", align: "center" },
  { name: "name", label: "用户名", field: "name", align: "center" },
  { name: "gender", label: "性别", field: "gender", align: "center" },
  { name: "phone", label: "手机号", field: "phone", align: "center" },
  { name: "email", label: "邮箱号", field: "email", align: "center" },
  { name: "create", label: "创建时间", field: "create", align: "center" },
  { name: "update", label: "修改时间", field: "update", align: "center" },
  { name: "status", label: "账号状态", field: "status", align: "center" },
];

const rows = [
  {
    img: "ha.jpg",
    name: "黄明",
    gender: "0",
    phone: "18152598793",
    email: "2897924003@qq.com",
    create: "12/1/2024",
    update: "12/1/2024",
    status: "1",
  },
];
</script>

<style scoped></style>
