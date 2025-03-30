<script setup lang="ts">
let tags = defineModel<UUID[]>("tags");

const tagStore = useTagStore();

function onPress(tag: UUID) {
    if (tags.value!.includes(tag)) {
        tags.value = tags.value!.filter((id) => id !== tag);
    } else {
        tags.value!.push(tag);
    }
}

function isSelected(tag: UUID) {
    return tags.value!.includes(tag);
}
</script>

<template>
    <div class="h-10 flex flex-col justify-center overflow-scroll mr-12">
        <div class="flex gap-2">
            <button
                class="rounded border-1 border-stone-700 px-1"
                v-for="tag in tagStore.data"
                :style="{ color: tag.color }"
                :class="{ 'bg-stone-700': isSelected(tag.uuid) }"
                @click="onPress(tag.uuid)"
            >
                {{ tag.name }}
            </button>
        </div>
    </div>
</template>
