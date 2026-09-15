type Props = {
  status: string;
  healthScore?: number;
  denyReason?: string;
  waiverNote?: string;
};

export function FlHealthGate({ status, healthScore, denyReason, waiverNote }: Props) {
  const tone =
    status === 'eligible' ? 'mist' : status === 'waived' ? 'amber' : 'coral';

  return (
    <div className={`badge ${tone}`} role="status" aria-live="polite">
      <strong>health gate:</strong> {status}
      {healthScore != null && ` · ${(healthScore * 100).toFixed(0)}%`}
      {denyReason && ` · deny: ${denyReason.replace(/_/g, ' ')}`}
      {waiverNote && ` · waiver: ${waiverNote}`}
    </div>
  );
}
