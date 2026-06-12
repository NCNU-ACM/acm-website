<template>
  <div class="flex flex-col items-center justify-center h-full px-8">
    <h2 class="text-4xl font-bold mb-12">活動回顧</h2>
    <div v-if="events.length === 0" style="color: var(--color-text-muted);">
      目前沒有歷史活動
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
      <a v-for="event in events" :key="event.id"
         :href="`/events/${event.id}`"
         class="p-4 rounded-lg"
         style="background-color: var(--color-surface); border: 1px solid var(--color-border);">
        <p class="font-bold text-sm">{{ event.title }}</p>
        <p class="text-xs" style="color: var(--color-text-muted);">{{ event.date }}</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  events: { id: string; title: string; date: string }[];
}>();
</script>