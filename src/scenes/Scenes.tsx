import { AnimatePresence, motion } from "framer-motion";
import { allianceTracks, family, releases } from "../data/catalog";
import { FadeUp, KineticLine } from "../lib/split";
import { spotifySearch, youtubeWatch } from "../lib/youtube";

export function SceneHome() {
  return (
    <div className="scene-inner">
      <FadeUp>
        <p className="kicker">01 — İstanbul · 2026</p>
      </FadeUp>
      <h1 className="display">
        <KineticLine text="CULTURE" />
      </h1>
      <FadeUp delay={0.28}>
        <p className="lede">
          Aktif plak ve prodüksiyon evi. Sokaktan stüdyoya, stüdyodan sahneye.
          ERAY067 ve Mansur’un kaydı burada tutulur.
        </p>
        <div className="meta-row">
          <span>Label · CULTURE</span>
          <span>House · CLTR</span>
          <span>Yönetim · Campus</span>
        </div>
      </FadeUp>
    </div>
  );
}

export function SceneLabel() {
  return (
    <div className="scene-inner topish">
      <div className="grid-2">
        <div>
          <FadeUp>
            <p className="kicker">02 — Şirket</p>
          </FadeUp>
          <h2 className="display sm">
            <KineticLine text="SESİN EVİ" />
          </h2>
          <FadeUp delay={0.25}>
            <p className="lede">
              CULTURE (TUR) / Culture Records, dijital katalogda CLTR olarak
              geçer. Ömer Çiller prodüksiyonunda; The Orchard ve ONErpm
              dağıtımıyla çıkan kayıtlar, İstanbul’un gece dilini konuşur.
            </p>
            <p className="lede">
              Campus Team yönetim ağı, CLTR House stüdyosu ve CLTR LIVE
              performans serisi aynı çatı altında toplanır. Şirket bugün
              Türkiye rap’inin en üretken odalarından biridir.
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.35}>
          <ul className="album-list">
            <li>
              <b>01</b>
              <span>Plak & yayın</span>
              <span>CULTURE</span>
            </li>
            <li>
              <b>02</b>
              <span>Stüdyo</span>
              <span>CLTR HOUSE</span>
            </li>
            <li>
              <b>03</b>
              <span>Canlı seri</span>
              <span>CLTR LIVE</span>
            </li>
            <li>
              <b>04</b>
              <span>Yönetim</span>
              <span>CAMPUS TEAM</span>
            </li>
          </ul>
        </FadeUp>
      </div>
    </div>
  );
}

export function SceneArtists() {
  return (
    <div className="scene-inner topish">
      <FadeUp>
        <p className="kicker">03 — Sanatçılar</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="067 / 607" />
      </h2>
      <div className="grid-2" style={{ height: "auto", marginTop: 28 }}>
        <article className="artist-card">
          <FadeUp delay={0.15}>
            <p className="kicker">Eray Ünal</p>
            <h3>ERAY067</h3>
            <p>
              Frankfurt doğumlu, Türkiye kökenli. Dedesi sazından gelen melodi
              çizgisini drill ve Fransız type flow ile birleştirir. The Voice of
              Rap Türkiye şampiyonu olduktan sonra CULTURE kadrosuna katıldı.
            </p>
          </FadeUp>
        </article>
        <article className="artist-card">
          <FadeUp delay={0.28}>
            <p className="kicker">Ahmet Mansur Şahin</p>
            <h3>MANSUR</h3>
            <p>
              Şirketin keşfettiği kalem. Sokak anlatısı, samimi nakarat ve
              geceye yazılmış dizeler. Eray ile stüdyoda tanıştı; uyum bir
              anlaşma değil, bir ittifak haline geldi.
            </p>
          </FadeUp>
        </article>
      </div>
    </div>
  );
}

export function SceneAlliance() {
  return (
    <div className="scene-inner topish">
      <div className="grid-2">
        <div>
          <FadeUp>
            <p className="kicker">04 — 31 Temmuz 2026</p>
          </FadeUp>
          <h2 className="display sm">
            <KineticLine text="ALLIANCE" />
          </h2>
          <FadeUp delay={0.24}>
            <p className="lede">
              ERAY067 ve Mansur’un ilk stüdyo albümü. Sekiz parça, tek gece gibi
              akan bir ittifak. Contra, Yung Ouzo ve Reder konuk; BIGBAT,
              Edokaleen, İTSKİMOBEATS prodüksiyon.
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.2}>
          <ol className="album-list">
            {allianceTracks.map((t, i) => (
              <li key={t}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{t}</span>
                <span>ALLIANCE</span>
              </li>
            ))}
          </ol>
        </FadeUp>
      </div>
    </div>
  );
}

