<template>
  <div class="flex flex-col items-center justify-center h-full px-8">
    <h2 class="text-4xl font-bold mb-12">近期活動</h2>
    <div v-if="events.length === 0" style="color: var(--color-text-muted);">
      目前沒有活動
    </div>
    <div v-else class="grid gap-4 w-full max-w-2xl">
      <a v-for="event in events" :key="event.id"
         :href="`/events/${event.id}`"
         class="p-4 rounded-lg flex items-center justify-between"
         style="background-color: var(--color-surface); border: 1px solid var(--color-border);">
        <div>
          <p class="font-bold">{{ event.title }}</p>
          <p class="text-sm" style="color: var(--color-text-muted);">{{ event.date }}</p>
        </div>
        <span class="text-sm px-2 py-1 rounded" style="background-color: var(--color-accent); color: white;">
          {{ event.type }}
        </span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  events: { id: string; title: string; date: string; type: string }[];
}>();
</script>