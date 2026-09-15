import { apiClient, idem } from '../../shared/api-client';

export const tiersService = {
  list: (params?: { siteId?: string }) => {
    const q = params?.siteId ? `?siteId=${encodeURIComponent(params.siteId)}` : '';
    return apiClient.get<{ items: any[] }>(`/v1/tiers${q}`);
  },
  register: (body: { siteId: string; role: string; parentTierId?: string }) =>
    apiClient.post<any>('/v1/tiers', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/tiers/${id}`),
};

export const tiersFacade = tiersService;
