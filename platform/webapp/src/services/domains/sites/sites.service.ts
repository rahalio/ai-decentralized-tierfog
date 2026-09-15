/** Domain API helpers — thin wrappers over apiClient. */

import { apiClient, idem } from '../../shared/api-client';

export const sitesService = {
  list: () => apiClient.get<{ items: any[] }>('/v1/sites'),
  register: (body: { name: string; siteClass: string; estimatedGbPerDay?: number }) =>
    apiClient.post<any>('/v1/sites', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/sites/${id}`),
  update: (
    id: string,
    body: { name?: string; siteClass?: string; estimatedGbPerDay?: number }
  ) => apiClient.patch<any>(`/v1/sites/${id}`, body, { idempotencyKey: idem() }),
};

export const sitesFacade = sitesService;
