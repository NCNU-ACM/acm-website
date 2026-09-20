import type { CSSProperties } from 'react';
import { Server, Globe, Gamepad2, Briefcase, type LucideIcon } from 'lucide-react';
import type { Group } from '../../types/content';
import Background from '../common/Background';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './GroupsSection.module.css';

interface Props {
  groups: Group[];
}

const iconMap: Record<string, LucideIcon> = {
  system: Server,
  international: Globe,
  game: Gamepad2,
  case: Briefcase,
};

const getIcon = (slug: string) => iconMap[slug] ?? Server;

export default function GroupsSection({ groups }: Props) {
  const { containerRef } = useScrollReveal();

  return (
    <div
      ref={containerRef}
      className={`${styles['groups-container']} h-full relative overflow-hidden flex flex-col items-center justify-center px-32`}
    >
      <Background />

      <div className="relative z-10 w-full">
        <div className="text-center mb-10" data-reveal="">
          <p className={`text-sm tracking-widest mb-2 ${styles['section-label']}`}>OUR GROUPS</p>
          <h2 className={`${styles['section-title']} text-5xl md:text-6xl font-bold`}>我們的小組</h2>
          <p className={`mt-3 text-lg ${styles['section-subtitle']}`}>選擇你感興趣的方向，加入我們</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {groups.map((group, index) => {
            const Icon = getIcon(group.slug);
            return (
              <a
                key={group.slug}
                href={`/groups/${group.slug}`}
                className={styles['group-card']}
                data-reveal=""
                data-reveal-delay={200 + index * 100}
                style={{ '--group-color': group.color } as CSSProperties}
              >
                <div className={styles['group-card-inner']}>
                  <div className={styles['group-icon-wrapper']}>
                    {/* Vue 原檔寫 :stroke="group.color"，但 lucide-vue-next 的元件自己的 stroke 會蓋掉它，實際輸出是
                        stroke="currentColor"；lucide-react 的 stroke 會生效，照搬會讓圖示變成小組色。維持 baseline 的畫面，不傳 stroke。 */}
                    <Icon size={48} />
                  </div>
                  {/* group-info 在原檔沒有任何規則，CSS Modules 不會輸出它，用字面 class 保持 DOM 與 baseline 一致 */}
                  <div className="group-info">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: group.color }}>
                      {group.name}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)' }}>{group.description}</p>
                  </div>
                </div>
                <div className={styles['group-border-bottom']}></div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
