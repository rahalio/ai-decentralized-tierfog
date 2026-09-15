type Sphere = {
  id: string;
  name: string;
  memberTierIds?: string[];
};

type Props = {
  spheres: Sphere[];
  highlightTierId?: string;
};

export function TrustSphereOverlay({ spheres, highlightTierId }: Props) {
  if (!spheres.length) {
    return <p className="muted">No trust spheres yet — authenticate nodes before federated join.</p>;
  }

  return (
    <div className="sphereOverlay" aria-label="Trust spheres">
      {spheres.map((s) => {
        const includes =
          highlightTierId && s.memberTierIds?.includes(highlightTierId);
        return (
          <span
            key={s.id}
            className="sphereChip"
            style={includes ? { borderStyle: 'solid', color: 'var(--color-mist)' } : undefined}
            title={s.memberTierIds?.join(', ') || s.id}
          >
            {s.name}
            {s.memberTierIds?.length ? ` · ${s.memberTierIds.length}` : ''}
          </span>
        );
      })}
    </div>
  );
}
