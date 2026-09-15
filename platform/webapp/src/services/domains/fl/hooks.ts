import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { flService } from './fl.service';

export function useFlEligibilityList() {
  return useQuery({ queryKey: ['fl-eligibility'], queryFn: () => flService.list() });
}

export function useEvaluateFlEligibility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: flService.evaluate,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['fl-eligibility'] }),
  });
}

export function useWaiveFlHealthGate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eligibilityId, waiverNote }: { eligibilityId: string; waiverNote: string }) =>
      flService.waive(eligibilityId, { waiverNote }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['fl-eligibility'] }),
  });
}
