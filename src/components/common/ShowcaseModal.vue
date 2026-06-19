<template>
  <div v-if="showcase" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">×</button>

      <div v-if="relatedEvent" class="view-toggle">
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'showcase' }"
          @click="viewMode = 'showcase'"
        >
          活動回顧
        </button>
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'announcement' }"
          @click="viewMode = 'announcement'"
        >
          活動公告
        </button>
      </div>

      <div v-if="viewMode === 'showcase'">
        <div class="modal-tags">
          <span class="tag tag-group">{{ groupName(showcase.group) }}</span>
          <span v-for="tag in showcase.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <h2 class="modal-title">{{ showcase.title }}</h2>
        <div class="modal-meta">
          <span>📅 {{ showcase.date }}</span>
        </div>

        <img v-if="showcase.cover_image" :src="showcase.cover_image" class="cover-image" :alt="showcase.title" />

        <p class="modal-description">{{ showcase.description }}</p>

        <div v-if="showcase.gallery && showcase.gallery.length" class="gallery-grid">
          <img
            v-for="(img, i) in showcase.gallery"
            :key="i"
            :src="img"
            class="gallery-image"
            @click="openLightbox(i)"
          />
        </div>

        <div v-if="showcase.links && showcase.links.length" class="modal-links">
          <a
            v-for="link in showcase.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            class="modal-link-item"
          >
            🔗 {{ link.label }}
          </a>
        </div>
      </div>

      <div v-else-if="relatedEvent">
        <div class="modal-tags">
          <span class="tag">{{ relatedEvent.type }}</span>
          <span class="tag tag-group">{{ groupName(relatedEvent.group) }}</span>
        </div>
        <h2 class="modal-title">{{ relatedEvent.title }}</h2>
        <div class="modal-meta">
          <span>📅 {{ relatedEvent.date }}</span>
          <span v-if="relatedEvent.location">📍 {{ relatedEvent.location }}</span>
        </div>

        <p v-if="relatedEvent.content" class="modal-description">{{ relatedEvent.content }}</p>

        <div v-if="relatedEvent.links && relatedEvent.links.length" class="modal-links">
          <a
            v-for="link in relatedEvent.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            class="modal-link-item"
          >
            🔗 {{ link.label }}
          </a>
        </div>

        <a
          v-if="relatedEvent.registration"
          :href="relatedEvent.registration"
          target="_blank"
          class="modal-register-btn"
        >
          立即報名 →
        </a>
      </div>
    </div>

    <div v-if="lightboxIndex !== null" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close" @click.stop="closeLightbox">×</button>
      <button class="lightbox-prev" @click.stop="lightboxPrev">‹</button>
      <img :src="showcase.gallery![lightboxIndex]" class="lightbox-img" @click.stop />
      <button class="lightbox-next" @click.stop="lightboxNext">›</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

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
  showcase: ShowcaseItem | null;
  events: EventItem[];
  groups: { slug: string; name: string }[];
}>();

defineEmits<{ close: [] }>();

const viewMode = ref<'showcase' | 'announcement'>('showcase');
const lightboxIndex = ref<number | null>(null);

const relatedEvent = computed(() => {
  if (!props.showcase?.related_event) return null;
  return props.events.find(e => e.id === props.showcase!.related_event) || null;
});

watch(() => props.showcase, () => {
  viewMode.value = 'showcase';
  lightboxIndex.value = null;
});

const groupName = (slug: string) => {
  const g = props.groups.find(g => g.slug === slug);
  return g ? g.name : slug;
};

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
};

const closeLightbox = () => {
  lightboxIndex.value = null;
};

const lightboxPrev = () => {
  if (lightboxIndex.value === null || !props.showcase?.gallery) return;
  lightboxIndex.value = (lightboxIndex.value - 1 + props.showcase.gallery.length) % props.showcase.gallery.length;
};

const lightboxNext = () => {
  if (lightboxIndex.value === null || !props.showcase?.gallery) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % props.showcase.gallery.length;
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
  max-width: 600px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.2);
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.4) rgba(255, 255, 255, 0.05);
}

.modal::-webkit-scrollbar { width: 6px; }
.modal::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 3px; }
.modal::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.4); border-radius: 3px; }
.modal::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.6); }

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

.modal-close:hover { color: white; }

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

.toggle-btn:hover { background: rgba(255, 255, 255, 0.06); }

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

.cover-image {
  width: 100%;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  object-fit: cover;
}

.modal-description {
  color: rgba(226, 232, 240, 0.85);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  white-space: pre-line;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.gallery-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.gallery-image:hover { opacity: 0.85; }

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

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 0.5rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-prev { left: 1.5rem; }
.lightbox-next { right: 1.5rem; }

.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>