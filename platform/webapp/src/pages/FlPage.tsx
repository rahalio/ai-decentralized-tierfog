import { useState } from 'react';
import { FlHealthGate } from '../components/FlHealthGate';
import {
  useEvaluateFlEligibility,
  useFlEligibilityList,
  useWaiveFlHealthGate,
} from '../services/domains/fl';
import { useTiersList } from '../services/domains/tiers';

export function FlPage() {
  const list = useFlEligibilityList();
  const evaluate = useEvaluateFlEligibility();
  const waive = useWaiveFlHealthGate();
  const tiers = useTiersList();
  const [roundId, setRoundId] = useState('round-1');
  const [tierId, setTierId] = useState('');
  const [healthScore, setHealthScore] = useState(0.85);
  const [waiverNote, setWaiverNote] = useState('OT accepted mesh risk');
  const [err, setErr] = useState<string | null>(null);

  const items = list.data?.data?.items ?? [];
  const nodes = tiers.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">FL eligibility</p>
        <h1>Health-gated rounds — never silent assume</h1>
        <p className="lead">
          Publish participation from network health, not only model config. Unhealthy defaults to
          deny (BR-10).
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Evaluate eligibility</h2>
        <div className="row">
          <label>
            Round id
            <input value={roundId} onChange={(e) => setRoundId(e.target.value)} />
          </label>
          <label>
            Tier
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
            Health score
            <input
              type="number"
              step="0.01"
              min={0}
              max={1}
              value={healthScore}
              onChange={(e) => setHealthScore(Number(e.target.value))}
            />
          </label>
          <button
            className="btn"
            type="button"
            disabled={!tierId || evaluate.isPending}
            onClick={() => {
              setErr(null);
              evaluate.mutate(
                { roundId, tierId, healthScore },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Evaluate
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      <section className="panel">
        <h2>Round eligibility</h2>
        {list.isError && <p className="error">{(list.error as Error).message}</p>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Round</th>
              <th>Tier</th>
              <th>Gate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(
              (e: {
                id: string;
                roundId: string;
                tierId: string;
                status: string;
                healthScore?: number;
                denyReason?: string;
                waiverNote?: string;
              }) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.roundId}</td>
                  <td>{e.tierId}</td>
                  <td>
                    <FlHealthGate
                      status={e.status}
                      healthScore={e.healthScore}
                      denyReason={e.denyReason}
                      waiverNote={e.waiverNote}
                    />
                  </td>
                  <td>
                    {e.status === 'denied' && (
                      <div className="row">
                        <input
                          value={waiverNote}
                          onChange={(ev) => setWaiverNote(ev.target.value)}
                          placeholder="Risk note"
                        />
                        <button
                          className="btnSecondary"
                          type="button"
                          onClick={() =>
                            waive.mutate({ eligibilityId: e.id, waiverNote })
                          }
                        >
                          Waive
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            )}
            {!items.length && (
              <tr>
                <td colSpan={5}>No eligibility records — evaluate a round against a tier.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
