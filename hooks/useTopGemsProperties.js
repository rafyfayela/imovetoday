import { useQuery } from '@tanstack/react-query';
import { supabase } from '../src/services/supabase';

export const useTopGemsProperties = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['top-gems-properties'],
    queryFn: async () => {
      const { data, error } = await supabase.from('properties').select('*').eq('rating', 5);

      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    properties: data || [],
    loading: isLoading,
    error: error?.message || null,
  };
};
