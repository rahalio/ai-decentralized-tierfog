import { useNavigate } from 'react-router-dom';
import { setSession } from '../services/shared/api-client';

export function LoginPage() {
  const nav = useNavigate();

  function enter() {
    setSession('demo-local-session');
    nav('/');
  }

  return (
    <div className="login">
      <div className="loginCard">
        <div className="fogMark" aria-hidden />
        <p className="kicker">Tierfog</p>
        <h1>Intelligence in place — across every radio</h1>
        <p className="lead" style={{ margin: '0.85rem auto 1.5rem' }}>
          Hierarchical fog map for OT and SRE — quarantine dims a branch; in-place jobs glow where they ran.
        </p>
        <button className="btn" type="button" onClick={enter}>
          Enter fabric console
        </button>
      </div>
    </div>
  );
}
