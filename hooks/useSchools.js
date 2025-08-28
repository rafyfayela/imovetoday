// File: src/hooks/useSchools.js
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../src/services/supabase';

/**
 * Custom hook to fetch schools from the database
 * @param {number|null} schoolId - Optional. If provided, fetches one school by ID
 */
const useSchools = (schoolId = null) => {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchools = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from('schools').select('*');
      if (schoolId !== null) {
        query = query.eq('id', schoolId).single();
      }
      const { data, error } = await query;

      if (error) throw error;

      if (schoolId !== null) {
        setSchool(data);
      } else {
        setSchools(data);
      }
    } catch (err) {
      setError(err.message || 'Error fetching schools');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  return {
    schools,
    school,
    loading,
    error,
    refetch: fetchSchools,
  };
};

export default useSchools;
