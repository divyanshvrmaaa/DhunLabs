import { useEffect, useState } from "react"; // Added this
import { motion, animate } from "framer-motion"; // Added 'animate'
import { ArrowRight } from "lucide-react";
import { SITE } from "../../data/content";
import { Button } from "../ui/Button";
import { useScrolled } from "../../hooks/useScrolled";
import styles from "./Hero.module.css";

function AnimatedCounter({ value, suffix, trigger }: { value: number; suffix?: React.ReactNode; trigger: boolean }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;

    // Animate from 0 to the target 'value'
    const controls = animate(0, value, {
      duration: 2, // Takes 2 seconds
      ease: "easeOut", // Starts fast, slows down at the end
      onUpdate: (latest) => {
        // Intl.NumberFormat naturally converts 1000000 to "1M" and 1000 to "1K"
        const formatted = Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 0,
        }).format(Math.round(latest));
        setDisplay(formatted);
      },
    });

    return controls.stop;
  }, [value, trigger]);

  return (
    <span className={styles.proofNum}>
      {display}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export function Hero() {
  const scrolled = useScrolled(20);

  return (
    <section className={styles.hero}>
      {/* Ambient blobs */}
      <div className={styles.blobCoral} />
      <div className={styles.blobViolet} />
      <div className={styles.grid} />

      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className={styles.eyebrow}>
          <span className={styles.pulse} />
          Delhi, India · Music Growth Agency
        </motion.div>

        <motion.h1 variants={item} className={`display-heading ${styles.heading}`}>
  We Make<br />
  <span className={styles.outline}>Streams</span><br />
  <span className={styles.noWrap}>Hit Different.</span>
</motion.h1>

        <motion.p variants={item} className={styles.sub}>
          DhunLabs maps platform data, listener behavior, and targeted ads into
          precision growth systems. No vanity metrics. No ghost listeners.
          Just your music reaching the right people at scale.
        </motion.p>

        <motion.div variants={item} className={styles.actions}>
          <Button href={SITE.formLink} target="_blank" variant="primary">
            Book a Strategy Audit <ArrowRight size={16} />
          </Button>
          <Button href="#work" variant="secondary">
            See Case Studies
          </Button>
        </motion.div>

        <motion.div variants={item} className={styles.proof}>
          <div className={styles.proofItem}>
            <AnimatedCounter value={135} suffix="×" trigger={scrolled} />
            <span className={styles.proofLabel}>Peak listener lift</span>
          </div>
          
          <div className={styles.proofDivider} />
          
          <div className={styles.proofItem}>
            {/* Pass 1000000 so it actually counts up fast before formatting to "1M" */}
            <AnimatedCounter value={1000000} suffix="+" trigger={scrolled} />
            <span className={styles.proofLabel}>Streams managed</span>
          </div>
          
          <div className={styles.proofDivider} />
          
          <div className={styles.proofItem}>
            <AnimatedCounter value={27} suffix="×" trigger={scrolled} />
            <span className={styles.proofLabel}>Popularity index growth</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        className={styles.badge}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6, ease: "easeOut" as const }}
      >
        <span className={styles.badgeDot} />
        <span>14 active campaigns</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
