# NCNU ACM 官方網站

國立暨南國際大學 ACM 學生分會官方網站前台，使用 Astro 搭配 Vue 3 建置的靜態網站。

## 專案架構

本網站是 ACM 官網系統的其中一個部分，整體系統由三個獨立 repo 組成：

| Repo | 說明 | 技術 |
|---|---|---|
| [acm-website](https://github.com/NCNU-ACM/acm-website)（本專案） | 官網前台 | Astro + Vue 3 |
| [acm-cms-backend](https://github.com/NCNU-ACM/acm-cms-backend) | CMS 後端 API | FastAPI |
| [acm-cms-frontend](https://github.com/NCNU-ACM/acm-cms-frontend) | CMS 後台介面 | Vue 3 |
| [acm-backup](https://github.com/NCNU-ACM/acm-backup) | 內容資料獨立備份 | - |

社團幹部透過 CMS 後台新增或編輯內容（活動、小組、幹部、成果展示、全體通知），CMS 後端會把資料寫成 Markdown 檔案存放在本專案的 `content/` 資料夾，並自動同步備份一份到 `acm-backup` repo。官網前台讀取 `content/` 底下的 Markdown 檔案，在 build 時靜態生成所有頁面。
CMS 後台 → CMS 後端 API → 寫入 content/*.md → 觸發官網 rebuild

↓

同步備份到 acm-backup

## 資料架構

所有內容資料以 Markdown + YAML frontmatter 的格式儲存在 `content/` 資料夾下，依照類型分成五個 collection：
content/

├── groups/           # 小組（無學期區分，slug 命名，例如 system.md）

├── events/           # 活動公告（時間戳命名，例如 20260619135815.md）

├── members/          # 幹部（依學期分資料夾，例如 1141/、1152/）

├── showcase/         # 成果展示（依小組分資料夾，例如 system/）

└── announcements/    # 全體通知（時間戳命名）

各 collection 的欄位定義在 `src/content.config.ts` 裡用 Zod 驗證，詳細欄位如下：

### groups
| 欄位 | 型別 | 說明 |
|---|---|---|
| `name` | string | 小組名稱 |
| `slug` | string | 網址代稱，同時是檔名 |
| `order` | number | 顯示順序 |
| `tagline` | string | 一句話介紹 |
| `description` | string | 詳細說明 |
| `color` | string | 主題色（hex） |

### events
| 欄位 | 型別 | 說明 |
|---|---|---|
| `title` | string | 活動標題 |
| `event_date` | date | 活動舉辦日期 |
| `created_at` | string | 建立時間戳（同時是檔名） |
| `group` | string | 所屬小組 slug |
| `type` | string | 活動類型 |
| `location` | string（選填） | 地點 |
| `description` | string | 簡介 |
| `content` | string（選填） | 詳細內容 |
| `links` | array（選填） | 相關連結 |
| `registration` | string（選填） | 報名連結 |

### members
| 欄位 | 型別 | 說明 |
|---|---|---|
| `name` | string | 姓名 |
| `group` | string（選填） | 所屬小組 slug，無則為社團整體幹部 |
| `role` | string | 職稱 |
| `bio` | string（選填） | 自我介紹 |
| `avatar` | string（選填） | 頭像圖片網址 |
| `contact` | array（選填） | 聯絡方式 |

### showcase
| 欄位 | 型別 | 說明 |
|---|---|---|
| `title` | string | 項目標題 |
| `group` | string | 所屬小組 slug |
| `date` | date | 日期 |
| `description` | string | 簡介 |
| `related_event` | string（選填） | 關聯活動的 id（用於 modal 切換） |
| `cover_image` | string（選填） | 封面圖網址 |
| `gallery` | array（選填） | 圖集網址 |
| `tags` | array（選填） | 標籤 |
| `links` | array（選填） | 相關連結 |

### announcements
| 欄位 | 型別 | 說明 |
|---|---|---|
| `title` | string | 標題 |
| `created_at` | string | 建立時間戳（同時是檔名） |
| `content` | string | 通知內容 |
| `active` | boolean | 是否顯示在官網上 |

> 圖片一律以外部連結（URL）方式嵌入，不會上傳到伺服器，避免佔用儲存空間。

## 頁面結構

| 路徑 | 說明 |
|---|---|
| `/` | 首頁（Hero、小組介紹、近期活動、活動回顧、加入我們） |
| `/events` | 活動公告列表（含全體通知） |
| `/about/introduction` | 社團介紹 |
| `/about/members` | 幹部介紹（輪播） |
| `/groups/[slug]` | 小組詳情頁（介紹、幹部、公告、成果展示） |
| `/join` | 加入我們 |

## 本機開發

### 環境需求
- Node.js 18 以上

### 安裝與啟動

```bash
npm install
npm run dev
```

開發伺服器預設啟動在 `http://localhost:4321`。

### 建置

```bash
npm run build
```

建置結果輸出在 `dist/` 資料夾。

## 技術棧

- [Astro](https://astro.build/) — 靜態網站框架
- [Vue 3](https://vuejs.org/) — 互動元件（`client:load` 載入）
- Zod — Content Collections 的資料驗證

## 相關專案

- [acm-cms-backend](https://github.com/NCNU-ACM/acm-cms-backend) — CMS 後端 API
- [acm-cms-frontend](https://github.com/NCNU-ACM/acm-cms-frontend) — CMS 後台介面
- [acm-backup](https://github.com/NCNU-ACM/acm-backup) — 內容資料獨立備份