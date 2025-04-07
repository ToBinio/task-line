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
                <SettingsAddTodo />
                <div
                    class="h-8 rounded border-1 border-stone-300 dark:border-stone-700 pl-1 flex items-center gap-0.5"
                    v-for="tag in tagStore.data"
                    :style="{ color: tag.color }"
                    :key="tag.uuid"
                >
                    <div class="text-nowrap">
                        {{ tag.name }}
                    </div>
                    <button class="h-6" @click="tagStore.deleteTag(tag.uuid)">
                        <Icon
                            name="material-symbols:delete-outline-rounded"
                            size="24"
                        />
                    </button>
                </div>
            </div>
        </div>
    </Sheet>
</template>
