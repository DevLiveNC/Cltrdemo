# CLTR — CULTURE Records

**CULTURE / CLTR** — ERAY067, Mansur ve ortak kayıtların resmî yayın kataloğu için sinematik site.

- GSAP Observer + clip-path sahne geçişleri (her scroll = yeni sayfa)
- Framer Motion kinetik tipografi
- Sahne başına resmi klibin YouTube üzerinden çalması
- Köşede şarkı kartı (başlık, sanatçı, yıl, süre, label)

## Komutlar

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

| Komut | Ne yapar |
|---|---|
| `npm install` | Bağımlılıkları kurar |
| `npm run dev` | Yerel geliştirme sunucusu |
| `npm run typecheck` | TypeScript kontrolü |
| `npm run build` | Vercel’in kullandığı production build (`dist/`) |
| `npm run preview` | Build’i yerelde dener |
| `npm start` | Preview ile aynı |

## Vercel

Repo’yu Vercel’e bağla. Ayarlar otomatik:

- **Framework:** Vite
- **Install:** `npm install`
- **Build:** `npm run build`
- **Output:** `dist`
- **Node:** 20

Dashboard’dan: **Add New Project → GitHub repo → Deploy**.  
CLI ile:

```bash
npm i -g vercel
vercel
vercel --prod
```
