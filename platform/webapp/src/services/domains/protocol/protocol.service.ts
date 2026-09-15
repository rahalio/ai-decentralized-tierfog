import { apiClient, idem } from '../../shared/api-client';

export const protocolService = {
  list: () => apiClient.get<{ items: any[] }>('/v1/domains'),
  onboard: (body: {
    protocolFamily: string;
    tierId: string;
    gatewayConfigVersion?: string;
    isolationChannelClass?: string;
  }) => apiClient.post<any>('/v1/domains', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/domains/${id}`),
  pushGatewayConfig: (
    domainId: string,
    body: { configVersion: string; rolloutRing?: string }
  ) =>
    apiClient.post<any>(`/v1/domains/${domainId}/gateway-config`, body, {
      idempotencyKey: idem(),
    }),
  updateIsolation: (
    domainId: string,
    body: {
      highThroughputWeight: number;
      lowPowerWeight: number;
      stormProtection?: boolean;
    }
  ) =>
    apiClient.put<any>(`/v1/domains/${domainId}/isolation`, body, {
      idempotencyKey: idem(),
    }),
};

export const protocolFacade = protocolService;
