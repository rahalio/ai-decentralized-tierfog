import { NavLink, Outlet } from 'react-router-dom';
import styles from './AppShell.module.css';

const nav = [
  { to: '/', label: 'Tier map', end: true },
  { to: '/sites', label: 'Sites & capacity' },
  { to: '/domains', label: 'Protocol domains' },
  { to: '/jobs', label: 'In-place jobs' },
  { to: '/fl', label: 'FL eligibility' },
  { to: '/addressing', label: 'Data addressing' },
  { to: '/trust', label: 'Trust spheres' },
  { to: '/provenance', label: 'Provenance' },
  { to: '/quarantine', label: 'Quarantine' },
];

export function AppShell() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.fogMark} aria-hidden />
          <div>
            <div className={styles.wordmark}>Tierfog</div>
            <div className={styles.cue}>Intelligence in place — across every radio</div>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
