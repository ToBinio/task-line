<script setup lang="ts">
import Sheet from "../utils/Sheet.vue";

let isOpen = defineModel<boolean>("isOpen", { required: true });

const tagStore = useTagStore();

function close() {
    isOpen.value = false;
}
</script>

<template>
    <Sheet :isOpen="isOpen" title="Settings Sheet" @close="close">
        <div class="p-1 pt-0">
            <h2 class="text-lg text-stone-400">Tags</h2>
            <div class="flex pt-1 pb-2 gap-1 overflow-scroll">
                <SettingsAddTag />
                <SettingsTag v-for="tag in tagStore.data" :tag="tag" />
            </div>
        </div>
    </Sheet>
</template>
