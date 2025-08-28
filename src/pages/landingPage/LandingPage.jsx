// File: src/pages/LandingPage/LandingPage.jsx


import { useNavigate } from 'react-router';
import styles from './LandingPage.module.css';

const LandingPage = () => {

  const navigate = useNavigate()
  return (
    <div className={styles.landingPage}>
      
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Free, Premium</h1>
            <h2>Relocation Services</h2>
            <p>Let us make your move to Dubai seamless and stress-free with our premium relocation services</p>
            <button onClick={()=>navigate('/signup')} className={styles.ctaButton}>Start Your Journey</button>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.imagePlaceholder}></div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className={styles.features}>
          <h3>Why You'll Love Our Relocation Services</h3>
          
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15L12 18M12 6L12 9M9 12L6 12M18 12L15 12M4.9375 19.0625L7.75 16.25M16.25 7.75L19.0625 4.9375M4.9375 4.9375L7.75 7.75M16.25 16.25L19.0625 19.0625" stroke="#E41B23" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h4>So Easy</h4>
              <p>Our streamlined process makes relocation simple and straightforward.</p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4.99992H4V11.9999M4 11.9999V18.9999H11M4 11.9999L17 11.9999M17 11.9999V4.99992H20V18.9999H17M17 11.9999L13 8.99992M13 8.99992V14.9999M13 8.99992L17 4.99992" stroke="#00843D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Super Customizable</h4>
              <p>Tailor our services to your specific needs and preferences.</p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 16C7 16 8.5 14 12 14C15.5 14 17 16 17 16M12 8.5H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4>Client Approved</h4>
              <p>Thousands of successful relocations with rave reviews from our clients.</p>
            </div>
          </div>
        </section>
        
        {/* Additional Sections */}
        <section className={styles.extraSection}>
          <h3>Add Matching Housing and School Solutions</h3>
          <div className={styles.extraContent}>
            <p>We'll find the perfect home and school for your family based on your specific needs and preferences.</p>
          </div>
        </section>
        
        <section className={styles.extraSection}>
          <h3>Put Your Relocation Plan Together</h3>
          <div className={styles.extraContent}>
            <p>We'll make this transition fun and easy with our comprehensive relocation planning tools.</p>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className={styles.finalCta}>
          <h3>We'll make this fun and easy!</h3>
          <button className={styles.ctaButton}>Start Your Journey</button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;