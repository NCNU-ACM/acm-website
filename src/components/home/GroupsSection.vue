<template>
  <div class="groups-container h-full relative overflow-hidden flex flex-col items-center justify-center px-16">
    <div class="hex-grid"></div>

    <div class="relative z-10 w-full">
      <div class="text-center mb-10">
        <p class="text-sm tracking-widest mb-2" style="color: rgba(59, 130, 246, 0.5);">OUR GROUPS</p>
        <h2 class="section-title text-5xl md:text-6xl font-bold">我們的小組</h2>
        <p class="mt-3 text-lg" style="color: var(--color-text-muted);">選擇你感興趣的方向，加入我們</p>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <a
          v-for="group in groups"
          :key="group.slug"
          :href="`/groups/${group.slug}`"
          class="group-card"
          :style="{ '--group-color': group.color }"
        >
          <div class="group-card-inner">
            <div class="group-icon-wrapper">
              <component :is="getIcon(group.slug)" :size="48" :stroke="group.color" />
            </div>
            <div class="group-info">
              <h3 class="text-2xl font-bold mb-2" :style="{ color: group.color }">{{ group.name }}</h3>
              <p style="color: var(--color-text-muted);">{{ group.description }}</p>
            </div>
          </div>
          <div class="group-border-bottom"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Server, Globe, Gamepad2, Briefcase } from 'lucide-vue-next';

defineProps<{
  groups: {
    name: string;
    slug: string;
    tagline: string;
    description: string;
    color: string;
  }[];
}>();

const iconMap: Record<string, any> = {
  system: Server,
  international: Globe,
  game: Gamepad2,
  case: Briefcase,
};

const getIcon = (slug: string) => iconMap[slug] ?? Server;
</script>

<style scoped>
.groups-container {
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

.group-card {
  display: block;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.group-card:hover {
  border-color: var(--group-color);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 30px color-mix(in srgb, var(--group-color) 20%, transparent);
  transform: translateY(-4px);
}

.group-card-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
}

.group-icon-wrapper {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.group-card:hover .group-icon-wrapper {
  background: color-mix(in srgb, var(--group-color) 10%, transparent);
  border-color: var(--group-color);
  box-shadow: 0 0 20px color-mix(in srgb, var(--group-color) 30%, transparent);
}

.group-border-bottom {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--group-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.group-card:hover .group-border-bottom {
  opacity: 1;
}
</style>