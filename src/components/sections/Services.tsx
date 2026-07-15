import { motion } from "framer-motion";
import { PILLARS } from "../../data/content";
import { useInView } from "../../hooks/useInView";
import styles from "./Services.module.css";

const ACCENT_MAP = {
  coral: { color: "#1877F2", glow: "rgba(24,119,242,0.4)", soft: "rgba(24,119,242,0.06)" }, // Meta Blue
  violet: { color: "#1DB954", glow: "rgba(29,185,84,0.4)",  soft: "rgba(29,185,84,0.06)" },  // Spotify Green
  gold:  { color: "#FF0000", glow: "rgba(255,0,0,0.4)",     soft: "rgba(255,0,0,0.06)" },     // YouTube Red
};

export function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className={styles.section} ref={ref}>
      <div className="section-wrap">
        <div className={styles.header}>
          <span className="eyebrow">What We Do</span>
         <motion.h2
  className={`section-heading ${styles.title}`}
  initial={{ opacity: 0, y: 50, scale: 0.95 }}
  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
  transition={{
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  }}
>
 Three <span className={styles.highlight}>Pillars.</span><br />
One <span className={styles.highlight}>Growth Engine.</span>
</motion.h2>
          <p className={styles.sub}>
            Every tool DhunLabs deploys feeds the same objective — making platforms
            recommend your music to the right listeners, organically and at scale.
          </p>
        </div>

        <div className={styles.grid}>
          {PILLARS.map((p, i) => {
            const accent = ACCENT_MAP[p.accent];
            const hasLink = !!p.link;
            const CardComponent = hasLink ? motion.a : motion.div;

            return (
              <CardComponent
                key={p.id}
                className={`${styles.card} ${hasLink ? styles.cardLink : ""}`}
                href={p.link}
                target={hasLink ? "_blank" : undefined}
                rel={hasLink ? "noopener noreferrer" : undefined}
                style={{ "--accent-color": accent.color, "--accent-glow": accent.glow, "--accent-soft": accent.soft } as React.CSSProperties}
                initial={{ opacity: 0, y: 48 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardNum}>{p.number}</span>
                  <div className={styles.cardIcon}>{p.icon}</div>
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardSub}>{p.subtitle}</p>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.metric}>
                 <span className={styles.metricValue}>{p.metric}</span>
                 <span className={styles.metricLabel}>{p.metricLabel}</span>
                </div>
                <div className={styles.cardBar} />
              </CardComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
