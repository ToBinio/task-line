<script setup lang="ts">
import { RadioGroupRoot, RadioGroupItem } from "reka-ui";

const time = defineModel<"all" | "today" | "week">("time", { required: true });
</script>

<template>
  <RadioGroupRoot v-model="time" class="flex">
    <div>
      <RadioGroupItem
        class="data-[active]:bg-secondary-hover border-secondary cursor-pointer rounded-l border-1 px-1"
        value="all"
      >
        All
      </RadioGroupItem>
    </div>
    <div>
      <RadioGroupItem
        class="data-[active]:bg-secondary-hover border-secondary cursor-pointer border-y-1 px-1"
        value="today"
      >
        Today
      </RadioGroupItem>
    </div>
    <div>
      <RadioGroupItem
        class="data-[active]:bg-secondary-hover border-secondary cursor-pointer rounded-r border-1 px-1"
        value="week"
      >
        This Week
      </RadioGroupItem>
    </div>
  </RadioGroupRoot>
</template>
