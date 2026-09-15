import { apiClient, idem } from '../../shared/api-client';

export const jobsService = {
  list: () => apiClient.get<{ items: any[] }>('/v1/jobs'),
  schedule: (body: {
    preferredMaxTierRole: string;
    flRoundId?: string;
    siteId?: string;
  }) => apiClient.post<any>('/v1/jobs', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/jobs/${id}`),
  overridePlacement: (jobId: string, body: { executionTierId: string; reason: string }) =>
    apiClient.post<any>(`/v1/jobs/${jobId}/override-placement`, body, {
      idempotencyKey: idem(),
    }),
  pause: (jobId: string) =>
    apiClient.post<any>(`/v1/jobs/${jobId}/pause`, {}, { idempotencyKey: idem() }),
};

export const jobsFacade = jobsService;
