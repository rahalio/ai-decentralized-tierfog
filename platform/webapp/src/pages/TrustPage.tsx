import { useState } from 'react';
import { TrustSphereOverlay } from '../components/TrustSphereOverlay';
import { TierDagMap } from '../components/TierDagMap';
import { useCreateTrustSphere, useTrustSpheresList } from '../services/domains/trust';
import { useTiersList } from '../services/domains/tiers';

export function TrustPage() {
  const spheres = useTrustSpheresList();
  const create = useCreateTrustSphere();
  const tiers = useTiersList();
  const [name, setName] = useState('Plant OT sphere');
  const [memberTierId, setMemberTierId] = useState('');
  const [selected, setSelected] = useState<string | undefined>();
  const [err, setErr] = useState<string | null>(null);

  const items = spheres.data?.data?.items ?? [];
  const nodes = tiers.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Trust spheres</p>
        <h1>Authenticate before federated join</h1>
        <p className="lead">
          Sphere boundaries overlay the DAG. Unauthenticated tiers cannot schedule federated jobs
          (BR-4).
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Create sphere</h2>
        <div className="row">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Seed member tier
            <select value={memberTierId} onChange={(e) => setMemberTierId(e.target.value)}>
              <option value="">Optional</option>
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
            disabled={!name || create.isPending}
            onClick={() => {
              setErr(null);
              create.mutate(
                {
                  name,
                  memberTierIds: memberTierId ? [memberTierId] : undefined,
                },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Create
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      {spheres.isError && <p className="error">{(spheres.error as Error).message}</p>}

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Sphere overlay</h2>
        <TrustSphereOverlay spheres={items} highlightTierId={selected} />
      </section>

      <TierDagMap nodes={nodes} selectedId={selected} onSelect={setSelected} />
    </div>
  );
}
