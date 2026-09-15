import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sitesService } from './sites.service';

export function useSitesList() {
  return useQuery({ queryKey: ['sites'], queryFn: () => sitesService.list() });
}

export function useRegisterSite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: sitesService.register,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sites'] }),
  });
}
