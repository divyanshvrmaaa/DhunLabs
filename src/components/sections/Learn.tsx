import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { VIDEOS, SITE } from "../../data/content";
import { Button } from "../ui/Button";
import { useInView } from "../../hooks/useInView";
import styles from "./Learn.module.css";

export function Learn() {
  const { ref, inView } = useInView();

  return (
    <section id="learn" className={styles.section} ref={ref}>
      <div className="section-wrap">
        <div className={styles.header}>
          <span className="eyebrow">Free Education</span>
          <h2 className={`section-heading ${styles.title}`}>
            Learn Our Systems.<br />For Free.
          </h2>
          <p className={styles.sub}>
            Every strategy we run for clients is documented publicly on our
            channel. Campaign breakdowns, Spotify algorithm deep-dives, Meta ad
            frameworks — no fluff, just data.
          </p>
        </div>

        <div className={styles.grid}>
          {VIDEOS.map((v, i) => (
            <motion.a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoCard}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.thumb}>
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/sddefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
                  }}
                />
                <div className={styles.playBtn}>
                  <div className={styles.playTriangle} />
                </div>
                <div className={styles.thumbOverlay} />
              </div>
              <div className={styles.videoInfo}>
                <span className={styles.videoTag}>{v.tag}</span>
                <h3 className={styles.videoTitle}>{v.title}</h3>
                <p className={styles.videoDesc}>{v.desc}</p>
                <span className={styles.watchLink}>
                  Watch on YouTube <ExternalLink size={12} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className={styles.channelCta}>
          <div className={styles.channelInfo}>
            <div className={styles.ytIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </div>
            <div>
              <p className={styles.channelName}>@DhunLabsNetwork</p>
              <p className={styles.channelSub}>Free music marketing education</p>
            </div>
          </div>
          <Button href={SITE.youtube} target="_blank" variant="secondary">
            Visit Channel →
          </Button>
        </div>
      </div>
    </section>
  );
}
