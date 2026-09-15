/**
 * Shared API client for Tierfog webapp.
 */

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

function apiKey(): string {
  if (typeof localStorage === 'undefined') return 'tierfog_demo_local_dev_key';
  return localStorage.getItem('tierfog.apiKey') || 'tierfog_demo_local_dev_key';
}

function authHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey(),
    ...extra,
  };
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('tierfog.token') : null;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  opts?: { idempotencyKey?: string }
): Promise<ApiResponse<T>> {
  const res = await fetch(path, {
    method,
    headers: authHeaders(
      opts?.idempotencyKey ? { 'Idempotency-Key': opts.idempotencyKey } : undefined
    ),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} failed: ${res.status} ${text}`);
  }
  if (res.status === 204) {
    return { data: undefined as T };
  }
  return (await res.json()) as ApiResponse<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown, opts?: { idempotencyKey?: string }) =>
    request<T>('POST', path, body, opts),
  put: <T>(path: string, body?: unknown, opts?: { idempotencyKey?: string }) =>
    request<T>('PUT', path, body, opts),
  patch: <T>(path: string, body?: unknown, opts?: { idempotencyKey?: string }) =>
    request<T>('PATCH', path, body, opts),
  delete: <T>(path: string) => request<T>('DELETE', path),
};

export function setSession(token: string) {
  localStorage.setItem('tierfog.token', token);
  localStorage.setItem('tierfog.session', '1');
  window.dispatchEvent(new Event('tierfog-auth'));
}

export function clearSession() {
  localStorage.removeItem('tierfog.token');
  localStorage.removeItem('tierfog.session');
  window.dispatchEvent(new Event('tierfog-auth'));
}

export function idem() {
  return crypto.randomUUID();
}
