import { useState } from 'react';
import { ProtocolDomainCard } from '../components/ProtocolDomainCard';
import {
  useOnboardDomain,
  useProtocolDomainsList,
  usePushGatewayConfig,
} from '../services/domains/protocol';
import { useTiersList } from '../services/domains/tiers';

export function DomainsPage() {
  const domains = useProtocolDomainsList();
  const tiers = useTiersList();
  const onboard = useOnboardDomain();
  const push = usePushGatewayConfig();
  const [protocolFamily, setProtocolFamily] = useState('mqtt_coap');
  const [tierId, setTierId] = useState('');
  const [channel, setChannel] = useState('low_power_mesh');
  const [err, setErr] = useState<string | null>(null);

  const items = domains.data?.data?.items ?? [];
  const nodes = tiers.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Protocol domains</p>
        <h1>Software gateway onboarding</h1>
        <p className="lead">
          Attach MQTT/CoAP, 6loWPAN/RPL, BT mesh via config — not a new hardware SKU forever (BR-1,
          BR-8).
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Onboard domain</h2>
        <div className="row">
          <label>
            Protocol
            <select value={protocolFamily} onChange={(e) => setProtocolFamily(e.target.value)}>
              <option value="mqtt_coap">mqtt / coap</option>
              <option value="rpl_6lowpan">rpl / 6lowpan</option>
              <option value="bt_mesh">bt mesh</option>
              <option value="v2x">v2x</option>
              <option value="http_rich">http rich</option>
              <option value="other">other</option>
            </select>
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
            Isolation channel
            <select value={channel} onChange={(e) => setChannel(e.target.value)}>
              <option value="low_power_mesh">low power mesh</option>
              <option value="high_throughput">high throughput</option>
            </select>
          </label>
          <button
            className="btn"
            type="button"
            disabled={!tierId || onboard.isPending}
            onClick={() => {
              setErr(null);
              onboard.mutate(
                {
                  protocolFamily,
                  tierId,
                  isolationChannelClass: channel,
                  gatewayConfigVersion: 'gw-init',
                },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Onboard
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      {domains.isError && <p className="error">{(domains.error as Error).message}</p>}

      <div className="cards">
        {items.map(
          (d: {
            id: string;
            protocolFamily: string;
            tierId: string;
            status: string;
            gatewayConfigVersion?: string;
            isolationChannelClass?: string;
          }) => (
            <ProtocolDomainCard
              key={d.id}
              domain={d}
              busy={push.isPending}
              onPushUpdate={(domainId, configVersion) => {
                setErr(null);
                push.mutate(
                  { domainId, configVersion, rolloutRing: 'canary' },
                  { onError: (e: Error) => setErr(e.message) }
                );
              }}
            />
          )
        )}
        {!items.length && (
          <p className="muted">Empty — pick a protocol template and attach to a tier.</p>
        )}
      </div>
    </div>
  );
}
