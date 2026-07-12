import { SITE } from "../../data/content";
import styles from "./Footer.module.css";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Network", href: "#network" },
  { label: "Learn", href: "#learn" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <a href="#" className={styles.logo}>Dhun<span>Labs</span></a>
          <p className={styles.copy}>
            Music Growth Engine · Delhi, India<br />
            © {new Date().getFullYear()} DhunLabs. All rights reserved.
          </p>
        </div>

        <nav className={styles.nav}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.navLink}>{l.label}</a>
          ))}
        </nav>

        <div className={styles.right}>
          <a href={SITE.instagram} target="_blank" rel="noopener" className={styles.socialBtn} aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
            </svg>
          </a>
          <a href={SITE.youtube} target="_blank" rel="noopener" className={styles.socialBtn} aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
          </a>
          <a href={`mailto:${SITE.email}`} className={styles.socialBtn} aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
