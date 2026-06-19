<template>
  <div class="list-section">
    <EventListPanel
      :events="events"
      :groups="groups"
      :showcase-items="showcaseItems"
      :page-size="10"
      max-height="480px"
      :show-group="true"
      empty-text="目前沒有活動資料"
    />
  </div>
</template>

<script setup lang="ts">
import EventListPanel from '../common/EventListPanel.vue';

interface EventItem {
  id: string;
  title: string;
  date: string;
  group: string;
  type: string;
  location?: string;
  description: string;
  content?: string;
  links?: { label: string; url: string }[];
  registration?: string;
}

interface ShowcaseItem {
  id: string;
  title: string;
  group: string;
  date: string;
  description: string;
  related_event?: string;
  cover_image?: string;
  gallery?: string[];
  tags?: string[];
  links?: { label: string; url: string }[];
}

defineProps<{
  events: EventItem[];
  groups: { slug: string; name: string }[];
  showcaseItems: ShowcaseItem[];
}>();
</script>

<style scoped>
.list-section {
  padding: 0 1rem;
  max-width: 1100px;
  margin: 0 auto;
}
</style>