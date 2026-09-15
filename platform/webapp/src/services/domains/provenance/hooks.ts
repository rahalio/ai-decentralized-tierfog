import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { provenanceService } from './provenance.service';

export function useProvenanceList() {
  return useQuery({ queryKey: ['provenance'], queryFn: () => provenanceService.list() });
}

export function useSealProvenance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: provenanceService.seal,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['provenance'] }),
  });
}
