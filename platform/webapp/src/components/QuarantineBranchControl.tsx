type EventLike = {
  id: string;
  tierId: string;
  reason: string;
  active: boolean;
  continueParentDag?: boolean;
};

type Props = {
  events: EventLike[];
  onQuarantine?: () => void;
  onRelease?: (eventId: string) => void;
  busy?: boolean;
};

/** Isolate a branch without collapsing the parent DAG. */
export function QuarantineBranchControl({
  events,
  onQuarantine,
  onRelease,
  busy,
}: Props) {
  const active = events.filter((e) => e.active);

  return (
    <div className="panel">
      <h2>Quarantine branch</h2>
      <p className="lead" style={{ marginBottom: '0.85rem' }}>
        Dim a jammed or key-loss tier while the parent DAG continues.
      </p>
      {onQuarantine && (
        <button className="btnDanger" type="button" disabled={busy} onClick={onQuarantine}>
          Quarantine selected tier
        </button>
      )}
      {!active.length ? (
        <p className="ok" style={{ marginTop: '1rem' }} aria-live="polite">
          Fabric healthy — no active quarantine.
        </p>
      ) : (
        <table className="table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Event</th>
              <th>Tier</th>
              <th>Reason</th>
              <th>Parent DAG</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {active.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td className="bad">{e.tierId}</td>
                <td>{e.reason}</td>
                <td className="ok">{e.continueParentDag !== false ? 'continues' : 'halted'}</td>
                <td>
                  {onRelease && (
                    <button
                      className="btnSecondary"
                      type="button"
                      disabled={busy}
                      onClick={() => onRelease(e.id)}
                    >
                      Release
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
