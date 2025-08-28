// File: src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import { supabase } from '../../services/supabase';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import TickAnimation from '../../components/Sucess/TickAnimation.jsx';
import LoadingDots from '../../assets/lottie/Loading.json';
import styles from './Login.module.css';

const SOCIAL_PROVIDERS = [
  { name: 'Google', provider: 'google', color: '#FFC107', icon: <GoogleIcon /> },
  { name: 'Facebook', provider: 'facebook', color: '#1877F2', icon: <FacebookIcon /> },
];

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowResend(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword(formData);

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          setError('Please confirm your email before logging in.');
          setShowResend(true);
        } else {
          throw error;
        }
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/app'), 1300);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email: formData.email });
      if (error) throw error;
      setError('Confirmation email sent. Please check your inbox.');
      setShowResend(false);
    } catch (err) {
      setError(`Error sending confirmation email: ${err.message}`);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      await supabase.auth.signInWithOAuth({ provider });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <h1>Welcome Back</h1>
              <p>Sign in to continue your relocation journey</p>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
                {showResend && (
                  <button type="button" className={styles.resendButton} onClick={handleResendConfirmation}>
                    Resend Confirmation Email
                  </button>
                )}
              </div>
            )}

            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
              <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" showForgot />

              <RememberMe />

              <button type="submit" className={styles.submitButton} disabled={loading || success}>
                {loading ? (
                  <Lottie animationData={LoadingDots} loop autoplay style={{ height: 40, width: 40 }} />
                ) : success ? (
                  <TickAnimation size={40} strokeColor="#FFF" />
                ) : (
                  'Login'
                )}
              </button>

              <div className={styles.signupRedirect}>
                <p>
                  Don't have an account? <a href="/signup" className={styles.signupLink}>Create Account</a>
                </p>
              </div>
            </form>

            <div className={styles.divider}><span>Or sign in with</span></div>

            <div className={styles.socialAuth}>
              {SOCIAL_PROVIDERS.map(({ name, provider }) => (
                <button key={provider} className={styles.socialButton} onClick={() => handleOAuthLogin(provider)}>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Sub-components ---
function Input({ label, type, name, value, onChange, placeholder, showForgot }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.formLabel}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className={styles.formInput} required />
      {showForgot && (
        <div className={styles.forgotPassword}>
          <a href="#" className={styles.forgotLink}>Forgot password?</a>
        </div>
      )}
    </div>
  );
}

function RememberMe() {
  return (
    <div className={styles.rememberMe}>
      <input type="checkbox" id="remember" className={styles.rememberCheckbox} />
      <label htmlFor="remember" className={styles.rememberLabel}>Remember me</label>
    </div>
  );
}

// Example placeholders for SVG icons if you want to keep them
function GoogleIcon() { return null; }
function FacebookIcon() { return null; }
