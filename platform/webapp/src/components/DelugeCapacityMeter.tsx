export const DELUGE_TEMPLATES: Record<string, { gbPerDay: number; label: string }> = {
  hospital: { gbPerDay: 480, label: 'Hospital / clinical OT' },
  factory: { gbPerDay: 320, label: 'Factory floor' },
  vehicle: { gbPerDay: 45, label: 'Vehicle / mobile edge' },
  building: { gbPerDay: 120, label: 'Smart building' },
  other: { gbPerDay: 0, label: 'Custom estimate' },
};

type Props = {
  siteClass: string;
  estimatedGbPerDay?: number;
  backhaulBytesAvoided?: number;
};

export function DelugeCapacityMeter({
  siteClass,
  estimatedGbPerDay,
  backhaulBytesAvoided,
}: Props) {
  const tmpl = DELUGE_TEMPLATES[siteClass] ?? DELUGE_TEMPLATES.other;
  const gb = estimatedGbPerDay ?? tmpl.gbPerDay;
  const warn = siteClass === 'other' || gb <= 0;
  const pct = Math.min(100, Math.round((gb / 500) * 100));

  return (
    <div>
      <div className="row" style={{ marginBottom: '0.35rem', justifyContent: 'space-between' }}>
        <span className="muted">{tmpl.label}</span>
        <strong style={{ fontFamily: 'var(--font-mono)' }}>
          {warn ? 'custom' : `${gb} GB/day`}
        </strong>
      </div>
      <div className={`meter ${warn ? 'warn' : ''}`} aria-label="Deluge capacity">
        <span style={{ width: `${warn ? 15 : pct}%` }} />
      </div>
      {warn && (
        <p className="warn" style={{ margin: '0.35rem 0 0', fontSize: '0.8rem' }}>
          Unknown class — provide a custom GB/day estimate.
        </p>
      )}
      {backhaulBytesAvoided != null && backhaulBytesAvoided > 0 && (
        <p className="ok" style={{ margin: '0.35rem 0 0', fontSize: '0.8rem' }}>
          Backhaul avoided: {(backhaulBytesAvoided / 1024 ** 3).toFixed(2)} GB
        </p>
      )}
    </div>
  );
}
