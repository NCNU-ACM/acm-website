<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
       style="background-color: var(--color-bg); border-bottom: 1px solid var(--color-border);">
    
    <a href="/" class="font-bold text-lg" style="color: var(--color-accent);">
      NCNU ACM
    </a>

    <ul class="flex items-center gap-8 list-none">
      <li>
        <a href="/" class="hover:text-blue-400 transition-colors">首頁</a>
      </li>

      <li class="relative" @mouseenter="showAbout = true" @mouseleave="showAbout = false">
        <span class="cursor-pointer hover:text-blue-400 transition-colors">關於我們</span>
        <ul v-if="showAbout" class="absolute top-full left-0 mt-2 py-2 w-36 list-none rounded"
            style="background-color: var(--color-surface); border: 1px solid var(--color-border);">
          <li><a href="/about/introduction" class="block px-4 py-2 hover:text-blue-400 transition-colors">社團介紹</a></li>
          <li><a href="/about/members" class="block px-4 py-2 hover:text-blue-400 transition-colors">成員介紹</a></li>
        </ul>
      </li>

      <li>
        <a href="/events" class="hover:text-blue-400 transition-colors">活動公告</a>
      </li>

      <li class="relative" @mouseenter="showGroups = true" @mouseleave="showGroups = false">
        <span class="cursor-pointer hover:text-blue-400 transition-colors">小組簡介</span>
        <ul v-if="showGroups" class="absolute top-full left-0 mt-2 py-2 w-36 list-none rounded"
            style="background-color: var(--color-surface); border: 1px solid var(--color-border);">
          <li v-for="group in groups" :key="group.slug">
            <a :href="`/groups/${group.slug}`" class="block px-4 py-2 hover:text-blue-400 transition-colors">
              {{ group.name }}
            </a>
          </li>
        </ul>
      </li>

      <li>
        <a href="/join" class="hover:text-blue-400 transition-colors">加入我們</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  groups: { name: string; slug: string }[];
}>();

const showAbout = ref(false);
const showGroups = ref(false);
</script>