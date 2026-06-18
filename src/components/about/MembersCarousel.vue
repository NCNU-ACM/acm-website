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

    <div v-else class="card-wrapper">
      <button class="nav-btn left" @click="prev">‹</button>

      <div class="member-card">
        <div class="card-left">
          <div class="avatar-placeholder">{{ currentMember.name.charAt(0) }}</div>
          <h3 class="member-name">{{ currentMember.name }}</h3>
        </div>
        <div class="card-right">
          <p class="member-role">
            <span v-if="currentMember.group">{{ groupLabel(currentMember.group) }} </span>{{ currentMember.role }}
          </p>
          <p v-if="currentMember.bio" class="member-bio">{{ currentMember.bio }}</p>
          <div v-if="currentMember.contact && currentMember.contact.length" class="contact-list">
            <a
              v-for="c in currentMember.contact"
              :key="c.label"
              :href="c.url"
              target="_blank"
              class="contact-link"
            >
              {{ c.label }}
            </a>
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
  contact: { label: string; url: string }[];
}

const props = defineProps<{
  members: Member[];
  semesters: string[];
  latestSemester: string;
}>();

const currentSemester = ref(props.latestSemester);
const currentIndex = ref(0);

const filteredMembers = computed(() =>
  props.members.filter(m => m.semester === currentSemester.value)
);

const currentMember = computed(() => filteredMembers.value[currentIndex.value]);

const resetIndex = () => {
  currentIndex.value = 0;
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = filteredMembers.value.length - 1;
  }
};

const next = () => {
  if (currentIndex.value < filteredMembers.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const groupLabel = (slug: string) => {
  const map: Record<string, string> = {
    system: '系統組',
    international: '國際組',
    game: '遊戲組',
    case: '接案組',
  };
  return map[slug] || slug;
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

.card-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.member-card {
  width: 480px;
  min-height: 280px;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  gap: 2rem;
  transition: all 0.3s ease;
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

.member-name {
  font-size: 1.8rem;
  padding-top: 1rem;
  font-weight: bold;
  color: white;
}

.member-role {
  color: rgba(96, 165, 250, 0.9);
  font-size: 1rem;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.counter {
  margin-top: 1.5rem;
  color: rgba(226, 232, 240, 0.5);
  font-size: 0.9rem;
}
</style>