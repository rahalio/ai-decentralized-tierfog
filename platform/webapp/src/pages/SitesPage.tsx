import { useState } from 'react';
import { DelugeCapacityMeter, DELUGE_TEMPLATES } from '../components/DelugeCapacityMeter';
import { useRegisterSite, useSitesList } from '../services/domains/sites';

export function SitesPage() {
  const sites = useSitesList();
  const register = useRegisterSite();
  const [name, setName] = useState('Plant North');
  const [siteClass, setSiteClass] = useState('factory');
  const [gb, setGb] = useState(DELUGE_TEMPLATES.factory.gbPerDay);
  const [err, setErr] = useState<string | null>(null);

  const items = sites.data?.data?.items ?? [];

  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Sites and capacity</p>
        <h1>Deluge classes and backhaul avoided</h1>
        <p className="lead">
          Register sites with hospital / factory / vehicle classes for GB/day planning (BR-11).
        </p>
      </header>

      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h2>Register site</h2>
        <div className="row">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Class
            <select
              value={siteClass}
              onChange={(e) => {
                const next = e.target.value;
                setSiteClass(next);
                setGb(DELUGE_TEMPLATES[next]?.gbPerDay ?? 0);
              }}
            >
              {Object.entries(DELUGE_TEMPLATES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Est. GB/day
            <input
              type="number"
              value={gb}
              onChange={(e) => setGb(Number(e.target.value))}
            />
          </label>
          <button
            className="btn"
            type="button"
            disabled={!name || register.isPending}
            onClick={() => {
              setErr(null);
              register.mutate(
                {
                  name,
                  siteClass,
                  estimatedGbPerDay: gb || undefined,
                },
                { onError: (e: Error) => setErr(e.message) }
              );
            }}
          >
            Register
          </button>
        </div>
        {err && <p className="error">{err}</p>}
      </section>

      <section className="panel">
        <h2>Sites</h2>
        {sites.isError && <p className="error">{(sites.error as Error).message}</p>}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {items.map(
              (s: {
                id: string;
                name: string;
                siteClass: string;
                estimatedGbPerDay?: number;
                backhaulBytesAvoided?: number;
              }) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.siteClass}</td>
                  <td>
                    <DelugeCapacityMeter
                      siteClass={s.siteClass}
                      estimatedGbPerDay={s.estimatedGbPerDay}
                      backhaulBytesAvoided={s.backhaulBytesAvoided}
                    />
                  </td>
                </tr>
              )
            )}
            {!items.length && (
              <tr>
                <td colSpan={4}>No sites — register the first site to seed the tier map.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
