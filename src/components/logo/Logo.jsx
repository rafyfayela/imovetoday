// File: src/components/Logo/Logo.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Logo.module.css";
import { supabase } from "../../services/supabase";
import LogoImg from "../../assets/Logo/Logo.png";

export const Logo = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Link 
      to={session ? "/app" : "/"} 
      style={{ textDecoration: 'none' }}
    >
      <div className={styles.logo}>
        <img 
          src={LogoImg} 
          alt="iMove Today Logo" 
          className={styles.logoImage} 
        />
      </div>
    </Link>
  );
};
