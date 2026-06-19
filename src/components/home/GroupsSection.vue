<template>
  <div ref="containerRef" class="groups-container h-full relative overflow-hidden flex flex-col items-center justify-center px-32">
    <Background />

    <div class="relative z-10 w-full">
      <div class="text-center mb-10" data-reveal>
        <p class="text-sm tracking-widest mb-2 section-label">OUR GROUPS</p>
        <h2 class="section-title text-5xl md:text-6xl font-bold">我們的小組</h2>
        <p class="mt-3 text-lg section-subtitle">選擇你感興趣的方向，加入我們</p>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <a
          v-for="(group, index) in groups"
          :key="group.slug"
          :href="`/groups/${group.slug}`"
          class="group-card"
          data-reveal
          :data-reveal-delay="200 + index * 100"
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
import Background from '../common/Background.vue';
import { useScrollReveal } from '../../composables/useScrollReveal.ts';

defineProps<{
  groups: {
    name: string;
    slug: string;
    tagline: string;
    description: string;
    color: string;
  }[];
}>();

const { containerRef } = useScrollReveal();

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

.group-card {
  display: block;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 14, 26, 0.7);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease, opacity 0.6s ease, transform 0.6s ease;
  overflow: hidden;
  position: relative;
}

.group-card:hover {
  border-color: var(--group-color);
  background: rgba(10, 14, 26, 0.85);
  box-shadow: 0 0 30px color-mix(in srgb, var(--group-color) 20%, transparent);
  transform: translateY(-4px);
}

.group-card.revealed:hover {
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