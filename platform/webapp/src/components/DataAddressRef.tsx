type Props = {
  address: {
    id: string;
    ref: string;
    owningTierId: string;
    status: string;
    grantedTierIds?: string[];
  };
};

/** Federated ref display — never expands cleartext PII. */
export function DataAddressRef({ address }: Props) {
  return (
    <div className="panel" style={{ padding: '0.75rem 0.9rem' }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="badge mist">{address.ref}</span>
        <span className={`badge ${address.status === 'active' ? 'mist' : 'coral'}`}>
          {address.status}
        </span>
      </div>
      <p className="muted" style={{ margin: '0.5rem 0 0', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
        owner {address.owningTierId}
        {address.grantedTierIds?.length
          ? ` · grants ${address.grantedTierIds.length}`
          : ''}
      </p>
    </div>
  );
}
