type Props = {
  executionTierId: string;
  inPlace: boolean;
  backhaulBytesAvoided?: number;
};

export function InPlacePlacementBadge({
  executionTierId,
  inPlace,
  backhaulBytesAvoided,
}: Props) {
  if (inPlace) {
    return (
      <span className="badge mist" title={`Executed at ${executionTierId}`}>
        in-place @ {executionTierId}
        {backhaulBytesAvoided != null && ` · avoided ${formatBytes(backhaulBytesAvoided)}`}
      </span>
    );
  }
  return (
    <span className="badge amber" title="Work left the local tier">
      backhaul leak @ {executionTierId}
    </span>
  );
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
  return `${(n / 1024 ** 3).toFixed(2)} GB`;
}
