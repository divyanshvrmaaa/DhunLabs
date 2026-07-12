import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PLAYLISTS } from "../../data/content";
import { Button } from "../ui/Button";
import { useInView } from "../../hooks/useInView";
import styles from "./Network.module.css";

export function Network() {
  const { ref, inView } = useInView();

  return (
    <section id="network" className={styles.section} ref={ref}>
      <div className="section-wrap">
        <div className={styles.layout}>
          {/* Left — copy */}
          <div className={styles.left}>
            <span className="eyebrow">Spotify Playlisting</span>
            <h2 className={`section-heading ${styles.title}`}>
              Built on Taste,<br />Not Volume.
            </h2>
            <p className={styles.sub}>
              DhunLabs operates closed, high-intent listener ecosystems across
              targeted mood profiles and regional scenes. No botted lists.
              No dead streams. Just real ears on your music.
            </p>
            <div className={styles.stat}>
              <span className={styles.statNum}>1:1</span>
              <span className={styles.statLabel}>
                Playlist save-to-listener ratio — the signal that tells
                algorithms your track belongs in recommendations.
              </span>
            </div>
            <Button href="/playlists" variant="primary">
              Explore Playlists <ArrowRight size={15} />
            </Button>
          </div>

          {/* Right — playlist cards */}
          <div className={styles.right}>
            {PLAYLISTS.map((pl, i) => (
              <motion.a
  key={i}
  href={pl.placeholder ? undefined : pl.link}
  target="_blank"
  rel="noopener noreferrer"
  className={`${styles.plCard} ${pl.placeholder ? styles.placeholder : ""}`}
  initial={{ opacity: 0, x: 30 }}
  animate={inView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
>
                <div className={styles.plIcon}>{pl.icon}</div>
                <div>
                  <p className={styles.plName}>{pl.name}</p>
                  <p className={styles.plMood}>{pl.mood}</p>
                </div>
                {!pl.placeholder && (
                  <div className={styles.plBadge}>Active</div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
