import { useEffect, useRef } from 'react';

// 對應原本的 composables/useScrollReveal.ts（Vue 版，W7 已刪）。行為逐項保留：
// - 只在掛載時 querySelectorAll('[data-reveal]') 一次（之後新增的元素不會被觀察）
// - threshold 0.2；進入視窗時把 data-reveal-delay 寫進 inline transitionDelay 並加上字面 class 'revealed'，離開時移除
// - 卸載時 disconnect
//
// 這個 hook 直接改 DOM 的 class / style（React 不知道）。只要 React 沒有重寫該元素的 className / style 就不會被覆蓋，
// 所以帶 data-reveal 的元素不得有會變動的 className（現有元素的 className 都是 render 間不變的字串）。
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
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

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { containerRef };
}
