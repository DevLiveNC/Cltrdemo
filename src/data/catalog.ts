export type Track = {
  id: string;
  title: string;
  artists: string;
  album: string;
  year: string;
  releaseDate: string;
  chorusStart: number;
  duration: string;
  label: string;
  youtubeId: string;
  cover: string;
  note: string;
};

export type Scene = {
  id: string;
  index: string;
  nav: string;
  kicker: string;
  title: string;
  track: Track;
  image: string;
};

export type Release = {
  title: string;
  artists: string;
  year: string;
  releaseDate: string;
  duration: string;
  cover: string;
  youtubeId: string;
};

export type AllianceTrack = {
  title: string;
  duration: string;
};

export const tracks = {
  nafile: {
    id: "nafile",
    title: "NAFİLE",
    artists: "ERAY067 & Mansur",
    album: "NAFİLE — Single",
    year: "2026",
    releaseDate: "09.01.2026",
    chorusStart: 33,
    duration: "1:54",
    label: "CULTURE",
    youtubeId: "gD3SqwOJ9Sc",
    cover: "/images/cover-nafile.jpg",
    note: "Resmî single · 9 Ocak 2026",
  },
  agladim: {
    id: "agladim",
    title: "ÇOK AĞLADIM",
    artists: "ERAY067 & Mansur",
    album: "ÇOK AĞLADIM — Single",
    year: "2025",
    releaseDate: "01.08.2025",
    chorusStart: 34,
    duration: "1:54",
    label: "CULTURE",
    youtubeId: "eWeWAZiqW0Y",
    cover: "/images/cover-sorma.jpg",
    note: "Resmî single · 1 Ağustos 2025",
  },
  otele: {
    id: "otele",
    title: "İHTİYAÇ YOK OTELE",
    artists: "ERAY067 & Mansur",
    album: "İHTİYAÇ YOK OTELE — Single",
    year: "2025",
    releaseDate: "29.08.2025",
    chorusStart: 0,
    duration: "2:36",
    label: "CULTURE",
    youtubeId: "NPcRsdmeSoI",
    cover: "/images/house.jpg",
    note: "Resmî single · 29 Ağustos 2025",
  },
  baknedicem: {
    id: "baknedicem",
    title: "bak ne dicem",
    artists: "ERAY067 & Mansur",
    album: "ALLIANCE",
    year: "2026",
    releaseDate: "31.07.2026",
    chorusStart: 39,
    duration: "2:25",
    label: "CULTURE",
    youtubeId: "MArJetRSQiM",
    cover: "/images/alliance.jpg",
    note: "ALLIANCE albümünden · 31 Temmuz 2026",
  },
  brapap: {
    id: "brapap",
    title: "BRAPAP",
    artists: "ERAY067, Mansur, Organize & Batuflex",
    album: "BRAPAP — Single",
    year: "2025",
    releaseDate: "24.01.2025",
    chorusStart: 29,
    duration: "2:23",
    label: "CULTURE",
    youtubeId: "Lj8kloI_3Tw",
    cover: "/images/cover-brapap.jpg",
    note: "Resmî single · 24 Ocak 2025",
  },
  hmdl: {
    id: "hmdl",
    title: "HMDL",
    artists: "ERAY067, Mansur, Avie, Organize, Batuflex & Chiko",
    album: "HMDL — Single",
    year: "2025",
    releaseDate: "14.03.2025",
    chorusStart: 34,
    duration: "3:47",
    label: "CULTURE",
    youtubeId: "FinAvFZdwi8",
    cover: "/images/cover-hmdl.jpg",
    note: "Ortak çalışma · 14 Mart 2025",
  },
  live: {
    id: "live",
    title: "NAFİLE — CLTR LIVE",
    artists: "ERAY067 & Mansur",
    album: "CLTR LIVE · S2 B4",
    year: "2026",
    releaseDate: "01.01.2026",
    chorusStart: 24,
    duration: "1:42",
    label: "CLTR HOUSE",
    youtubeId: "_D7TQ1MwnHA",
    cover: "/images/studio.jpg",
    note: "Canlı performans · Sezon 2, Bölüm 4",
  },
  sorma: {
    id: "sorma",
    title: "SORMA",
    artists: "ERAY067, Mansur & Organize",
    album: "SORMA — Single",
    year: "2025",
    releaseDate: "21.03.2025",
    chorusStart: 35,
    duration: "2:09",
    label: "CULTURE",
    youtubeId: "RA9BM5SoASQ",
    cover: "/images/cover-sorma.jpg",
    note: "Resmî single · 21 Mart 2025",
  },
} satisfies Record<string, Track>;

