import { useQuery, useMutation } from '@tanstack/react-query';
import { schemeService, medicineService, billService, expenseService } from '../services/api.service';

export const useSchemes = () => {
  return useQuery({
    queryKey: ['schemes'],
    queryFn: schemeService.getSchemes,
  });
};

export const useMatchSchemes = () => {
  return useMutation({
    mutationFn: (profile: any) => schemeService.matchSchemes(profile),
  });
};

export const useMedicineSearch = (query: string) => {
  return useQuery({
    queryKey: ['medicines', query],
    queryFn: () => medicineService.search(query),
    enabled: query.length > 2,
  });
};

export const useBillAnalysis = () => {
  return useMutation({
    mutationFn: (file: File) => billService.analyze(file),
  });
};

export const useExpensePlanner = () => {
  return useMutation({
    mutationFn: ({ profile, history }: { profile: any, history: any }) => 
      expenseService.plan(profile, history),
  });
};
