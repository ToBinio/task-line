<script setup lang="ts">
import Todos from "~/components/todo/Todos.vue";
import { useInitdata } from "~/composables/useInitData";
import NewTodoSheet from "~/components/edit/NewTodoSheet.vue";
import VerticalNav from "~/components/nav/VerticalNav.vue";
import HorizontalNav from "~/components/nav/HorizontalNav.vue";
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui";

import { useDevice } from "#imports";

const isSettingsSheetOpen = ref(false);
const isFilterSheetOpen = ref(false);
const isNewSheetOpen = ref(false);

await useInitdata();

//todo - improve splitterWidth - https://github.com/unovue/reka-ui/issues/836
const { isMobile } = useDevice();

const windowSize = useWindowSize();
const splitMinSize = computed(() => {
  const SideBarWidth = 200;
  return (SideBarWidth / windowSize.width.value) * 100;
});
</script>
<template>
  <div>
    <FilterSheet v-model:is-open="isFilterSheetOpen" />
    <SettingsSheet v-model:is-open="isSettingsSheetOpen" />
    <EditTodoSheet />
    <NewTodoSheet v-model:is-open="isNewSheetOpen" />

    <div v-if="!isMobile">
      <SplitterGroup direction="horizontal">
        <SplitterPanel :default-size="splitMinSize" :min-size="splitMinSize">
          <VerticalNav
            v-model:is-settings-sheet-open="isSettingsSheetOpen"
            v-model:is-filter-sheet-open="isFilterSheetOpen"
            v-model:is-new-sheet-open="isNewSheetOpen"
          />
        </SplitterPanel>
        <SplitterResizeHandle class="w-2" />
        <SplitterPanel :default-size="90">
          <div class="overflow-x-hidden">
            <TimeHeader />
            <Todos />
          </div>
        </SplitterPanel>
      </SplitterGroup>
    </div>

    <div v-if="isMobile">
      <TimeHeader />
      <Todos />
      <HorizontalNav
        v-model:is-settings-sheet-open="isSettingsSheetOpen"
        v-model:is-filter-sheet-open="isFilterSheetOpen"
        v-model:is-new-sheet-open="isNewSheetOpen"
      />
    </div>
  </div>
</template>
