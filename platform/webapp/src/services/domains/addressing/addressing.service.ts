import { apiClient, idem } from '../../shared/api-client';

export const addressingService = {
  list: () => apiClient.get<{ items: any[] }>('/v1/addresses'),
  register: (body: { ref: string; owningTierId: string }) =>
    apiClient.post<any>('/v1/addresses', body, { idempotencyKey: idem() }),
  grant: (addressId: string, body: { tierId: string }) =>
    apiClient.post<any>(`/v1/addresses/${addressId}/grant`, body, {
      idempotencyKey: idem(),
    }),
  revoke: (addressId: string) =>
    apiClient.post<any>(`/v1/addresses/${addressId}/revoke`, {}, { idempotencyKey: idem() }),
};

export const addressingFacade = addressingService;
