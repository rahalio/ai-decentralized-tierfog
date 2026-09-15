type Props = {
  domain: {
    id: string;
    protocolFamily: string;
    tierId: string;
    status: string;
    gatewayConfigVersion?: string;
    isolationChannelClass?: string;
  };
  onPushUpdate?: (domainId: string, configVersion: string) => void;
  busy?: boolean;
};

export function ProtocolDomainCard({ domain, onPushUpdate, busy }: Props) {
  const statusClass =
    domain.status === 'healthy' ? 'ok' : domain.status === 'failed' ? 'bad' : 'warn';

  return (
    <article className="panel">
      <h2>{domain.protocolFamily.replace(/_/g, ' ')}</h2>
      <p className="muted" style={{ marginTop: 0 }}>
        Tier <span className="id">{domain.tierId}</span>
      </p>
      <div className="row" style={{ marginBottom: '0.75rem' }}>
        <span className={`badge ${statusClass === 'ok' ? 'mist' : statusClass === 'bad' ? 'coral' : 'amber'}`}>
          {domain.status}
        </span>
        {domain.isolationChannelClass && (
          <span className="badge">{domain.isolationChannelClass.replace(/_/g, ' ')}</span>
        )}
        {domain.gatewayConfigVersion && (
          <span className="badge mist">gw {domain.gatewayConfigVersion}</span>
        )}
      </div>
      {onPushUpdate && (
        <button
          className="btnSecondary"
          type="button"
          disabled={busy}
          onClick={() =>
            onPushUpdate(domain.id, `gw-${Date.now().toString(36).slice(-6)}`)
          }
        >
          Push gateway update
        </button>
      )}
    </article>
  );
}
