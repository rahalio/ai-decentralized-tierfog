import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TierDagMap } from '../components/TierDagMap';
import { useSitesList } from '../services/domains/sites';
import { useRegisterTier, useTiersList } from '../services/domains/tiers';
import { useQuarantineList } from '../services/domains/trust';

export function TierMapPage() {
  const sites = useSitesList();
  const tiers = useTiersList();
  const quarantine = useQuarantineList();
  const registerTier = useRegisterTier();
  const [siteId, setSiteId] = useState('');
  const [role, setRole] = useState('fog');
  const [parentTierId, setParentTierId] = useState('');
  const [selected, setSelected] = useState<string | undefined>();
  const [err, setErr] = useState<string | null>(null);

  const siteItems = sites.data?.data?.items ?? [];
  const nodes = tiers.data?.data?.items ?? [];
  const activeQ = (quarantine.data?.data?.items ?? []).filter((e: { active: boolean }) => e.active)
    .length;

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Tier map home</p>
        <h1>Cascaded edges — device → fog → edge → cloud</h1>
        <p className="lead">
          Select a tier to attach domains or quarantine a branch without collapsing the parent DAG.
        </p>
      </header>

      <div className="strip">
        <div className="stat">
          <strong>{siteItems.length}</strong>
          <span>Sites</span>
        </div>
        <div className="stat">
          <strong className="ok">{nodes.length}</strong>
          <span>Tier nodes</span>
        </div>
        <div className="stat">
          <strong className="bad">{activeQ}</strong>
          <span>Quarantined branches</span>
        </div>
      </div>

      <div className="row" style={{ marginBottom: '1rem' }}>
        <Link className="btnSecondary" to="/sites">
          Register site
        </Link>
        <Link className="btnSecondary" to="/domains">
          Attach domain
        </Link>
        <Link className="btnSecondary" to="/quarantine">
          Quarantine controls
        </Link>
      </div>

      {tiers.isError && <p className="error">{(tiers.error as Error).message}</p>}

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Register tier node</h2>
        <div className="row">
          <label>
            Site
            <select value={siteId} onChange={(e) => setSiteId(e.target.value)}>
              <option value="">Select…</option>
              {siteItems.map((s: { id: string; name: string }) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.id})
                </option>
              ))}
            </select>
          </label>
          <label>
            Role
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="device">device</option>
              <option value="fog">fog</option>
              <option value="edge">edge</option>
              <option value="cloud">cloud</option>
            </select>
          </label>
          <label>
            Parent tier
            <select value={parentTierId} onChange={(e) => setParentTierId(e.target.value)}>
              <option value="">None</option>
              {nodes.map((n: { id: string; role: string }) => (
                <option key={n.id} value={n.id}>
                  {n.role} · {n.id}
                </option>
              ))}
            </select>
          </label>
          <button
            className="btn"
            type="button"
            disabled={!siteId || registerTier.isPending}
            onClick={() => {
              setErr(null);
              registerTier.mutate(
                {
                  siteId,
                  role,
                  parentTierId: parentTierId || undefined,
                },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Add tier
          </button>
        </div>
        {err && <p className="error">{err}</p>}
        {!siteItems.length && (
          <p className="muted" style={{ marginTop: '0.75rem' }}>
            Empty fabric — register a site first.
          </p>
        )}
      </section>

      <TierDagMap
        nodes={nodes}
        selectedId={selected}
        onSelect={setSelected}
        loading={tiers.isLoading}
      />
      {selected && (
        <p className="muted" style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          Selected {selected}
        </p>
      )}
    </div>
  );
}
