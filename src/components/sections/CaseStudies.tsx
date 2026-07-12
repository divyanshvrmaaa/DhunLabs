import { motion } from "framer-motion";
import { CASE_STUDIES } from "../../data/content";
import { Tag } from "../ui/Tag";
import { useInView } from "../../hooks/useInView";
import styles from "./CaseStudies.module.css";

const ACCENT_MAP = {
  coral:  "var(--color-coral)",
  violet: "var(--color-violet)",
  gold:   "var(--color-gold)",
};

export function CaseStudies() {
  const { ref, inView } = useInView();

  return (
    <section id="work" className={styles.section} ref={ref}>
      <div className="section-wrap">
        <div className={styles.header}>
          <span className="eyebrow">Proven Results</span>
          <motion.h2
           className={`section-heading ${styles.title}`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
             }}
      >
  <span className={styles.white}>The Numbers</span>
  <br />
  <span className={styles.green}>Don't Lie.</span>
</motion.h2>
          <p className={styles.sub}>
            Real campaigns. Real artists. Real outcomes. We protect client data
            integrity — these are the results we can show.
          </p>
        </div>

        <div className={styles.list}>
          {CASE_STUDIES.map((cs, i) => {
            const accentColor = ACCENT_MAP[cs.accent];
            return (
              <motion.div
                key={cs.id}
                className={`${styles.card} ${cs.featured ? styles.featured : ""}`}
                style={{ "--accent": accentColor } as React.CSSProperties}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {cs.featured && <div className={styles.featuredBadge}>Featured</div>}

                {/* Image Section */}
                <div className={styles.imageSection}>
                  <motion.img
                    src={cs.image}
                    alt={cs.artist}
                    className={styles.artistImage}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Meta Section */}
                <div className={styles.metaSection}>
                  <span className={styles.cardIndex}>{cs.index}</span>
                  <h3 className={styles.artist}>{cs.artist}</h3>
                  <p className={styles.genre}>{cs.genre}</p>
                </div>

                {/* Details Section */}
                <div className={styles.detailsSection}>
                  <p className={styles.desc}>{cs.description}</p>
                  <div className={styles.tags}>
                    {cs.tactics.map((t) => <Tag key={t} label={t} />)}
                  </div>
                  <a
                   href={cs.spotify}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={styles.spotifyBtn}
                  >
                  <span>🎵</span>
                   Listen on Spotify
                  </a>
                </div>

                {/* Stats Section */}
                <div className={styles.statsSection}>
                  <div className={styles.metrics}>
                    {cs.metrics.map((m) => (
                      <div key={m.label} className={styles.metric}>
                        <span className={styles.metricLabel}>{m.label}</span>
                        <span className={styles.metricValue}>{m.value}</span>
                        <span className={styles.metricNote}>{m.note}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.note}>
                    <span className={styles.noteLabel}>Campaign Notes</span>
                    <p className={styles.noteText}>{cs.note}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className={styles.disclaimer}>
          + 14 active campaigns currently scaling in closed distribution loops.
          We don't over-publish client rosters — we protect data integrity.
        </p>
      </div>
    </section>
  );
}
