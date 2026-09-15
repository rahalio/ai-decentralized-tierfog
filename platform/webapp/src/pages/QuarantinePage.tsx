import { useState } from 'react';
import { QuarantineBranchControl } from '../components/QuarantineBranchControl';
import { TierDagMap } from '../components/TierDagMap';
import {
  useQuarantineList,
  useQuarantineTier,
  useReleaseQuarantine,
} from '../services/domains/trust';
import { useTiersList } from '../services/domains/tiers';

export function QuarantinePage() {
  const list = useQuarantineList();
  const quarantine = useQuarantineTier();
  const release = useReleaseQuarantine();
  const tiers = useTiersList();
  const [selected, setSelected] = useState<string | undefined>();
  const [reason, setReason] = useState('jammed / key-loss investigation');
  const [err, setErr] = useState<string | null>(null);

  const events = list.data?.data?.items ?? [];
  const nodes = tiers.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Quarantine</p>
        <h1>Isolate without collapsing the DAG</h1>
        <p className="lead">
          Dim jammed or impersonated tiers while parent branches keep running (BR-9).
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Select tier & reason</h2>
        <div className="row">
          <label>
            Reason
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ minWidth: 280 }}
            />
          </label>
        </div>
        {err && <p className="error">{err}</p>}
        {selected && (
          <p className="muted" style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            Target {selected}
          </p>
        )}
      </section>

      <TierDagMap nodes={nodes} selectedId={selected} onSelect={setSelected} />

      <div style={{ marginTop: '1rem' }}>
        <QuarantineBranchControl
          events={events}
          busy={quarantine.isPending || release.isPending}
          onQuarantine={() => {
            if (!selected) {
              setErr('Select a tier on the DAG first.');
              return;
            }
            setErr(null);
            quarantine.mutate(
              { tierId: selected, reason, continueParentDag: true },
              { onError: (e: Error) => setErr(e.message) }
            );
          }}
          onRelease={(eventId) => release.mutate(eventId)}
        />
      </div>
    </div>
  );
}
