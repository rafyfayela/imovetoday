// File: src/hooks/useProperties.js
import { useState, useEffect, useCallback } from 'react';
import {supabase } from "../src/services/supabase"



const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('properties').select('*');
     // console.log("Fetched all properties:", data);

      if (error) throw error;

      setProperties(data || []);
    } catch (err) {
      setError(err.message || 'Error fetching properties');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  };
};

export default useProperties;

