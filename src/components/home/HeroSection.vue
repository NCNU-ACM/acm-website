<template>
  <div class="hero-container flex flex-col justify-start h-full relative overflow-hidden px-16 pt-32">
    <div class="hero-glow"></div>

    <div class="relative z-10 max-w-2xl">

      <h1 class="text-7xl md:text-8xl font-bold mb-6 tracking-tight">
        NCNU <span style="color: var(--color-accent);">ACM</span>
      </h1>
      <!-- <p class="text-sm tracking-widest mb-4" style="color: var(--color-accent);">
        NATIONAL CHI NAN UNIVERSITY
      </p> -->

      <div class="mb-4">
        <p class="text-2xl md:text-3xl gradient-text font-bold">
          程式設計 × 系統開發 × 創意實踐
        </p>
      </div>

      <a href="/join" class="inline-block mt-2 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 glow-button">
        加入我們 →
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-container {
  background: radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
}

.hero-glow {
  position: absolute;
  top: -100px;
  left: -100px;
  width: 750px;
  height: 750px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
}

.gradient-text {
  position: relative;
  display: inline-block;
  background: linear-gradient(135deg, #a78bfa 0%, #34d399 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 0.5rem;
}

.gradient-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #a78bfa 20%, #34d399 80%, transparent);
}

.glow-button {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.glow-button:hover {
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.7);
}
</style>