type Props = {
  artefactHash?: string;
  tierPath?: string[];
  tierId?: string;
  missing?: boolean;
};

export function ArtefactProvenancePath({
  artefactHash,
  tierPath,
  tierId,
  missing,
}: Props) {
  if (missing || !artefactHash) {
    return (
      <p className="error" role="alert">
        Missing provenance — integrity warning.
      </p>
    );
  }

  const path = tierPath?.length ? tierPath : tierId ? [tierId] : [];

  return (
    <div>
      <div className="path" aria-label="Tier provenance path">
        {path.map((hop, i) => (
          <span key={`${hop}-${i}`}>
            {i > 0 && <span className="sep">→</span>}
            <span>{hop}</span>
          </span>
        ))}
      </div>
      <p className="muted" style={{ margin: '0.35rem 0 0', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
        hash {artefactHash}
      </p>
    </div>
  );
}
