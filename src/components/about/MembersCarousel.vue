<template>
  <div class="carousel-section">
    <div class="filter">
      <label>選擇學期：</label>
      <select v-model="currentSemester" @change="resetIndex">
        <option v-for="sem in semesters" :key="sem" :value="sem">{{ sem }}</option>
      </select>
    </div>

    <div v-if="filteredMembers.length === 0" class="empty">
      這個學期目前沒有幹部資料
    </div>

    <div v-else class="stage">
      <button class="nav-btn left" @click="prev">‹</button>

      <div class="cards-track">
        <div
          v-for="(member, index) in filteredMembers"
          :key="member.id"
          class="member-card"
          :class="cardPositionClass(index)"
          :style="cardStyle(index)"
          @click="handleCardClick(index)"
        >
          <div class="card-left">
            <img v-if="member.avatar" :src="member.avatar" class="avatar-image" :alt="member.name" />
            <div v-else class="avatar-placeholder">{{ member.name.charAt(0) }}</div>
            <h3 class="member-name">{{ member.name }}</h3>
          </div>
          <div class="card-right">
            <p class="member-role">
              <span v-if="member.group">{{ groupLabel(member.group) }} </span>{{ member.role }}
            </p>
            <p v-if="member.bio" class="member-bio">{{ member.bio }}</p>
            <div v-if="member.contact && member.contact.length" class="contact-list">
              <a
                v-for="c in member.contact"
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
      </div>

      <button class="nav-btn right" @click="next">›</button>
    </div>

    <div v-if="filteredMembers.length > 0" class="counter">
      {{ currentIndex + 1 }} / {{ filteredMembers.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Member {
  id: string;
  semester: string;
  name: string;
  group?: string;
  role: string;
  bio?: string;
  avatar?: string;
  contact: { label: string; url: string }[];
}

const props = defineProps<{
  members: Member[];
  semesters: string[];
  latestSemester: string;
  groups: { slug: string; name: string }[];
}>();

const groupLabel = (slug: string) => {
  const g = props.groups.find(g => g.slug === slug);
  return g ? g.name : slug;
};

const currentSemester = ref(props.latestSemester);
const currentIndex = ref(0);

const filteredMembers = computed(() =>
  props.members.filter(m => m.semester === currentSemester.value)
);

const resetIndex = () => {
  currentIndex.value = 0;
};

const prev = () => {
  const len = filteredMembers.value.length;
  currentIndex.value = (currentIndex.value - 1 + len) % len;
};

const next = () => {
  const len = filteredMembers.value.length;
  currentIndex.value = (currentIndex.value + 1) % len;
};

const getOffset = (index: number) => {
  const len = filteredMembers.value.length;
  let offset = index - currentIndex.value;
  if (offset > len / 2) offset -= len;
  if (offset < -len / 2) offset += len;
  return offset;
};

const cardPositionClass = (index: number) => {
  const offset = getOffset(index);
  if (offset === 0) return 'is-active';
  if (offset === -1) return 'is-prev';
  if (offset === 1) return 'is-next';
  if (offset === -2) return 'is-prev-2';
  if (offset === 2) return 'is-next-2';
  return 'is-hidden';
};
const cardStyle = (index: number) => {
  const offset = getOffset(index);
  const absOffset = Math.abs(offset);
  const direction = offset === 0 ? 0 : offset / absOffset;

  const baseGap = 220;
  const shrinkFactor = 0.7;
  
  let translateDistance = 0;
  let gap = baseGap;
  for (let i = 0; i < absOffset; i++) {
    translateDistance += gap;
    gap *= shrinkFactor * shrinkFactor;
  }
  const translateX = direction * translateDistance;
  let scale = 1;
  let opacity = 1;
  const zIndex = 10 - Math.abs(offset);

  if (absOffset === 0) {
    scale = 1;
    opacity = 1;
  } else {
    const scaleShrink = 0.1;
    const opacityShrink = 0.25;
    scale = Math.max(0.4, 1 - absOffset * scaleShrink);
    opacity = Math.max(0, 1 - absOffset * opacityShrink);
  }

  return {
    transform: `translateX(${translateX}px) scale(${scale})`,
    opacity,
    zIndex,
  };
};

const handleCardClick = (index: number) => {
  const offset = getOffset(index);
  if (offset < 0) {
    for (let i = 0; i < Math.abs(offset); i++) prev();
  } else if (offset > 0) {
    for (let i = 0; i < offset; i++) next();
  }
};
</script>

<style scoped>
.carousel-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

.filter {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter label {
  color: rgba(226, 232, 240, 0.7);
  font-size: 0.95rem;
}

.filter select {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(10, 14, 26, 0.6);
  color: white;
  font-size: 0.95rem;
}

.empty {
  color: rgba(226, 232, 240, 0.6);
  padding: 4rem 0;
}

.stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 900px;
}

.cards-track {
  position: relative;
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-card {
  position: absolute;
  width: 480px;
  min-height: 280px;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease, opacity 0.5s ease;
  cursor: pointer;
}

.member-card.is-active {
  cursor: default;
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
}

.member-card.is-hidden {
  pointer-events: none;
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

.avatar-placeholder {
  width: 85%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

.avatar-image {
  width: 85%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

.member-name {
  font-size: 1.8rem;
  padding-top: 1rem;
  font-weight: bold;
  color: white;
}

.member-role {
  color: rgba(96, 165, 250, 0.9);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.member-bio {
  color: rgba(226, 232, 240, 0.75);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.contact-link {
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: rgba(96, 165, 250, 0.9);
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.contact-link:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

.nav-btn.left {
  left: -10rem;
}

.nav-btn.right {
  right: -10rem;
}

.nav-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.counter {
  margin-top: 1.5rem;
  color: rgba(226, 232, 240, 0.5);
  font-size: 0.9rem;
}
</style>