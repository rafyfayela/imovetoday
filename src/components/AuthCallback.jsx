// src/pages/AuthCallback/AuthCallback.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Processing...');

  useEffect(() => {
    // Check if this is an email confirmation redirect
    const type = searchParams.get('type');
    if (type === 'signup') {
      // This is an email confirmation redirect
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setMessage('Email confirmed successfully! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setMessage('Unable to confirm email. Please try logging in.');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      });
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Email Confirmation</h1>
      <p>{message}</p>
    </div>
  );
};

export default AuthCallback;