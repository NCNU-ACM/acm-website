<template>
  <div class="flex flex-col items-center justify-center h-full px-8">
    <h2 class="text-4xl font-bold mb-12">我們的小組</h2>
    <div class="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <a v-for="group in groups" :key="group.slug"
         :href="`/groups/${group.slug}`"
         class="p-6 rounded-lg transition-colors cursor-pointer"
         style="background-color: var(--color-surface); border: 1px solid var(--color-border);">
        <h3 class="text-xl font-bold mb-2" :style="{ color: group.color }">{{ group.name }}</h3>
        <p style="color: var(--color-text-muted);">{{ group.tagline }}</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  groups: {
    name: string;
    slug: string;
    tagline: string;
    color: string;
  }[];
}>();
</script>