import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobsService } from './jobs.service';

export function useJobsList() {
  return useQuery({ queryKey: ['jobs'], queryFn: () => jobsService.list() });
}

export function useScheduleJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: jobsService.schedule,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
}

export function usePauseJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => jobsService.pause(jobId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['jobs'] }),
  });
}
