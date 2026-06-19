import { onMounted, onUnmounted, ref } from 'vue';

export function useScrollReveal() {
  const containerRef = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!containerRef.value) return;

    const elements = containerRef.value.querySelectorAll('[data-reveal]');

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delay = el.dataset.revealDelay || '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('revealed');
          } else {
            el.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer!.observe(el));
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { containerRef };
}