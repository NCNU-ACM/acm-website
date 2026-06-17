<template>
  <div ref="containerRef" class="join-container h-full relative overflow-hidden flex flex-col items-center justify-center px-16 text-center">
    <Background />
    <div class="glow-bg"></div>

    <div class="relative z-10">
      <p class="text-sm tracking-widest mb-2 section-label" data-reveal>JOIN US</p>
      <h2 class="section-title text-5xl md:text-6xl font-bold mb-6" data-reveal data-reveal-delay="100">準備好加入了嗎？</h2>
      <p class="text-lg mb-10 max-w-xl mx-auto section-subtitle" data-reveal data-reveal-delay="200">
        不論你是程式新手還是經驗豐富的開發者，這裡都有適合你的位置
      </p>

      <div class="flex flex-wrap gap-4 justify-center pt-4" data-reveal data-reveal-delay="300">
        <a href="/join" class="inline-block px-8 py-4 rounded-full font-medium transition-all hover:scale-105 glow-button">
          立即加入 →
        </a>
        <a href="/groups/system" class="inline-block px-8 py-4 rounded-full font-medium transition-all hover:scale-105 outline-button">
          了解各小組
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Background from './Background.vue';
import { useScrollReveal } from '../useScrollReveal';

const { containerRef } = useScrollReveal();
</script>

<style scoped>
.join-container {
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

.glow-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
  filter: blur(40px);
  animation: pulse 4s ease-in-out infinite;
  z-index: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
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

.glow-button {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.glow-button:hover {
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.7);
}

.outline-button {
  background: transparent;
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.6);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
}

.outline-button:hover {
  border-color: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
</style>