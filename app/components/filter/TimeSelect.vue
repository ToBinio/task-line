<script setup lang="ts">
import { RadioGroupRoot, RadioGroupItem } from "reka-ui";

const time = defineModel<"all" | "today" | "week">("time", { required: true });
</script>

<template>
  <RadioGroupRoot v-model="time" class="flex">
    <RadioGroupItem
      class="data-[active]:bg-secondary-hover border-secondary flex-1 cursor-pointer rounded-l border-1 px-1"
      value="all"
    >
      All
    </RadioGroupItem>
    <RadioGroupItem
      class="data-[active]:bg-secondary-hover border-secondary flex-1 cursor-pointer border-y-1 px-1"
      value="today"
    >
      Today
    </RadioGroupItem>
    <RadioGroupItem
      class="data-[active]:bg-secondary-hover border-secondary flex-1 cursor-pointer rounded-r border-1 px-1"
      value="week"
    >
      Week
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