export function SceneCatalog() {
  return (
    <div className="scene-inner topish">
      <FadeUp>
        <p className="kicker">05 — Katalog</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="KAYITLAR" />
      </h2>
      <FadeUp delay={0.2}>
        <div className="covers" style={{ marginTop: 28 }}>
          {releases.map((r) => (
            <article key={r.title}>
              <a href={youtubeWatch(r.youtubeId)} target="_blank" rel="noreferrer" data-cursor="hover">
                <img src={r.cover} alt="" />
                <figcaption>
                  <strong>{r.title}</strong>
                  <div style={{ opacity: 0.75 }}>{r.year}</div>
                </figcaption>
              </a>
            </article>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}

export function SceneFamily() {
  return (
    <div className="scene-inner topish">
      <FadeUp>
        <p className="kicker">06 — CLTR ekip</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="AİLE" />
      </h2>
      <FadeUp delay={0.22}>
        <div className="family" style={{ marginTop: 28 }}>
          {family.map((f) => (
            <article key={f.name}>
              <span>{f.tag}</span>
              <div>
                <strong>{f.name}</strong>
                <p style={{ color: "#b7b0a3", marginTop: 6 }}>{f.role}</p>
              </div>
            </article>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}

export function SceneHouse() {
  return (
    <div className="scene-inner">
      <FadeUp>
        <p className="kicker">07 — CLTR House</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="HOUSE" />
      </h2>
      <FadeUp delay={0.24}>
        <p className="lede">
          Culture Müzik Stüdyosu. CLTR LIVE performansları, Kick yayınları ve
          albüm odası. Nafile’nin canlı hali burada çekildi — Türkiye
          standardının üstünde, çıplak ve yakın.
        </p>
        <div className="meta-row">
          <a href="https://www.instagram.com/cltrhouse/" target="_blank" rel="noreferrer" data-cursor="hover">
            @cltrhouse
          </a>
          <a href="https://kick.com/cltrhouse" target="_blank" rel="noreferrer" data-cursor="hover">
            kick.com/cltrhouse
          </a>
        </div>
      </FadeUp>
    </div>
  );
}

export function SceneContact() {
  return (
    <div className="scene-inner topish">
      <FadeUp>
        <p className="kicker">08 — İletişim</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="KAPI AÇIK" />
      </h2>
      <div className="contact-grid" style={{ marginTop: 20 }}>
        <FadeUp delay={0.18}>
          <a href="https://www.instagram.com/culturecords.co/" target="_blank" rel="noreferrer" data-cursor="hover">
            @culturecords.co
          </a>
          <a href="https://www.instagram.com/campusteam.co/" target="_blank" rel="noreferrer" data-cursor="hover">
            @campusteam.co
          </a>
          <a href="mailto:contact@campusteam.com.tr" data-cursor="hover">
            contact@campusteam.com.tr
          </a>
          <a href="tel:+905444454167" data-cursor="hover">
            0544 445 41 67
          </a>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="lede">
            Demo, booking, yayın. İstanbul. CULTURE etiketiyle çıkan her kayıt
            bu odaya aittir.
          </p>
          <div className="meta-row">
            <a
              href={spotifySearch("ERAY067 Mansur CULTURE")}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
            >
              Spotify
            </a>
            <a
              href="https://www.youtube.com/results?search_query=CultureRecords+ERAY067+MANSUR"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
            >
              YouTube
            </a>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

const map = [
  SceneHome,
  SceneLabel,
  SceneArtists,
  SceneAlliance,
  SceneCatalog,
  SceneFamily,
  SceneHouse,
  SceneContact,
];

export function SceneContent({ index }: { index: number }) {
  const Comp = map[index];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={index} className="scene-content">
        <Comp />
      </motion.div>
    </AnimatePresence>
  );
}
