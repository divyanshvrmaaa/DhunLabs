import { motion, useReducedMotion } from "framer-motion";
import styles from "./About.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  const reduceMotion = useReducedMotion();

  const fromLeft = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: -24 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, amount: 0.3 },
      };

  const fromRight = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <section id="about" className={styles.section}>
      <div className="section-wrap">
        <div className={styles.layout}>
          <motion.div
            className={styles.left}
            {...fromLeft}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="eyebrow">The Founder</span>
            <h1 className={`section-heading ${styles.title}`}>My Story</h1>

            <div className={styles.copy}>
              <p>
                DhunLabs was founded by Divyansh Verma, a mechanical engineer
                from Delhi Technological University who approached the music
                industry not as an entertainment space, but as a data
                problem.
              </p>
              <p>
                As a music producer, cinematographer, and independent artist
                himself, Divyansh spent years releasing music, navigating
                independent production pipelines, and building creative
                assets. But when it came to marketing, he realized the
                creative community was being systemically failed by generic
                agencies running baseline traffic campaigns or selling low
                intent stream packages.
              </p>
              <p>
                Leveraging his technical and analytical background, he broke
                down the actual backend engineering behind Spotify's
                recommendation engines. He started treating music promotion
                as a quantitative data pipeline — deploying custom Meta
                conversion ad stacks, isolating clean traffic nodes, and
                building proprietary, taste driven playlist networks to
                trigger platform popularity metrics.
              </p>
            </div>
          </motion.div>

          {/* Right — portrait */}
          <motion.div
            className={styles.right}
            {...fromRight}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <div className={styles.portraitFrame}>
              <span className={`${styles.corner} ${styles.cornerTL}`} />
              <span className={`${styles.corner} ${styles.cornerTR}`} />
              <span className={`${styles.corner} ${styles.cornerBL}`} />
              <span className={`${styles.corner} ${styles.cornerBR}`} />
              <img
                src="/artists/divyansh-portrait.jpg"
                alt="Divyansh Verma, founder of DhunLabs"
                className={styles.portrait}
              />
            </div>
            <p className={styles.caption}>
              Divyansh Verma — Founder, DhunLabs
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
