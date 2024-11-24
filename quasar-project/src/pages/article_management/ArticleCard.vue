<template>
  <q-card class="col-12 col-sm-6 col-md-3 q-pa-sm">
    <q-card-section>
      <q-img :src="article.img" alt="Article image" class="q-img" />
      <div class="text-subtitle2 q-mt-xs">{{ article.title }}</div>
      <q-icon name="visibility" /> {{ article.views }}
      <q-icon name="calendar_today" /> {{ article.editDate }}
    </q-card-section>
    <q-separator dark />

    <q-card-actions>
      <q-btn
        @click="$emit('delete', article.id)"
        flat
        label="删除"
        class="bg-red"
      ></q-btn>
      <q-btn
        @click="$emit('edit', article.id)"
        flat
        label="修改"
        class="bg-yellow"
      ></q-btn>
      <q-btn
        @click="$emit('data', article.id)"
        flat
        label="数据"
        class="bg-green"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
