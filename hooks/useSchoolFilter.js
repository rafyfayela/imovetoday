import { useEffect, useState } from "react";
import { supabase } from "../src/services/supabase";

export const useTopRatedSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("schools")
          .select("*")
          .gt("rating", 4.3)
          .order("rating", { ascending: false });

        if (error) {
          throw error;
        }

        setSchools(data);
      } catch (err) {
        setError(err.message || "Error fetching schools");
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return { schools, loading, error };
};