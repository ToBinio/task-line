<script setup lang="ts">
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from "reka-ui";

const time = defineModel<"all" | "today" | "week">("time", { required: true });
</script>

<template>
  <RadioGroupRoot v-model="time" class="flex gap-2">
    <div class="flex items-center gap-1">
      <RadioGroupItem
        class="h-[1.125rem] w-[1.125rem] cursor-default rounded-full border bg-white shadow-sm outline-none focus:shadow-[0_0_0_2px] focus:shadow-stone-700 data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white"
        value="all"
      >
        <RadioGroupIndicator
          class="relative flex h-full w-full items-center justify-center after:block after:h-2 after:w-2 after:rounded-[50%] after:bg-white after:content-[''] dark:after:bg-stone-700"
        />
      </RadioGroupItem>
      <label> All </label>
    </div>
    <div class="flex items-center gap-1">
      <RadioGroupItem
        class="h-[1.125rem] w-[1.125rem] cursor-default rounded-full border bg-white shadow-sm outline-none focus:shadow-[0_0_0_2px] focus:shadow-stone-700 data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white"
        value="today"
      >
        <RadioGroupIndicator
          class="relative flex h-full w-full items-center justify-center after:block after:h-2 after:w-2 after:rounded-[50%] after:bg-white after:content-[''] dark:after:bg-stone-700"
        />
      </RadioGroupItem>
      <label> Today </label>
    </div>
    <div class="flex items-center gap-1">
      <RadioGroupItem
        class="h-[1.125rem] w-[1.125rem] cursor-default rounded-full border bg-white shadow-sm outline-none focus:shadow-[0_0_0_2px] focus:shadow-stone-700 data-[active=true]:border-stone-700 data-[active=true]:bg-stone-700 dark:data-[active=true]:bg-white"
        value="week"
      >
        <RadioGroupIndicator
          class="relative flex h-full w-full items-center justify-center after:block after:h-2 after:w-2 after:rounded-[50%] after:bg-white after:content-[''] dark:after:bg-stone-700"
        />
      </RadioGroupItem>
      <label> This Week </label>
    </div>
  </RadioGroupRoot>
</template>
