import { useState } from 'react';
import { DataAddressRef } from '../components/DataAddressRef';
import { useAddressesList, useRegisterAddress, useRevokeAddress } from '../services/domains/addressing';
import { useTiersList } from '../services/domains/tiers';

const PII_HINT = /\b(ssn|email|phone|passport|dob)\b/i;

export function AddressingPage() {
  const list = useAddressesList();
  const register = useRegisterAddress();
  const revoke = useRevokeAddress();
  const tiers = useTiersList();
  const [ref, setRef] = useState('ds://plant-north/vibration#v3');
  const [owningTierId, setOwningTierId] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const items = list.data?.data?.items ?? [];
  const nodes = tiers.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Federated data addressing</p>
        <h1>Resolve by reference — never cleartext PII</h1>
        <p className="lead">
          Catalog opaque refs across tiers. No global subject directory (BR-5).
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Register address</h2>
        <div className="row">
          <label>
            Ref
            <input value={ref} onChange={(e) => setRef(e.target.value)} style={{ minWidth: 260 }} />
          </label>
          <label>
            Owning tier
            <select value={owningTierId} onChange={(e) => setOwningTierId(e.target.value)}>
              <option value="">Select…</option>
              {nodes.map((n: { id: string; role: string }) => (
                <option key={n.id} value={n.id}>
                  {n.role} · {n.id}
                </option>
              ))}
            </select>
          </label>
          <button
            className="btn"
            type="button"
            disabled={!owningTierId || register.isPending}
            onClick={() => {
              if (PII_HINT.test(ref)) {
                setErr('PII-pattern detected — registration blocked.');
                return;
              }
              setErr(null);
              register.mutate(
                { ref, owningTierId },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Register
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      {list.isError && <p className="error">{(list.error as Error).message}</p>}

      <div className="cards">
        {items.map(
          (a: {
            id: string;
            ref: string;
            owningTierId: string;
            status: string;
            grantedTierIds?: string[];
          }) => (
            <div key={a.id}>
              <DataAddressRef address={a} />
              {a.status === 'active' && (
                <button
                  className="btnSecondary"
                  type="button"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => revoke.mutate(a.id)}
                >
                  Revoke
                </button>
              )}
            </div>
          )
        )}
        {!items.length && <p className="muted">No addresses — register an opaque federated ref.</p>}
      </div>
    </div>
  );
}
