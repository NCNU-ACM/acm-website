<template>
  <div v-if="event" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">×</button>

      <div v-if="relatedShowcase" class="view-toggle">
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'announcement' }"
          @click="viewMode = 'announcement'"
        >
          活動公告
        </button>
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'recap' }"
          @click="viewMode = 'recap'"
        >
          活動回顧
        </button>
      </div>

      <div v-if="viewMode === 'announcement'">
        <div class="modal-tags">
          <span v-if="event.isAnnouncement" class="tag announcement-tag">通知</span>
          <span v-else class="tag">{{ event.type }}</span>
          <span v-if="!event.isAnnouncement && event.group" class="tag tag-group">{{ groupName(event.group) }}</span>
        </div>
        <h2 class="modal-title">{{ event.title }}</h2>
        <div class="modal-meta">
          <span>📅 {{ event.date }}</span>
          <span v-if="event.location">📍 {{ event.location }}</span>
        </div>

        <p v-if="event.content" class="modal-description">{{ event.content }}</p>

        <div v-if="event.links && event.links.length" class="modal-links">
          <a
            v-for="link in event.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            class="modal-link-item"
          >
            🔗 {{ link.label }}
          </a>
        </div>

        <a
          v-if="event.registration"
          :href="event.registration"
          target="_blank"
          class="modal-register-btn"
        >
          立即報名 →
        </a>
      </div>

      <div v-else-if="relatedShowcase">
        <div class="modal-tags">
          <span v-if="!event.isAnnouncement" class="tag">{{ event.type }}</span>
          <span v-if="event.isAnnouncement" class="tag announcement-tag">通知</span>
          <span v-if="!event.isAnnouncement && event.group" class="tag tag-group">{{ groupName(event.group) }}</span>
        </div>
        <h2 class="modal-title">{{ relatedShowcase.title }}</h2>
        <div class="modal-meta">
          <span>📅 {{ relatedShowcase.date }}</span>
        </div>

        <img v-if="relatedShowcase.cover_image" :src="relatedShowcase.cover_image" class="cover-image" />

        <p class="modal-description">{{ relatedShowcase.description }}</p>

        <div v-if="relatedShowcase.gallery && relatedShowcase.gallery.length" class="gallery-grid">
          <img
            v-for="(img, i) in relatedShowcase.gallery"
            :key="i"
            :src="img"
            class="gallery-image"
          />
        </div>

        <div v-if="relatedShowcase.links && relatedShowcase.links.length" class="modal-links">
          <a
            v-for="link in relatedShowcase.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            class="modal-link-item"
          >
            🔗 {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';

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
  isAnnouncement?: boolean;
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

const props = defineProps<{
  event: EventItem | null;
  groups: { slug: string; name: string }[];
  showcaseItems: ShowcaseItem[];
}>();

defineEmits<{
  close: [];
}>();

const viewMode = ref<'announcement' | 'recap'>('announcement');

const relatedShowcase = computed(() => {
  if (!props.event) return null;
  return props.showcaseItems.find(s => s.related_event === props.event!.id) || null;
});

watch(() => props.event, (newEvent) => {
  viewMode.value = 'announcement';
  if (newEvent) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

const groupName = (slug: string) => {
  const g = props.groups.find(g => g.slug === slug);
  return g ? g.name : slug;
};
</script>

<style scoped>
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
  max-width: 780px;
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

.view-toggle {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-btn {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(226, 232, 240, 0.6);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}

.toggle-btn.active {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  color: #60a5fa;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.announcement-tag {
  background: rgba(251, 191, 36, 0.15);
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.3);
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

.cover-image {
  width: 100%;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  object-fit: cover;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.gallery-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5rem;
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