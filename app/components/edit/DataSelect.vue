<script setup lang="ts">
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "reka-ui";
import type { Timeframe, UUID } from "~~/shared/types";
import TagSelect from "../utils/input/TagSelect.vue";
import DateSelect from "./DateSelect.vue";
import CategorySelect from "../utils/input/CategorySelect.vue";

const { t } = useI18n();

const timeframe = defineModel<Timeframe | undefined>("timeframe", {
  required: true,
});
const tags = defineModel<UUID[]>("tags", { required: true });
const category = defineModel<UUID | undefined>("category", { required: true });
const note = defineModel<string>("note", { required: true });
</script>

<template>
  <TabsRoot class="flex flex-1 flex-col px-2" default-value="notes">
    <TabsList
      class="border-secondary relative flex justify-around border-b py-1"
    >
      <TabsIndicator
        class="bg-primary absolute bottom-0 left-0 h-[1px] w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) translate-y-[1px] rounded-full duration-300"
      >
        <div />
      </TabsIndicator>
      <TabsTrigger
        class="data-[state=active]:text-primary w-24 cursor-pointer transition"
        value="notes"
      >
        {{ t("note") }}
      </TabsTrigger>
      <TabsTrigger
        class="data-[state=active]:text-primary w-24 cursor-pointer transition"
        value="labels"
      >
        {{ t("labels") }}
      </TabsTrigger>
      <TabsTrigger
        class="data-[state=active]:text-primary w-24 cursor-pointer transition"
        value="date"
      >
        {{ t("date") }}
      </TabsTrigger>
    </TabsList>

    <TabsContent value="notes" class="flex flex-1 flex-col py-2">
      <textarea
        v-model="note"
        class="border-secondary w-full flex-1 resize-none rounded border-1 pl-1"
        :placeholder="t('note')"
      />
    </TabsContent>

    <TabsContent value="labels" class="pt-2">
      <h2 class="text-muted-text text-lg">{{ t("tags") }}</h2>
      <TagSelect v-model:tags="tags" :show-all="true" />
      <h2 class="text-muted-text text-lg">{{ t("categories") }}</h2>
      <CategorySelect v-model:category="category" />
    </TabsContent>

    <TabsContent class="flex flex-1 flex-col justify-center" value="date">
      <DateSelect v-model:timeframe="timeframe" />
    </TabsContent>
  </TabsRoot>
</template>
