<script setup lang="ts">
const { t } = useI18n();
const title = defineModel<string>("title");
</script>

<template>
  <input
    v-model="title"
    :placeholder="t('title')"
    class="border-secondary rounded border-2 pl-1 text-xl"
  />
</template>
