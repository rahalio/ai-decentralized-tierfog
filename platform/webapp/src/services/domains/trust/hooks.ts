import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { trustService } from './trust.service';

export function useTrustSpheresList() {
  return useQuery({ queryKey: ['trust-spheres'], queryFn: () => trustService.listSpheres() });
}

export function useCreateTrustSphere() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: trustService.createSphere,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trust-spheres'] }),
  });
}

export function useQuarantineList() {
  return useQuery({ queryKey: ['quarantine'], queryFn: () => trustService.listQuarantine() });
}

export function useQuarantineTier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: trustService.quarantine,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['quarantine'] });
      qc.invalidateQueries({ queryKey: ['tiers'] });
    },
  });
}

export function useReleaseQuarantine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) => trustService.release(eventId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['quarantine'] });
      qc.invalidateQueries({ queryKey: ['tiers'] });
    },
  });
}
