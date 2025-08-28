import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // adjust path

export const useProperties = ({
  rating = null,
  propertyType = null,
  pool = null,
  garden = null,
} = {}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        let query = supabase.from("properties").select("*");

        if (rating !== null) query = query.eq("rating", rating);
        if (propertyType) query = query.eq("type", propertyType);
        if (pool !== null) query = query.eq("pool", pool);
        if (garden !== null) query = query.eq("garden", garden);

        const { data, error } = await query;

        if (error) throw error;

        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [rating, propertyType, pool, garden]);

  return { properties, loading, error };
};