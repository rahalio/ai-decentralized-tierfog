import { apiClient, idem } from '../../shared/api-client';

export const trustService = {
  listSpheres: () => apiClient.get<{ items: any[] }>('/v1/trust/spheres'),
  createSphere: (body: { name: string; memberTierIds?: string[] }) =>
    apiClient.post<any>('/v1/trust/spheres', body, { idempotencyKey: idem() }),
  approveJoin: (sphereId: string, body: { tierId: string }) =>
    apiClient.post<any>(`/v1/trust/spheres/${sphereId}/join`, body, {
      idempotencyKey: idem(),
    }),
  listQuarantine: () => apiClient.get<{ items: any[] }>('/v1/trust/quarantine'),
  quarantine: (body: { tierId: string; reason: string; continueParentDag?: boolean }) =>
    apiClient.post<any>('/v1/trust/quarantine', body, { idempotencyKey: idem() }),
  release: (eventId: string) =>
    apiClient.post<any>(`/v1/trust/quarantine/${eventId}/release`, {}, {
      idempotencyKey: idem(),
    }),
  listTenants: () => apiClient.get<{ items: any[] }>('/v1/trust/tenants'),
  createTenant: (body: { name: string; hostTierId: string }) =>
    apiClient.post<any>('/v1/trust/tenants', body, { idempotencyKey: idem() }),
};

export const trustFacade = trustService;
