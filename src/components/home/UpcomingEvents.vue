<template>
  <div class="events-container h-full relative overflow-hidden flex flex-col items-center justify-center px-32">
    <div class="hex-grid"></div>

    <div class="relative z-10 w-full">
      <div class="text-center mb-10">
        <p class="text-sm tracking-widest mb-2" style="color: rgba(59, 130, 246, 0.5);">UPCOMING EVENTS</p>
        <h2 class="section-title text-5xl md:text-6xl font-bold">近期活動</h2>
        <p class="mt-3 text-lg" style="color: var(--color-text-muted);">掌握最新活動資訊</p>
      </div>

      <div class="carousel-wrapper">
        <button class="carousel-btn left" @click="prev" :disabled="currentSlide === 0">‹</button>

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
          <a
            v-for="event in events"
            :key="event.id"
            :href="`/events/${event.id}`"
            class="event-card"
          >
          <div class="event-card-inner">
            <h3 class="text-3xl font-bold mb-3">{{ event.title }}</h3>
            <div class="event-meta">
              <span>日期: {{ event.date }}</span>
              <span v-if="event.location">地點: {{ event.location }}</span>
            </div>
            <p class="text-xl mb-4" style="color: var(--color-text-muted);">{{ event.description }}</p>
            <div class="mt-auto">
              <div class="flex items-center gap-2 mb-3">
                <span class="tag">{{ event.type }}</span>
                <span class="tag tag-group">{{ event.group }}</span>
              </div>
            </div>
          </div>
            <div class="card-border-bottom"></div>
          </a>
        </div>

        <button class="carousel-btn right" @click="next" :disabled="currentSlide >= events.length - visibleCount">›</button>
      </div>

      <div class="dots">
        <span
          v-for="(_, i) in events"
          :key="i"
          class="dot"
          :class="{ active: i === currentSlide }"
          @click="goTo(i)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  events: {
    id: string;
    title: string;
    date: string;
    type: string;
    group: string;
    location?: string;
    description: string;
  }[];
}>();

const track = ref<HTMLElement | null>(null);
const currentSlide = ref(0);
const visibleCount = 3;

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
  background: #0a0e1a;
}

.hex-grid {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0 34L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='rgba(59,130,246,0.08)' stroke-width='1'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

.section-title {
  position: relative;
  display: inline-block;
  padding-bottom: 0.75rem;
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
  aspect-ratio: 25 / 26;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
  overflow: hidden;
  display: block;
  color: inherit;
}

.event-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(255, 255, 255, 0.06);
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
</style>