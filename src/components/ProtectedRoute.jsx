// File: src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import Lottie from "lottie-react";
import LoadingDots from "../assets/lottie/Loading.json";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      setLoading(false);
    };

    checkSession();

    // listen to login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return  
  <Lottie animationData={LoadingDots} loop autoplay style={{ height: 40, width: 40 }} />
  ;

  if (!session) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
