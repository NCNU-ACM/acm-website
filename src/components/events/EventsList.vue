<template>
  <div class="list-section">
    <div v-if="events.length === 0" class="empty">目前沒有活動資料</div>

    <div v-else class="list-grid-wrapper">
      <div class="list-grid">
        <div
          v-for="event in paginatedEvents"
          :key="event.id"
          class="event-row"
          @click="openModal(event)"
          @mouseenter="startMarquee(event.id)"
          @mouseleave="stopMarquee(event.id)"
        >
          <div class="row-date">
            <span class="date-day">{{ formatDay(event.date) }}</span>
            <span class="date-month">{{ formatMonth(event.date) }}</span>
          </div>
          <div class="row-content">
            <h3 class="row-title">{{ event.title }}</h3>
            <div class="marquee-wrapper" :ref="(el) => setWrapperRef(el, event.id)">
              <p
                class="row-description"
                :ref="(el) => setTextRef(el, event.id)"
                :style="{
                  transform: `translateX(${marqueeOffsets[event.id] || 0}px)`,
                  transitionDuration: `${marqueeDurations[event.id] || 0.5}s`
                }"
              >
                {{ event.description }}
              </p>
            </div>
          </div>
          <div class="row-group">{{ groupName(event.group) }}</div>
          <div class="row-arrow">›</div>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button class="page-btn" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">‹</button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button class="page-btn" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">›</button>
    </div>

    <EventModal :event="selectedEvent" :groups="groups" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import EventModal from '../common/EventModal.vue';

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

const props = defineProps<{
  events: EventItem[];
  groups: { slug: string; name: string }[];
}>();

const selectedEvent = ref<EventItem | null>(null);
const currentPage = ref(1);
const pageSize = 10;

const totalPages = computed(() => Math.ceil(props.events.length / pageSize));

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return props.events.slice(start, start + pageSize);
});

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const groupName = (slug: string) => {
  const g = props.groups.find(g => g.slug === slug);
  return g ? g.name : slug;
};

const formatDay = (dateStr: string) => {
  const parts = dateStr.split('/');
  return parts[2];
};

const formatMonth = (dateStr: string) => {
  const parts = dateStr.split('/');
  return `${parts[1]}月`;
};

const openModal = (event: EventItem) => {
  selectedEvent.value = event;
};

const closeModal = () => {
  selectedEvent.value = null;
};

const wrapperRefs: Record<string, HTMLElement> = {};
const textRefs: Record<string, HTMLElement> = {};
const marqueeOffsets = reactive<Record<string, number>>({});
const marqueeDurations = reactive<Record<string, number>>({});

const setWrapperRef = (el: any, id: string) => {
  if (el) wrapperRefs[id] = el;
};

const setTextRef = (el: any, id: string) => {
  if (el) textRefs[id] = el;
};

const startMarquee = (id: string) => {
  const wrapper = wrapperRefs[id];
  const text = textRefs[id];
  if (!wrapper || !text) return;

  const overflow = text.scrollWidth - wrapper.clientWidth;
  if (overflow > 0) {
    const speed = 40;
    marqueeDurations[id] = overflow / speed;
    marqueeOffsets[id] = -overflow;
  }
};

const stopMarquee = (id: string) => {
  marqueeDurations[id] = 0.5;
  marqueeOffsets[id] = 0;
};
</script>

<style scoped>
.list-section {
  padding: 0 1rem;
  max-width: 1100px;
  margin: 0 auto;
}

.empty {
  text-align: center;
  color: rgba(226, 232, 240, 0.6);
  padding: 4rem 0;
}

.list-grid-wrapper {
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  background: rgba(10, 14, 26, 0.3);
  backdrop-filter: blur(4px);
}

.list-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 640px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.list-grid::-webkit-scrollbar {
  width: 6px;
}

.list-grid::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.list-grid::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.4);
  border-radius: 3px;
}

.list-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.6);
}

.event-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.5);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  cursor: pointer;
  color: white;
}

.event-row:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(10, 14, 26, 0.7);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
}

.row-date {
  flex-shrink: 0;
  width: 70px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.date-day {
  font-size: 1.5rem;
  font-weight: bold;
  color: #60a5fa;
  line-height: 1;
}

.date-month {
  font-size: 0.75rem;
  color: rgba(226, 232, 240, 0.6);
  margin-top: 0.25rem;
}

.row-content {
  flex: 1;
  min-width: 0;
}

.row-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.375rem;
}

.marquee-wrapper {
  overflow: hidden;
  white-space: nowrap;
}

.row-description {
  display: inline-block;
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.6);
  white-space: nowrap;
  transition-property: transform;
  transition-timing-function: linear;
}

.row-group {
  flex-shrink: 0;
  font-size: 0.9rem;
  color: rgba(96, 165, 250, 0.9);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.1);
}

.row-arrow {
  flex-shrink: 0;
  font-size: 1.5rem;
  color: rgba(226, 232, 240, 0.4);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-btn {
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.page-btn.active {
  background: rgba(59, 130, 246, 0.3);
  border-color: #3b82f6;
  color: #60a5fa;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>