export const scenes: Scene[] = [
  {
    id: "home",
    index: "01",
    nav: "Giriş",
    kicker: "Resmî katalog · Türkçe rap",
    title: "CULTURE",
    track: tracks.nafile,
    image: "/images/hero-night.jpg",
  },
  {
    id: "label",
    index: "02",
    nav: "Label",
    kicker: "CULTURE Records",
    title: "CLTR",
    track: tracks.agladim,
    image: "/images/studio.jpg",
  },
  {
    id: "artists",
    index: "03",
    nav: "Sanatçılar",
    kicker: "ERAY067 · Mansur",
    title: "İKİLİ",
    track: tracks.otele,
    image: "/images/duo.jpg",
  },
  {
    id: "alliance",
    index: "04",
    nav: "Alliance",
    kicker: "31 Temmuz 2026 · 8 parça",
    title: "ALLIANCE",
    track: tracks.baknedicem,
    image: "/images/alliance.jpg",
  },
  {
    id: "catalog",
    index: "05",
    nav: "Katalog",
    kicker: "Seçilmiş resmî yayınlar",
    title: "KATALOG",
    track: tracks.brapap,
    image: "/images/concert.jpg",
  },
  {
    id: "family",
    index: "06",
    nav: "Krediler",
    kicker: "Sanatçı ve yapım kredileri",
    title: "KREDİLER",
    track: tracks.hmdl,
    image: "/images/cover-hmdl.jpg",
  },
  {
    id: "house",
    index: "07",
    nav: "House",
    kicker: "CLTR House · CLTR LIVE",
    title: "HOUSE",
    track: tracks.live,
    image: "/images/house.jpg",
  },
  {
    id: "contact",
    index: "08",
    nav: "İletişim",
    kicker: "Yayın · iş birliği · yönetim",
    title: "İLETİŞİM",
    track: tracks.sorma,
    image: "/images/hero-night.jpg",
  },
];

export const releases: Release[] = [
  {
    title: "ALLIANCE",
    artists: "ERAY067 & Mansur",
    year: "2026",
    releaseDate: "31.07.2026",
    duration: "8 parça",
    cover: "/images/alliance.jpg",
    youtubeId: "MArJetRSQiM",
  },
  {
    title: "NAFİLE",
    artists: "ERAY067 & Mansur",
    year: "2026",
    releaseDate: "09.01.2026",
    duration: "1:54",
    cover: "/images/cover-nafile.jpg",
    youtubeId: "gD3SqwOJ9Sc",
  },
  {
    title: "BRAPAP II",
    artists: "ERAY067, Mansur, Organize & Batuflex",
    year: "2025",
    releaseDate: "31.10.2025",
    duration: "2:21",
    cover: "/images/cover-brapap.jpg",
    youtubeId: "BoIMxiYFOEI",
  },
  {
    title: "İHTİYAÇ YOK OTELE",
    artists: "ERAY067 & Mansur",
    year: "2025",
    releaseDate: "29.08.2025",
    duration: "2:36",
    cover: "/images/house.jpg",
    youtubeId: "NPcRsdmeSoI",
  },
  {
    title: "ÇOK AĞLADIM",
    artists: "ERAY067 & Mansur",
    year: "2025",
    releaseDate: "01.08.2025",
    duration: "1:54",
    cover: "/images/cover-sorma.jpg",
    youtubeId: "eWeWAZiqW0Y",
  },
  {
    title: "SORMA",
    artists: "ERAY067, Mansur & Organize",
    year: "2025",
    releaseDate: "21.03.2025",
    duration: "2:09",
    cover: "/images/cover-sorma.jpg",
    youtubeId: "RA9BM5SoASQ",
  },
  {
    title: "HMDL",
    artists: "ERAY067, Mansur, Avie, Organize, Batuflex & Chiko",
    year: "2025",
    releaseDate: "14.03.2025",
    duration: "3:47",
    cover: "/images/cover-hmdl.jpg",
    youtubeId: "FinAvFZdwi8",
  },
  {
    title: "BİR KERE DAHA",
    artists: "ERAY067, Mansur & BIGBAT",
    year: "2025",
    releaseDate: "14.02.2025",
    duration: "1:59",
    cover: "/images/studio.jpg",
    youtubeId: "eAUwDhZ2RXQ",
  },
];

export const allianceTracks: AllianceTrack[] = [
  { title: "bak ne dicem", duration: "2:25" },
  { title: "gücüm yok", duration: "2:05" },
  { title: "NAFİLE", duration: "1:54" },
  { title: "bilezik pırlanta", duration: "2:26" },
  { title: "olm was rap mep", duration: "2:02" },
  { title: "yesler", duration: "2:05" },
  { title: "sofi", duration: "1:44" },
  { title: "outro", duration: "1:31" },
];

export const family = [
  { name: "ERAY067", role: "Sanatçı", tag: "067" },
  { name: "Mansur", role: "Sanatçı", tag: "607" },
  { name: "Organize", role: "Ortak çalışma", tag: "ORG" },
  { name: "Batuflex", role: "Ortak çalışma", tag: "BTF" },
  { name: "Avie", role: "Ortak çalışma", tag: "AVI" },
  { name: "Chiko", role: "Ortak çalışma", tag: "CHK" },
  { name: "BIGBAT", role: "Prodüksiyon", tag: "BIG" },
  { name: "Ömer Çiller", role: "Prodüksiyon", tag: "ÖÇ" },
];
