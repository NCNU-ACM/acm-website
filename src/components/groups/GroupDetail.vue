<template>
  <div class="group-detail">
    <div class="top-section">
      <div class="intro-area">
        <div class="group-color-bar" :style="{ background: group.color }"></div>
        <p class="section-label">GROUP</p>
        <h1 class="group-title" :style="{ color: group.color }">{{ group.name }}</h1>
        <p class="group-tagline">{{ group.tagline }}</p>
        <p class="group-description">{{ group.description }}</p>
      </div>

      <div class="members-area">
        <h2 class="block-title">目前幹部</h2>
        <div v-if="members.length === 0" class="empty">目前沒有幹部資料</div>
        <div v-else class="member-carousel">
          <button class="nav-btn" @click="prev">‹</button>
          <div class="member-card">
            <div class="card-left">
              <img :src="avatarUrl(currentMember)" class="member-avatar" :alt="currentMember.name" />
              <p class="member-name">{{ currentMember.name }}</p>
            </div>
            <div class="card-right">
              <p class="member-role">{{ currentMember.role }}</p>
              <p v-if="currentMember.bio" class="member-bio">{{ currentMember.bio }}</p>
              <div v-if="currentMember.contact && currentMember.contact.length" class="contact-list">
                <a
                  v-for="c in currentMember.contact"
                  :key="c.label"
                  :href="c.url"
                  target="_blank"
                  class="contact-link"
                  @click.stop
                >
                  {{ c.label }}
                </a>
              </div>
            </div>
          </div>
          <button class="nav-btn" @click="next">›</button>
        </div>
        <div class="member-counter" v-if="members.length > 1">
          {{ currentIndex + 1 }} / {{ members.length }}
        </div>
      </div>
    </div>

    <div class="section-block">
      <h2 class="block-title">小組公告</h2>
      <EventListPanel
        :events="events"
        :groups="groupsForModal"
        :showcase-items="showcaseItems"
        :page-size="5"
        max-height="360px"
        :show-group="false"
        empty-text="目前沒有相關活動"
      />
    </div>

    <div class="section-block">
      <h2 class="block-title">成果展示</h2>
      <div v-if="showcase.length === 0" class="empty">目前沒有成果展示資料</div>
      <div v-else class="showcase-grid">
        <div
          v-for="item in showcase"
          :key="item.id"
          class="showcase-card"
          @click="openShowcaseModal(item)"
        >
          <div class="showcase-cover">
            <img v-if="item.cover_image" :src="item.cover_image" class="cover-img" :alt="item.title" />
            <div v-else class="cover-placeholder">
              <span>{{ item.title.charAt(0) }}</span>
            </div>
          </div>
          <div class="showcase-info">
            <p class="showcase-date">{{ item.date }}</p>
            <h3 class="showcase-title">{{ item.title }}</h3>
            <p class="showcase-desc">{{ item.description }}</p>
            <div v-if="item.tags.length" class="showcase-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ShowcaseModal
      :showcase="selectedShowcase"
      :events="events"
      :groups="groupsForModal"
      @close="closeShowcaseModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import EventListPanel from '../common/EventListPanel.vue';
import ShowcaseModal from '../common/ShowcaseModal.vue';

interface Group {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
}

interface Member {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  contact?: { label: string; url: string }[];
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

interface ShowcaseCard {
  id: string;
  title: string;
  group: string;
  date: string;
  description: string;
  cover_image?: string;
  gallery?: string[];
  tags: string[];
  links?: { label: string; url: string }[];
  related_event?: string;
}

const props = defineProps<{
  group: Group;
  members: Member[];
  events: EventItem[];
  showcase: ShowcaseCard[];
  showcaseItems: ShowcaseItem[];
}>();

const groupsForModal = computed(() => [{ slug: props.group.slug, name: props.group.name }]);

const currentIndex = ref(0);
const currentMember = computed(() => props.members[currentIndex.value]);

const prev = () => {
  const len = props.members.length;
  currentIndex.value = (currentIndex.value - 1 + len) % len;
};

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.members.length;
};

const avatarUrl = (member: Member) => {
  if (member.avatar) return member.avatar;
  return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(member.name)}`;
};

const selectedShowcase = ref<ShowcaseCard | null>(null);

const openShowcaseModal = (item: ShowcaseCard) => {
  selectedShowcase.value = item;
};

const closeShowcaseModal = () => {
  selectedShowcase.value = null;
};
</script>

<style scoped>
.group-detail {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.top-section {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  padding-bottom: 2rem;
}

.intro-area {
  flex: 3;
  position: relative;
  padding-left: 1.5rem;
}

.group-color-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 2px;
}

.section-label {
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  color: rgba(226, 232, 240, 0.5);
}

.group-title {
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 12px currentColor);
}

.group-tagline {
  font-size: 1.1rem;
  color: rgba(226, 232, 240, 0.7);
  margin-bottom: 1.25rem;
}

.group-description {
  font-size: 1rem;
  color: rgba(226, 232, 240, 0.85);
  line-height: 1.8;
}

.members-area {
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.member-carousel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.member-card {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.5);
  backdrop-filter: blur(8px);
  min-height: 180px;
}

.card-left {
  flex-shrink: 0;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.member-avatar {
  width: 85%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.75rem;
  box-shadow: 0 0 16px rgba(59, 130, 246, 0.3);
}

.member-name {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  padding-top: 0.5rem;
}

.member-role {
  font-size: 0.9rem;
  color: rgba(96, 165, 250, 0.9);
  margin-bottom: 0.5rem;
}

.member-bio {
  font-size: 0.85rem;
  color: rgba(226, 232, 240, 0.7);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 0.75rem;
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.contact-link {
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: rgba(96, 165, 250, 0.9);
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.contact-link:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.member-counter {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: rgba(226, 232, 240, 0.5);
}

.section-block {
  margin-bottom: 4rem;
}

.block-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.empty {
  color: rgba(226, 232, 240, 0.5);
  font-size: 0.95rem;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.showcase-card {
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.5);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.showcase-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
  transform: translateY(-3px);
}

.showcase-cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.showcase-card:hover .cover-img {
  transform: scale(1.03);
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  font-size: 3rem;
  color: rgba(59, 130, 246, 0.5);
}

.showcase-info {
  padding: 1rem;
}

.showcase-date {
  font-size: 0.8rem;
  color: rgba(226, 232, 240, 0.5);
  margin-bottom: 0.375rem;
}

.showcase-title {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.showcase-desc {
  font-size: 0.85rem;
  color: rgba(226, 232, 240, 0.65);
  line-height: 1.6;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.25);
}
</style>