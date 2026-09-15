import { apiClient, idem } from '../../shared/api-client';

export const provenanceService = {
  list: () => apiClient.get<{ items: any[] }>('/v1/provenance'),
  seal: (body: {
    artefactHash: string;
    tierId: string;
    jobId?: string;
    tierPath?: string[];
  }) => apiClient.post<any>('/v1/provenance', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/provenance/${id}`),
};

export const provenanceFacade = provenanceService;
