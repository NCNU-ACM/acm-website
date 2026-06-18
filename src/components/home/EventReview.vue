<template>
  <div ref="containerRef" class="review-container h-full relative overflow-hidden flex flex-col items-center justify-center px-16">
    <Background />

    <div class="relative z-10 w-full">
      <div class="text-center mb-12" data-reveal>
        <p class="text-sm tracking-widest mb-2 section-label">EVENT REVIEW</p>
        <h2 class="section-title text-5xl md:text-6xl font-bold">活動回顧</h2>
        <p class="mt-3 text-lg section-subtitle">我們一起走過的足跡</p>
      </div>

      <div v-if="events.length === 0" class="text-center" style="color: var(--color-text-muted);" data-reveal data-reveal-delay="200">
        目前沒有歷史活動
      </div>

      <div v-else class="timeline-wrapper" data-reveal data-reveal-delay="200">
        <div class="timeline-line"></div>
        <div class="timeline-track">
          <div
            v-for="(event, i) in reversedEvents"
            :key="event.id"
            class="timeline-item"
            :class="{ 'item-top': i % 2 === 0, 'item-bottom': i % 2 !== 0 }"
            data-reveal
            :data-reveal-delay="300 + i * 100"
            @click="openModal(event)"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <p class="timeline-date">{{ event.date }}</p>
              <h3 class="font-bold">{{ event.title }}</h3>
            </div>
          </div>
        </div>
      </div>
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

        <p v-if="selectedEvent.content" class="modal-description">{{ selectedEvent.content }}</p>

        <div v-if="selectedEvent.links && selectedEvent.links.length" class="modal-links">
          <a
            v-for="link in selectedEvent.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            class="modal-link-item"
          >
            🔗 {{ link.label }}
          </a>
        </div>

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
import Background from '../common/Background.vue';
import { useScrollReveal } from '../useScrollReveal';

interface EventItem {
  id: string;
  title: string;
  date: string;
  type: string;
  group: string;
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

const reversedEvents = computed(() => [...props.events].reverse());
const { containerRef } = useScrollReveal();
const selectedEvent = ref<EventItem | null>(null);

const groupName = (slug: string) => {
  const g = props.groups.find(g => g.slug === slug);
  return g ? g.name : slug;
};

const openModal = (event: EventItem) => {
  selectedEvent.value = event;
};

const closeModal = () => {
  selectedEvent.value = null;
};
</script>

<style scoped>
.review-container {
  height: 100%;
  background: linear-gradient(to top, #030b23 0%, #063238 100%);
}

[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  position: relative;
  display: inline-block;
  padding-bottom: 0.75rem;
  background: linear-gradient(to top right, #3b82f6 0%, #34d399 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter:
    drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))
    drop-shadow(0 0 25px rgba(52, 211, 153, 0.4))
    drop-shadow(2px 4px 0px rgba(0, 0, 0, 0.6));
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent);
  filter: drop-shadow(0 0 6px #3b82f6);
}

.section-label {
  color: rgba(96, 165, 250, 0.8);
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
}

.section-subtitle {
  color: rgba(226, 232, 240, 0.85);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.timeline-wrapper {
  position: relative;
  overflow-x: auto;
  padding: 4rem 1rem;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.4), transparent);
}

.timeline-track {
  display: flex;
  gap: 4rem;
  position: relative;
  min-width: max-content;
  padding: 0 2rem;
}

.timeline-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  flex-shrink: 0;
  cursor: pointer;
  color: inherit;
  height: 200px;
}

.timeline-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
  transition: all 0.3s ease;
  z-index: 1;
}

.timeline-item:hover .timeline-dot {
  transform: translate(-50%, -50%) scale(1.4);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.9);
}

.timeline-card {
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.01);
  backdrop-filter: blur(8px);
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.item-top .timeline-card {
  top: 0;
}

.item-bottom .timeline-card {
  bottom: 0;
}

.timeline-item:hover .timeline-card {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(10, 14, 26, 0.3);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.15);
}

.timeline-date {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
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
  max-width: 640px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.2);
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.4) rgba(255, 255, 255, 0.05);
}

.modal::-webkit-scrollbar {
  width: 6px;
}

.modal::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.modal::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.4);
  border-radius: 3px;
}

.modal::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.6);
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
  white-space: pre-line;
}

.modal-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.modal-link-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.08);
  color: #60a5fa;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.modal-link-item:hover {
  background: rgba(59, 130, 246, 0.18);
  border-color: rgba(59, 130, 246, 0.5);
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