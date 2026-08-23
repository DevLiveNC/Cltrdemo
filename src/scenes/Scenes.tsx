import { AnimatePresence, motion } from "framer-motion";
import { allianceTracks, family, releases, tracks } from "../data/catalog";
import { FadeUp, KineticLine } from "../lib/split";
import { spotifySearch, youtubeWatch } from "../lib/youtube";

export function SceneHome() {
  return (
    <div className="scene-inner">
      <FadeUp>
        <p className="kicker">01 — Resmî katalog · Türkçe rap</p>
      </FadeUp>
      <h1 className="display">
        <KineticLine text="CULTURE" />
      </h1>
      <FadeUp delay={0.28}>
        <p className="lede">
          CULTURE etiketiyle yayımlanan ERAY067 ve Mansur kayıtlarını, CLTR
          House ve CLTR LIVE seçkisiyle birlikte keşfedin. Başlık, tarih ve süre
          bilgileri dijital müzik servislerindeki yayın künyeleri temel alınarak
          düzenlendi.
        </p>
        <div className="meta-row">
          <span>Label · CULTURE</span>
          <span>Sanatçılar · ERAY067 / Mansur</span>
          <span>Seçki · 2025–2026</span>
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
            <p className="kicker">02 — CULTURE Records</p>
          </FadeUp>
          <h2 className="display sm">
            <KineticLine text="SESİN EVİ" />
          </h2>
          <FadeUp delay={0.25}>
            <p className="lede">
              CULTURE, ERAY067 ve Mansur&apos;un dijital yayınlarında görülen kayıt
              etiketi adıdır. Bu seçkide single&apos;lar, ALLIANCE albümü ve CLTR
              House performans kayıtları resmî başlık, tarih ve süre bilgileriyle
              bir araya gelir.
            </p>
            <p className="lede">
              CLTR House, resmî Instagram profilinde Culture Müzik Stüdyosu
              olarak tanımlanır. CLTR LIVE kayıtları ise ERAY067 ve Mansur&apos;un
              YouTube üzerindeki canlı performans arşivini oluşturur.
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.35}>
          <ul className="album-list">
            <li>
              <b>01</b>
              <span>Dijital yayın</span>
              <span>CULTURE</span>
            </li>
            <li>
              <b>02</b>
              <span>Albüm</span>
              <span>ALLIANCE</span>
            </li>
            <li>
              <b>03</b>
              <span>Performans</span>
              <span>CLTR LIVE</span>
            </li>
            <li>
              <b>04</b>
              <span>Stüdyo</span>
              <span>CLTR HOUSE</span>
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
            <p className="kicker">Resmî sanatçı adı</p>
            <h3>ERAY067</h3>
            <p>
              ERAY067, dijital platformlarda ve resmî video başlıklarında
              kullanılan sanatçı adıdır. NAFİLE, ÇOK AĞLADIM, İHTİYAÇ YOK OTELE
              ve ALLIANCE kayıtlarında Mansur ile birlikte kredilendirilir.
            </p>
          </FadeUp>
        </article>
        <article className="artist-card">
          <FadeUp delay={0.28}>
            <p className="kicker">Resmî sanatçı adı</p>
            <h3>MANSUR</h3>
            <p>
              Mansur adıyla yayımlanan çalışmalar, ERAY067 ile ortak single&apos;larda
              ve ALLIANCE albümünde buluşur. BRAPAP, HMDL ve SORMA kayıtlarında
              farklı sanatçılarla ortak kredileri de bulunur.
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
            <p className="kicker">04 — 31 Temmuz 2026 · 8 parça</p>
          </FadeUp>
          <h2 className="display sm">
            <KineticLine text="ALLIANCE" />
          </h2>
          <FadeUp delay={0.24}>
            <p className="lede">
              ALLIANCE, ERAY067 ve MANSUR imzalı sekiz parçalık albümdür. 31
              Temmuz 2026 tarihinde yayımlanan çalışma, dijital platform
              bilgilerinde yaklaşık 16 dakikalık toplam süreyle listelenir.
            </p>
          </FadeUp>
        </div>
        <FadeUp delay={0.2}>
          <ol className="album-list">
            {allianceTracks.map((track, i) => (
              <li key={track.title}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{track.title}</span>
                <span>{track.duration}</span>
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
        <p className="kicker">05 — Seçilmiş resmî yayınlar</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="KATALOG" />
      </h2>
      <FadeUp delay={0.2}>
        <div className="covers" style={{ marginTop: 28 }}>
          {releases.map((release) => (
            <article key={release.title}>
              <a
                href={youtubeWatch(release.youtubeId)}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                aria-label={`${release.title} resmî YouTube bağlantısını aç`}
              >
                <img src={release.cover} alt={`${release.title} kapak görseli`} />
                <figcaption>
                  <strong>{release.title}</strong>
                  <div className="cover-artists">{release.artists}</div>
                  <div className="cover-meta">
                    {release.releaseDate} · {release.duration}
                  </div>
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
        <p className="kicker">06 — Sanatçı ve yapım kredileri</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="KREDİLER" />
      </h2>
      <FadeUp delay={0.22}>
        <div className="family" style={{ marginTop: 28 }}>
          {family.map((credit) => (
            <article key={credit.name}>
              <span>{credit.tag}</span>
              <div>
                <strong>{credit.name}</strong>
                <p style={{ color: "#bdbdbd", marginTop: 6 }}>{credit.role}</p>
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
          CLTR House, @cltrhouse hesabında Culture Müzik Stüdyosu olarak
          tanımlanır. CLTR LIVE arşivi, ERAY067 ve Mansur&apos;un canlı
          performanslarını sezon ve bölüm bilgileriyle yayımlar.
        </p>
        <div className="meta-row">
          <a
            href="https://www.instagram.com/cltrhouse/"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
          >
            @cltrhouse
          </a>
          <a
            href={youtubeWatch(tracks.live.youtubeId)}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
          >
            NAFİLE · CLTR LIVE
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
        <p className="kicker">08 — Yayın, iş birliği ve yönetim</p>
      </FadeUp>
      <h2 className="display sm">
        <KineticLine text="İLETİŞİM" />
      </h2>
      <div className="contact-grid" style={{ marginTop: 20 }}>
        <FadeUp delay={0.18}>
          <a
            href="https://www.instagram.com/culturerecords__/"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
          >
            @culturerecords__
          </a>
          <a
            href="https://www.instagram.com/campusteam.co/"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
          >
            @campusteam.co
          </a>
          <a href="mailto:contact@campusteam.com.tr" data-cursor="hover">
            contact@campusteam.com.tr
          </a>
          <a href="tel:+905444454167" data-cursor="hover">
            +90 544 445 41 67
          </a>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="lede">
            Yayın, iş birliği ve yönetim talepleriniz için Campus Management
            iletişim kanallarını kullanabilirsiniz. Resmî katalog ve sanatçı
            bağlantıları aşağıda yer alır.
          </p>
          <div className="meta-row">
            <a
              href={spotifySearch("ERAY067 Mansur CULTURE")}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
            >
              Spotify&apos;da keşfet
            </a>
            <a
              href="https://www.youtube.com/results?search_query=CultureRecords+ERAY067+MANSUR"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
            >
              YouTube&apos;da izle
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
      <motion.div key={index} style={{ height: "100%" }}>
        <Comp />
      </motion.div>
    </AnimatePresence>
  );
}
