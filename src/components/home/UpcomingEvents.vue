<template>
  <div ref="containerRef" class="events-container h-full relative overflow-hidden flex flex-col items-center justify-center px-32">
    <Background />

    <div class="relative z-10 w-full">
      <div class="text-center mb-10" data-reveal>
        <p class="text-sm tracking-widest mb-2 section-label">UPCOMING EVENTS</p>
        <h2 class="section-title text-5xl md:text-6xl font-bold">近期活動</h2>
        <p class="mt-3 text-lg section-subtitle">掌握最新活動資訊</p>
      </div>

      <div class="carousel-wrapper" data-reveal data-reveal-delay="200">
        <button v-if="events.length > visibleCount" class="carousel-btn left" @click="prev" :disabled="currentSlide === 0">‹</button>

        <div
          class="carousel-track"
          ref="track"
          :style="{ justifyContent: events.length <= visibleCount ? 'center' : 'flex-start' }"
        >
          <div
            v-if="events.length === 0"
            class="event-card empty-card"
          >
            <p style="color: var(--color-text-muted);">目前沒有近期活動</p>
          </div>
          <div
            v-for="(event, index) in events"
            :key="event.id"
            class="event-card"
            data-reveal
            :data-reveal-delay="300 + index * 100"
            @click="openModal(event)"
          >
            <div class="event-card-inner">
              <h3 class="text-xl font-bold mb-3">{{ event.title }}</h3>
              <p class="text-sm mb-4" style="color: var(--color-text-muted);">{{ event.description }}</p>
              <div class="mt-auto">
                <div class="flex items-center gap-2 mb-3">
                  <span class="tag">{{ event.type }}</span>
                  <span class="tag tag-group">{{ groupName(event.group) }}</span>
                </div>
                <div class="event-meta">
                  <span>📅 {{ event.date }}</span>
                  <span v-if="event.location">📍 {{ event.location }}</span>
                </div>
              </div>
            </div>
            <div class="card-border-bottom"></div>
          </div>
        </div>

        <button v-if="events.length > visibleCount" class="carousel-btn right" @click="next" :disabled="currentSlide >= events.length - visibleCount">›</button>
      </div>

      <div v-if="events.length > visibleCount" class="dots" data-reveal data-reveal-delay="400">
        <span
          v-for="(_, i) in events"
          :key="i"
          class="dot"
          :class="{ active: i === currentSlide }"
          @click="goTo(i)"
        ></span>
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
import { ref } from 'vue';
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

const { containerRef } = useScrollReveal();

const track = ref<HTMLElement | null>(null);
const currentSlide = ref(0);
const visibleCount = 3;
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

const cardWidth = () => {
  if (!track.value) return 0;
  const card = track.value.querySelector('.event-card') as HTMLElement;
  return card ? card.offsetWidth + 24 : 0;
};

const goTo = (index: number) => {
  currentSlide.value = index;
  if (track.value) {
    track.value.scrollTo({ left: index * cardWidth(), behavior: 'smooth' });
  }
};

const prev = () => goTo(Math.max(0, currentSlide.value - 1));
const next = () => goTo(Math.min(props.events.length - 1, currentSlide.value + 1));
</script>

<style scoped>
.events-container {
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

.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: visible;
}

.carousel-track {
  display: flex;
  gap: 1.5rem;
  overflow: visible;
  flex: 1;
  scroll-behavior: smooth;
}

.event-card {
  flex: 0 0 calc(33.333% - 1rem);
  min-height: 240px;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.01);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease, opacity 0.6s ease, transform 0.6s ease;
  overflow: hidden;
  display: block;
  color: inherit;
  cursor: pointer;
}

.event-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(10, 14, 26, 0.3);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
  transform: translateY(-4px);
}

.event-card-inner {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.tag-group {
  background: rgba(6, 182, 212, 0.15);
  color: #22d3ee;
  border-color: rgba(6, 182, 212, 0.3);
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.empty-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 100%;
  min-height: 120px;
}

.card-border-bottom {
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.event-card:hover .card-border-bottom {
  opacity: 1;
}

.carousel-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: rgba(59, 130, 246, 0.9);
  transform: scale(1.3);
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