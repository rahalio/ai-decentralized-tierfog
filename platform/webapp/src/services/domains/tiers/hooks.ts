import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tiersService } from './tiers.service';

export function useTiersList(siteId?: string) {
  return useQuery({
    queryKey: ['tiers', siteId ?? 'all'],
    queryFn: () => tiersService.list(siteId ? { siteId } : undefined),
  });
}

export function useRegisterTier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tiersService.register,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tiers'] }),
  });
}
