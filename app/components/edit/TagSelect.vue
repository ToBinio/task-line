<script setup lang="ts">
import Tag from "../utils/Tag.vue";

let tags = defineModel<UUID[]>("tags");

const tagStore = useTagStore();

function onPress(tag: UUID) {
    if (tags.value!.includes(tag)) {
        tags.value = tags.value!.filter((id) => id !== tag);
    } else {
        tags.value!.push(tag);
    }
}

function isSelected(tag: Tag): boolean {
    return tags.value!.includes(tag.uuid);
}
</script>

<template>
    <div class="flex flex-col justify-center overflow-scroll">
        <div class="flex gap-2">
            <Tag
                v-for="tag in tagStore.data"
                :tag="tag"
                :is-selected="isSelected(tag)"
                @press="onPress(tag.uuid)"
            />
        </div>
    </div>
</template>
