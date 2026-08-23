export type Track = {
  id: string;
  title: string;
  artists: string;
  album: string;
  year: string;
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

export const tracks = {
  nafile: {
    id: "nafile",
    title: "NAFİLE",
    artists: "ERAY067 & Mansur",
    album: "NAFİLE — Single",
    year: "2026",
    duration: "1:54",
    label: "CULTURE",
    youtubeId: "gD3SqwOJ9Sc",
    cover: "/images/cover-nafile.jpg",
    note: "ALLIANCE döneminin kırılma single’ı.",
  },
  agladim: {
    id: "agladim",
    title: "ÇOK AĞLADIM",
    artists: "ERAY067 & Mansur",
    album: "ÇOK AĞLADIM — Single",
    year: "2025",
    duration: "1:54",
    label: "CULTURE",
    youtubeId: "eWeWAZiqW0Y",
    cover: "/images/cover-sorma.jpg",
    note: "Duygusal çizginin en çıplak kaydı.",
  },
  otele: {
    id: "otele",
    title: "İHTİYAÇ YOK OTELE",
    artists: "ERAY067 & Mansur",
    album: "İHTİYAÇ YOK OTELE — Single",
    year: "2025",
    duration: "2:36",
    label: "CULTURE",
    youtubeId: "NPcRsdmeSoI",
    cover: "/images/house.jpg",
    note: "İkili imza sound’unun sahne hali.",
  },
  baknedicem: {
    id: "baknedicem",
    title: "bak ne dicem",
    artists: "ERAY067 & Mansur",
    album: "ALLIANCE",
    year: "2026",
    duration: "2:04",
    label: "CULTURE",
    youtubeId: "MArJetRSQiM",
    cover: "/images/alliance.jpg",
    note: "İlk stüdyo albümünün açılış sahnesi.",
  },
  brapap: {
    id: "brapap",
    title: "BRAPAP",
    artists: "ERAY067, Mansur, Organize, Batuflex",
    album: "BRAPAP — Single",
    year: "2025",
    duration: "2:18",
    label: "CULTURE",
    youtubeId: "Lj8kloI_3Tw",
    cover: "/images/cover-brapap.jpg",
    note: "CLTR ekibinin sokak manifestosu.",
  },
  hmdl: {
    id: "hmdl",
    title: "HMDL",
    artists: "ERAY067, Mansur, Avie, Organize, Batuflex, Chiko",
    album: "HMDL — Single",
    year: "2025",
    duration: "3:47",
    label: "CULTURE",
    youtubeId: "FinAvFZdwi8",
    cover: "/images/cover-hmdl.jpg",
    note: "Altı isim, tek gece, tek kayıt.",
  },
  live: {
    id: "live",
    title: "NAFİLE — CLTR LIVE",
    artists: "ERAY067 & Mansur",
    album: "CLTR House S2B4",
    year: "2026",
    duration: "2:10",
    label: "CLTR HOUSE",
    youtubeId: "_D7TQ1MwnHA",
    cover: "/images/studio.jpg",
    note: "Stüdyonun çıplak hali. Canlı.",
  },
  sorma: {
    id: "sorma",
    title: "SORMA",
    artists: "ERAY067, Mansur & Organize",
    album: "SORMA — Single",
    year: "2025",
    duration: "2:22",
    label: "CULTURE",
    youtubeId: "RA9BM5SoASQ",
    cover: "/images/cover-sorma.jpg",
    note: "Gece kapanışı. Soru yok.",
  },
} satisfies Record<string, Track>;

export const scenes: Scene[] = [
  {
    id: "home",
    index: "01",
    nav: "Giriş",
    kicker: "İstanbul · Plak & Prodüksiyon",
    title: "CULTURE",
    track: tracks.nafile,
    image: "/images/hero-night.jpg",
  },
  {
    id: "label",
    index: "02",
    nav: "Label",
    kicker: "Şirket",
    title: "CLTR",
    track: tracks.agladim,
    image: "/images/studio.jpg",
  },
  {
    id: "artists",
    index: "03",
    nav: "Sanatçılar",
    kicker: "067 · 607",
    title: "İKİLİ",
    track: tracks.otele,
    image: "/images/duo.jpg",
  },
  {
    id: "alliance",
    index: "04",
    nav: "Alliance",
    kicker: "İlk stüdyo albümü",
    title: "ALLIANCE",
    track: tracks.baknedicem,
    image: "/images/alliance.jpg",
  },
  {
    id: "catalog",
    index: "05",
    nav: "Katalog",
    kicker: "Seçilmiş kayıtlar",
    title: "KATALOG",
    track: tracks.brapap,
    image: "/images/concert.jpg",
  },
  {
    id: "family",
    index: "06",
    nav: "Ekip",
    kicker: "CLTR family",
    title: "EKİP",
    track: tracks.hmdl,
    image: "/images/cover-hmdl.jpg",
  },
  {
    id: "house",
    index: "07",
    nav: "House",
    kicker: "Stüdyo",
    title: "HOUSE",
    track: tracks.live,
    image: "/images/house.jpg",
  },
  {
    id: "contact",
    index: "08",
    nav: "İletişim",
    kicker: "Kapı açık",
    title: "KONTAKT",
    track: tracks.sorma,
    image: "/images/hero-night.jpg",
  },
];

export const releases = [
  { title: "NAFİLE", artists: "ERAY067 & Mansur", year: "2026", cover: "/images/cover-nafile.jpg", youtubeId: "gD3SqwOJ9Sc" },
  { title: "bak ne dicem", artists: "ERAY067 & Mansur", year: "2026", cover: "/images/alliance.jpg", youtubeId: "MArJetRSQiM" },
  { title: "BRAPAP II", artists: "ERAY067, Mansur, Organize, Batuflex", year: "2025", cover: "/images/cover-brapap.jpg", youtubeId: "BoIMxiYFOEI" },
  { title: "İHTİYAÇ YOK OTELE", artists: "ERAY067 & Mansur", year: "2025", cover: "/images/house.jpg", youtubeId: "NPcRsdmeSoI" },
  { title: "ÇOK AĞLADIM", artists: "ERAY067 & Mansur", year: "2025", cover: "/images/cover-sorma.jpg", youtubeId: "eWeWAZiqW0Y" },
  { title: "HMDL", artists: "CLTR ekip", year: "2025", cover: "/images/cover-hmdl.jpg", youtubeId: "FinAvFZdwi8" },
  { title: "SORMA", artists: "ERAY067, Mansur, Organize", year: "2025", cover: "/images/cover-sorma.jpg", youtubeId: "RA9BM5SoASQ" },
  { title: "BİR KERE DAHA", artists: "ERAY067 & Mansur", year: "2025", cover: "/images/studio.jpg", youtubeId: "eAUwDhZ2RXQ" },
];

export const allianceTracks = [
  "bak ne dicem",
  "gücüm yok",
  "NAFİLE",
  "bilezik pırlanta",
  "olm was rap mep",
  "yesler",
  "sofi",
  "outro",
];

export const family = [
  { name: "ERAY067", role: "Sanatçı", tag: "067" },
  { name: "Mansur", role: "Sanatçı", tag: "607" },
  { name: "Organize", role: "Feat / aile", tag: "ORG" },
  { name: "Batuflex", role: "Feat / aile", tag: "BTF" },
  { name: "Avie", role: "Feat / aile", tag: "AVI" },
  { name: "Chiko", role: "Feat / aile", tag: "CHK" },
  { name: "Reder", role: "Feat / aile", tag: "RDR" },
  { name: "Ömer Çiller", role: "Producer", tag: "OC" },
];
