// File: src/pages/SignUp/SignUp.jsx
import React, { useState } from 'react';


import styles from './SignUp.module.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import TickAnimation from '../../components/Sucess/TickAnimation';
import Lottie from 'lottie-react';
import LoadingDots from "../../assets/lottie/Loading.json"

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signUp, loading, error } = useAuth();
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    const data = await signUp(formData.email, formData.password, formData.fullName);

    if (data) {

          setSuccess(true)
          setTimeout(() => {
            navigate('/login');
          }, 1500);
     
    }
  };

  return (
    <div className={styles.signUpPage}>
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.signUpCard}>
            <div className={styles.signUpHeader}>
              <h1>Create Your Account</h1>
              <p>Begin your seamless relocation journey with us</p>
            </div>

            <form className={styles.signUpForm} onSubmit={handleSubmit}>
             {(localError || error) && <p className={styles.error}>{localError || error}</p>}

              {/* Full Name */}
              <div className={styles.formGroup}>
                <label htmlFor="fullName" className={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Password */}
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Create a secure password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Confirm your password"
                  required
                />
              </div>

            <button type="submit" className={styles.submitButton} disabled={loading || success}>
  {loading ? (
    <Lottie
      animationData={LoadingDots}
      loop
      autoplay
      style={{ height: 40, width: 40 }}
    />
  ) : success ? (
    <TickAnimation size={40} strokeColor="#FFF" />
  ) : (
    'Create Account'
  )}
</button>

              <div className={styles.loginRedirect}>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
