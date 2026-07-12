import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { SITE } from "../../data/content";
import { Button } from "../ui/Button";
import { useInView } from "../../hooks/useInView";
import styles from "./Contact.module.css";

const IGIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0"/>
  </svg>
);
const YTIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

const SOCIALS = [
  { label: "Email",     href: `mailto:${SITE.email}`,     icon: <Mail size={18} />,   value: SITE.email },
  { label: "Instagram", href: SITE.instagram, target: "_blank", icon: <IGIcon />,     value: "@dhunlabs" },
  { label: "YouTube",   href: SITE.youtube,   target: "_blank", icon: <YTIcon />,     value: "@dhunlabsnetwork" },
];

export function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className={styles.section}>
      <div className="section-wrap">
        <motion.div
          className={styles.banner}
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* BG blobs */}
          <div className={styles.blob1} />
          <div className={styles.blob2} />

          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Start Growing
          </span>

          <h2 className={`section-heading ${styles.title}`}>
            Ready to Build Your<br />Growth Engine?
          </h2>

          <p className={styles.sub}>
            We don't sell vanity metrics, fake playlist slots, or empty promises.
            DhunLabs builds dedicated growth infrastructure designed to force
            platform recommendation engines to work for your music.
          </p>

          <div className={styles.actions}>
            <Button href={SITE.formLink} target="_blank" variant="primary">
              Book a Strategy Audit <ArrowRight size={16} />
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="secondary">
              Send an Email
            </Button>
          </div>

          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.target}
                className={styles.socialLink}
                rel="noopener noreferrer"
              >
                <span className={styles.socialIcon}>{s.icon}</span>
                <div>
                  <p className={styles.socialLabel}>{s.label}</p>
                  <p className={styles.socialValue}>{s.value}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
