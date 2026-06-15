<template>
  <div class="hero-container flex flex-col h-full relative overflow-hidden">
    <div class="hex-grid"></div>
    <div class="side-line left"></div>
    <div class="side-line right"></div>
    <div class="flex flex-col items-center justify-center flex-1 relative z-10 text-center px-8">
      <div class="title-wrapper">
        <pre class="ascii-bg">{{ asciiArt }}</pre>
        <h1 class="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight relative z-10">
          NCNU <span style="color: var(--color-accent);">ACM</span>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import figlet from 'figlet';
import standard from 'figlet/importable-fonts/Standard.js';

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
  background: #0a0e1a;
}

.title-wrapper {
  position: relative;
  display: inline-block;
}

.hex-grid {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0 34L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='rgba(59,130,246,0.08)' stroke-width='1'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

.side-line {
  position: absolute;
  top: 10%;
  width: 1px;
  height: 80%;
  background: linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.3) 30%, rgba(59, 130, 246, 0.3) 70%, transparent);
  z-index: 0;
  pointer-events: none;
}

.side-line.left {
  left: 3rem;
}

.side-line.right {
  right: 3rem;
}

.side-line::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 40px;
  background: rgba(59, 130, 246, 0.8);
  left: -1.5px;
  border-radius: 9999px;
  filter: blur(2px);
  animation: slide-down 4s ease-in-out infinite;
}

.side-line.right::after {
  animation-delay: 2s;
}

@keyframes slide-down {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.ascii-bg {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-51.7%, 10%);
  font-family: monospace;
  font-size: clamp(20px, 3vw, 36px);
  color: rgba(59, 130, 246, 0.25);
  white-space: pre;
  overflow: hidden;
  pointer-events: none;
  line-height: 1.2;
  z-index: 0;
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
</style>