<script setup lang="ts">
import Sheet from "./utils/Sheet.vue";

let isOpen = defineModel<boolean>("isOpen", { required: true });

function close() {
    isOpen.value = false;
}
</script>

<template>
    <Sheet :isOpen="isOpen" title="Filter Sheet" @close="close">
        <div class="text-lg">Filters</div>
    </Sheet>
</template>
