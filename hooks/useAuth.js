// File: src/hooks/useAuth.js
import { useState } from 'react';
import { supabase } from '../src/services/supabase';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Signup function
  const signUp = async (email, password, fullName) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return null;
      }

      const userId = data.user?.id;

      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userId,
          email: email,
          full_name: fullName,
        },
      ]);

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return null;
      }

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) {
        setError(logoutError.message);
        setLoading(false);
        return false;
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return { signUp, logout, loading, error };
};

export default useAuth;
