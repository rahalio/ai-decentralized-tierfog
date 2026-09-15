import { apiClient, idem } from '../../shared/api-client';

export const flService = {
  list: () => apiClient.get<{ items: any[] }>('/v1/fl/eligibility'),
  evaluate: (body: { roundId: string; tierId: string; healthScore?: number }) =>
    apiClient.post<any>('/v1/fl/eligibility', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/fl/eligibility/${id}`),
  waive: (eligibilityId: string, body: { waiverNote: string }) =>
    apiClient.post<any>(`/v1/fl/eligibility/${eligibilityId}/waive`, body, {
      idempotencyKey: idem(),
    }),
};

export const flFacade = flService;
