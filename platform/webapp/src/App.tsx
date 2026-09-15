import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './shell/AppShell';
import { LoginPage } from './pages/LoginPage';
import { TierMapPage } from './pages/TierMapPage';
import { SitesPage } from './pages/SitesPage';
import { DomainsPage } from './pages/DomainsPage';
import { JobsPage } from './pages/JobsPage';
import { FlPage } from './pages/FlPage';
import { AddressingPage } from './pages/AddressingPage';
import { TrustPage } from './pages/TrustPage';
import { ProvenancePage } from './pages/ProvenancePage';
import { QuarantinePage } from './pages/QuarantinePage';

function useSession() {
  const [authed, setAuthed] = useState(() => Boolean(localStorage.getItem('tierfog.session')));
  useEffect(() => {
    const onStorage = () => setAuthed(Boolean(localStorage.getItem('tierfog.session')));
    window.addEventListener('storage', onStorage);
    window.addEventListener('tierfog-auth', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('tierfog-auth', onStorage);
    };
  }, []);
  return authed;
}

export function App() {
  const authed = useSession();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={authed ? <AppShell /> : <Navigate to="/login" replace />}>
        <Route index element={<TierMapPage />} />
        <Route path="sites" element={<SitesPage />} />
        <Route path="domains" element={<DomainsPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="fl" element={<FlPage />} />
        <Route path="addressing" element={<AddressingPage />} />
        <Route path="trust" element={<TrustPage />} />
        <Route path="provenance" element={<ProvenancePage />} />
        <Route path="quarantine" element={<QuarantinePage />} />
      </Route>
    </Routes>
  );
}
