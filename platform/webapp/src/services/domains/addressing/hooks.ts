import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addressingService } from './addressing.service';

export function useAddressesList() {
  return useQuery({ queryKey: ['addresses'], queryFn: () => addressingService.list() });
}

export function useRegisterAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addressingService.register,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['addresses'] }),
  });
}

export function useRevokeAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) => addressingService.revoke(addressId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['addresses'] }),
  });
}
