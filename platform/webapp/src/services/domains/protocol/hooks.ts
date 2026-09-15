import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { protocolService } from './protocol.service';

export function useProtocolDomainsList() {
  return useQuery({ queryKey: ['domains'], queryFn: () => protocolService.list() });
}

export function useOnboardDomain() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: protocolService.onboard,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['domains'] }),
  });
}

export function usePushGatewayConfig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      domainId,
      ...body
    }: {
      domainId: string;
      configVersion: string;
      rolloutRing?: string;
    }) => protocolService.pushGatewayConfig(domainId, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['domains'] }),
  });
}
