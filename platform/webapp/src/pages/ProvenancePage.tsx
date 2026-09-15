import { useState } from 'react';
import { ArtefactProvenancePath } from '../components/ArtefactProvenancePath';
import { useProvenanceList, useSealProvenance } from '../services/domains/provenance';
import { useTiersList } from '../services/domains/tiers';

export function ProvenancePage() {
  const list = useProvenanceList();
  const seal = useSealProvenance();
  const tiers = useTiersList();
  const [artefactHash, setArtefactHash] = useState('');
  const [tierId, setTierId] = useState('');
  const [jobId, setJobId] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const items = list.data?.data?.items ?? [];
  const nodes = tiers.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Artefact provenance</p>
        <h1>Which tier produced which artefact</h1>
        <p className="lead">
          Tier path + hash for audit accountability. Missing seal surfaces as coral integrity
          warning (BR-6).
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Seal provenance</h2>
        <div className="row">
          <label>
            Artefact hash
            <input
              value={artefactHash}
              onChange={(e) => setArtefactHash(e.target.value)}
              placeholder="sha256:…"
              style={{ minWidth: 220 }}
            />
          </label>
          <label>
            Producing tier
            <select value={tierId} onChange={(e) => setTierId(e.target.value)}>
              <option value="">Select…</option>
              {nodes.map((n: { id: string; role: string }) => (
                <option key={n.id} value={n.id}>
                  {n.role} · {n.id}
                </option>
              ))}
            </select>
          </label>
          <label>
            Job id
            <input value={jobId} onChange={(e) => setJobId(e.target.value)} placeholder="job_…" />
          </label>
          <button
            className="btn"
            type="button"
            disabled={!artefactHash || !tierId || seal.isPending}
            onClick={() => {
              setErr(null);
              seal.mutate(
                {
                  artefactHash,
                  tierId,
                  jobId: jobId || undefined,
                  tierPath: [tierId],
                },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Seal
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      <section className="panel">
        <h2>Artefacts</h2>
        {list.isError && <p className="error">{(list.error as Error).message}</p>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Job</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {items.map(
              (p: {
                id: string;
                jobId?: string;
                artefactHash: string;
                tierId: string;
                tierPath?: string[];
              }) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.jobId ?? '—'}</td>
                  <td>
                    <ArtefactProvenancePath
                      artefactHash={p.artefactHash}
                      tierId={p.tierId}
                      tierPath={p.tierPath}
                    />
                  </td>
                </tr>
              )
            )}
            {!items.length && (
              <tr>
                <td colSpan={3}>
                  <ArtefactProvenancePath missing />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
