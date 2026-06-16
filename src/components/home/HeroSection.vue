<template>
  <div class="hero-container flex flex-col h-full relative overflow-hidden">
    <div class="circuit-bg"></div>
    <div class="flex flex-col items-center justify-center flex-1 relative z-10 text-center px-8">
      <div class="title-wrapper">
        <pre class="ascii-bg">{{ asciiArt }}</pre>
        <h1 class="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight relative z-10 hero-title">
          NCNU ACM
        </h1>
      </div>

      <div class="mb-6">
        <p class="text-3xl md:text-4xl lg:text-5xl gradient-text font-bold">
          程式設計 × 系統開發 × 創意實踐
        </p>
      </div>

      <div class="flex flex-wrap gap-4 justify-center mt-6">
        <a href="/join" class="inline-block px-8 py-4 rounded-full font-medium transition-all hover:scale-105 glow-button">
          加入我們 →
        </a>
        <a href="/events" class="inline-block px-8 py-4 rounded-full font-medium transition-all hover:scale-105 outline-button">
          活動公告
        </a>
        <a href="/about/introduction" class="inline-block px-8 py-4 rounded-full font-medium transition-all hover:scale-105 outline-button">
          關於我們
        </a>
      </div>

      <div class="terminal-input-bar mt-8"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false">
          <span v-if="!inputText" class="placeholder-text" :class="{ active: isHovered }">NCNU ACM</span>
          <input
            v-model="inputText"
            @input="updateAscii"
            type="text"
            class="terminal-input"
            :class="{ active: isHovered }"
            maxlength="12"
          />
        <span class="cursor" :class="{ active: isHovered }">_</span>
      </div>
    </div>
    <div class="code-rain-wrapper">
      <CodeRain />
    </div>
    <svg class="circuit-deco circuit-bottom-left" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="rgba(59,130,246,0.45)" stroke-width="2">
        <path d="M10 290 L10 220 L70 220 L70 160 L130 160" />
        <path d="M10 290 L90 290 L90 240 L160 240" />
        <path d="M40 290 L40 250 L20 250" />
        <path d="M10 260 L50 260" />
        <path d="M70 220 L70 190 L100 190" />
        <path d="M130 160 L130 120 L180 120" />
        <path d="M160 240 L160 200 L200 200" />
        <path d="M90 290 L130 290 L130 270" />
        <circle cx="130" cy="160" r="5" fill="rgba(52,211,153,0.8)" />
        <circle cx="160" cy="240" r="5" fill="rgba(52,211,153,0.8)" />
        <circle cx="180" cy="120" r="4" fill="rgba(52,211,153,0.7)" />
        <circle cx="200" cy="200" r="4" fill="rgba(52,211,153,0.7)" />
        <circle cx="70" cy="220" r="4" fill="rgba(59,130,246,0.65)" />
        <circle cx="20" cy="250" r="3" fill="rgba(59,130,246,0.6)" />
        <circle cx="100" cy="190" r="3" fill="rgba(59,130,246,0.6)" />
        <circle cx="130" cy="270" r="3" fill="rgba(59,130,246,0.6)" />
        <rect x="120" y="150" width="22" height="22" rx="3" />
        <rect x="150" y="230" width="22" height="22" rx="3" />
      </g>
    </svg>

    <svg class="circuit-deco circuit-top-right" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="rgba(59,130,246,0.45)" stroke-width="2">
        <path d="M290 10 L290 80 L230 80 L230 140 L170 140" />
        <path d="M290 10 L210 10 L210 60 L140 60" />
        <path d="M260 10 L260 50 L280 50" />
        <path d="M290 40 L250 40" />
        <path d="M230 80 L230 110 L200 110" />
        <path d="M170 140 L170 180 L120 180" />
        <path d="M140 60 L140 100 L100 100" />
        <path d="M210 10 L170 10 L170 30" />
        <circle cx="170" cy="140" r="5" fill="rgba(52,211,153,0.8)" />
        <circle cx="140" cy="60" r="5" fill="rgba(52,211,153,0.8)" />
        <circle cx="120" cy="180" r="4" fill="rgba(52,211,153,0.7)" />
        <circle cx="100" cy="100" r="4" fill="rgba(52,211,153,0.7)" />
        <circle cx="230" cy="80" r="4" fill="rgba(59,130,246,0.65)" />
        <circle cx="280" cy="50" r="3" fill="rgba(59,130,246,0.6)" />
        <circle cx="200" cy="110" r="3" fill="rgba(59,130,246,0.6)" />
        <circle cx="170" cy="30" r="3" fill="rgba(59,130,246,0.6)" />
        <rect x="158" y="129" width="22" height="22" rx="3" />
        <rect x="128" y="49" width="22" height="22" rx="3" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';
import CodeRain from './CodeRain.vue';

const isHovered = ref(false);
figlet.parseFont('Standard', standard);

const asciiArt = ref('');
const inputText = ref('');

const renderAscii = (text: string) => {
  figlet.text(text, { font: 'Standard' }, (err, result) => {
    if (!err && result) {
      asciiArt.value = result;
    }
  });
};

const updateAscii = () => {
  const text = inputText.value.trim() || 'NCNU ACM';
  renderAscii(text);
};

onMounted(() => {
  renderAscii('NCNU ACM');
});
</script>

<style scoped>
.hero-container {
  height: 100%;
  background: linear-gradient(to top, #030b23 0%, #063238 100%);
}

.title-wrapper {
  position: relative;
  display: inline-block;
}

.circuit-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.12) 2px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.12) 2px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.hero-title {
  background: linear-gradient(to top right, #3b82f6 0%, #34d399 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
  filter: 
    drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))
    drop-shadow(0 0 25px rgba(52, 211, 153, 0.4))
    drop-shadow(3px 6px 0px rgba(0, 0, 0, 1));
}

.ascii-bg {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-51.7%, 10%);
  font-family: monospace;
  font-size: clamp(20px, 3vw, 36px);
  color: rgba(59, 130, 246, 0.45);
  white-space: pre;
  overflow: hidden;
  pointer-events: none;
  line-height: 1.2;
  z-index: 0;
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
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

.terminal-input-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 9999px;
  background: rgba(10, 14, 26, 0.3);
  font-family: monospace;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.terminal-input-bar:hover {
  background: rgba(10, 14, 26, 0.9);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.terminal-input {
  background: transparent;
  border: none;
  outline: none;
  color: rgba(226, 232, 240, 0.3);
  font-family: monospace;
  font-size: 1rem;
  flex: 1;
  transition: color 0.3s ease;
}

.prompt {
  color: rgba(59, 130, 246, 0.3);
  font-size: 1rem;
  transition: color 0.3s ease;
}

.cursor {
  color: rgba(59, 130, 246, 0.3);
  animation: blink 1s step-end infinite;
  transition: color 0.3s ease;
}

.terminal-input.active {
  color: rgba(226, 232, 240, 1);
}

.prompt.active {
  color: rgba(59, 130, 246, 1);
}

.cursor.active {
  color: rgba(59, 130, 246, 1);
}

.placeholder-text {
  position: absolute;
  color: rgba(226, 232, 240, 0.3);
  font-family: monospace;
  font-size: 1rem;
  pointer-events: none;
  transition: color 0.3s ease;
}

.placeholder-text.active {
  color: rgba(226, 232, 240, 0.6);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.code-rain-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
}

.circuit-deco {
  position: absolute;
  width: 380px;
  height: 380px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;
}

.circuit-bottom-left {
  left: -20px;
  bottom: -20px;
}

.circuit-top-right {
  right: -20px;
  top: -20px;
}
</style>