export type TierNodeLike = {
  id: string;
  role: string;
  status?: string;
  healthScore?: number;
  parentTierId?: string;
  siteId?: string;
};

const ROLE_ORDER = ['device', 'fog', 'edge', 'cloud'] as const;

type Props = {
  nodes: TierNodeLike[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  loading?: boolean;
};

export function TierDagMap({ nodes, selectedId, onSelect, loading }: Props) {
  if (loading) {
    return (
      <div className="dag" aria-busy="true">
        <p className="muted">Loading tier DAG…</p>
      </div>
    );
  }

  if (!nodes.length) {
    return (
      <div className="dag">
        <p className="muted">No tiers yet — register a site, then attach device → fog → edge → cloud.</p>
      </div>
    );
  }

  return (
    <div className="dag" role="tree" aria-label="Tier DAG">
      {ROLE_ORDER.map((role) => {
        const lane = nodes.filter((n) => n.role === role);
        if (!lane.length) return null;
        return (
          <div key={role} className="dagLane">
            <div className="dagLaneLabel">{role}</div>
            {lane.map((n) => {
              const quarantined = n.status === 'quarantined';
              const healthy = !quarantined && (n.healthScore == null || n.healthScore >= 0.7);
              return (
                <button
                  key={n.id}
                  type="button"
                  role="treeitem"
                  className={`dagNode ${quarantined ? 'quarantined' : healthy ? 'healthy' : ''}`}
                  aria-selected={selectedId === n.id}
                  onClick={() => onSelect?.(n.id)}
                >
                  <div className="role">{n.role}</div>
                  <div className="id">{n.id}</div>
                  {quarantined && (
                    <span className="badge coral" aria-live="polite">
                      Quarantined
                    </span>
                  )}
                  {!quarantined && n.healthScore != null && (
                    <span className={`badge ${healthy ? 'mist' : 'amber'}`}>
                      health {(n.healthScore * 100).toFixed(0)}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
