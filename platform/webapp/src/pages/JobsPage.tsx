import { useState } from 'react';
import { InPlacePlacementBadge } from '../components/InPlacePlacementBadge';
import { useJobsList, usePauseJob, useScheduleJob } from '../services/domains/jobs';

export function JobsPage() {
  const jobs = useJobsList();
  const schedule = useScheduleJob();
  const pause = usePauseJob();
  const [preferredMaxTierRole, setPreferredMaxTierRole] = useState('fog');
  const [siteId, setSiteId] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const items = jobs.data?.data?.items ?? [];
  const avoided = items.reduce(
    (sum: number, j: { backhaulBytesAvoided?: number }) => sum + (j.backhaulBytesAvoided ?? 0),
    0
  );

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">In-place analytics</p>
        <h1>Lowest eligible tier by default</h1>
        <p className="lead">
          Schedule jobs where policy allows; measure backhaul avoided; override only with audit
          reason (BR-3).
        </p>
      </header>

      <div className="strip">
        <div className="stat">
          <strong>{items.length}</strong>
          <span>Jobs</span>
        </div>
        <div className="stat">
          <strong className="ok">{(avoided / 1024 ** 2).toFixed(1)} MB</strong>
          <span>Backhaul avoided</span>
        </div>
      </div>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Schedule job</h2>
        <div className="row">
          <label>
            Preferred max tier
            <select
              value={preferredMaxTierRole}
              onChange={(e) => setPreferredMaxTierRole(e.target.value)}
            >
              <option value="device">device</option>
              <option value="fog">fog</option>
              <option value="edge">edge</option>
              <option value="cloud">cloud</option>
            </select>
          </label>
          <label>
            Site (optional)
            <input value={siteId} onChange={(e) => setSiteId(e.target.value)} placeholder="sit_…" />
          </label>
          <button
            className="btn"
            type="button"
            disabled={schedule.isPending}
            onClick={() => {
              setErr(null);
              schedule.mutate(
                {
                  preferredMaxTierRole,
                  siteId: siteId || undefined,
                },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Schedule
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      <section className="panel">
        <h2>Jobs</h2>
        {jobs.isError && <p className="error">{(jobs.error as Error).message}</p>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Placement</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(
              (j: {
                id: string;
                status: string;
                executionTierId: string;
                inPlace: boolean;
                backhaulBytesAvoided?: number;
              }) => (
                <tr key={j.id}>
                  <td>{j.id}</td>
                  <td className={j.status === 'failed' ? 'bad' : j.status === 'paused' ? 'warn' : 'ok'}>
                    {j.status}
                  </td>
                  <td>
                    <InPlacePlacementBadge
                      executionTierId={j.executionTierId}
                      inPlace={j.inPlace}
                      backhaulBytesAvoided={j.backhaulBytesAvoided}
                    />
                  </td>
                  <td>
                    {j.status !== 'paused' && j.status !== 'completed' && (
                      <button
                        className="btnSecondary"
                        type="button"
                        onClick={() => pause.mutate(j.id)}
                      >
                        Pause
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
            {!items.length && (
              <tr>
                <td colSpan={4}>No jobs — schedule analytics at the lowest eligible tier.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
