import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PLAYLISTS, SITE } from "../../data/content";
import { Button } from "../ui/Button";
import styles from "./Playlists.module.css";

export function Playlists() {
  return (
    <section className={styles.section}>
      <div className="section-wrap">
        {/* Hero */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">DhunLabs Playlist Network</span>

          <h1 className={styles.title}>
            Explore Our
            <br />
            <span className={styles.green}>Spotify Playlists.</span>
          </h1>

          <p className={styles.sub}>
            Every playlist is carefully curated around a specific mood and
            audience. Discover new music, find your vibe, and if your track
            belongs here, submit it for review.
          </p>
        </motion.div>

        {/* Playlist Grid */}
        <div className={styles.grid}>
          {PLAYLISTS.map((playlist, index) => (
            <motion.a
              key={playlist.name}
              href={playlist.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${
                playlist.placeholder ? styles.placeholder : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <div className={styles.icon}>{playlist.icon}</div>

              <h3>{playlist.name}</h3>

              <p>{playlist.mood}</p>

              {!playlist.placeholder && (
                <div className={styles.spotify}>
                  Explore Playlist
                  <ExternalLink size={18} />
                </div>
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Want Your Music Here?</h2>

          <p>
            Submit your track and our team will personally review it for playlist
            consideration.
          </p>

          <Button
            href={SITE.playlistformLink}
            target="_blank"
            variant="primary"
          >
            Submit Your Track
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}