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
        >
          <div class="row-date">
            <span class="date-day">{{ formatDay(event.date) }}</span>
            <span class="date-month">{{ formatMonth(event.date) }}</span>
          </div>
          <div class="row-content">
            <h3 class="row-title">{{ event.title }}</h3>
            <p class="row-description">{{ event.description }}</p>
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

    <div v-if="selectedEvent" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <button class="modal-close" @click="closeModal">×</button>
        <div class="modal-tags">
          <span class="tag">{{ selectedEvent.type }}</span>
          <span class="tag tag-group">{{ groupName(selectedEvent.group) }}</span>
        </div>
        <h2 class="modal-title">{{ selectedEvent.title }}</h2>
        <div class="modal-meta">
          <span>📅 {{ selectedEvent.date }}</span>
          <span v-if="selectedEvent.location">📍 {{ selectedEvent.location }}</span>
        </div>
        <p class="modal-description">{{ selectedEvent.description }}</p>
        <a
          v-if="selectedEvent.registration"
          :href="selectedEvent.registration"
          target="_blank"
          class="modal-register-btn"
        >
          立即報名 →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface EventItem {
  id: string;
  semester: string;
  title: string;
  date: string;
  group: string;
  type: string;
  location?: string;
  description: string;
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

.list-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 480px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.list-grid-wrapper {
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  background: rgba(10, 14, 26, 0.3);
  backdrop-filter: blur(4px);
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

.row-description {
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 2rem;
}

.modal {
  position: relative;
  background: #0f1729;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.2);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  color: rgba(226, 232, 240, 0.6);
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-close:hover {
  color: white;
}

.modal-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
}

.modal-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.95rem;
  color: rgba(226, 232, 240, 0.6);
  margin-bottom: 1.5rem;
}

.modal-description {
  color: rgba(226, 232, 240, 0.85);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.modal-register-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  text-decoration: none;
  font-weight: 500;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
</style>