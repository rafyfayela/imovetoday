import { useState } from 'react';
import styles from './AppHome.module.css';
import OurTopGems from '../PropertyComponents/OurTopGems';
import OurApartments from '../PropertyComponents/OurApartments';
import PropertiesInDubai from '../PropertyComponents/PropertiesInDubai';
import OurTopSchools from '../schoolComponent/OurTopSchools';
import AmericanCurriculumSchools from '../schoolComponent/AmericanCurriculumSchools';
import { useTopRatedSchools } from '../../../hooks/useSchoolFilter';
import Ai from '../../assets/ai.png';

const AppHome = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { schools } = useTopRatedSchools();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMap = () => setIsMapOpen((prev) => !prev);

  return (
    <div className={styles.appHome}>
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our top gems</h2>
            <OurTopGems />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Featured Apartments</h2>
            <OurApartments />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Properties in Dubai</h2>
            <PropertiesInDubai />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Top Rated Schools</h2>
            <OurTopSchools />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>American Curriculum Schools</h2>
            <AmericanCurriculumSchools />
          </section>
        </div>
      </div>

      <button className={`${styles.floatingButton} ${isMapOpen ? 'open' : ''}`} onClick={toggleMap}>
        <img src={Ai} alt="AI" style={{ width: '18px', height: '18px', marginRight: '6px' }} />
        {isMapOpen ? 'Close' : 'Curated for You'}
      </button>

      {isModalOpen && <MultiStepForm closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AppHome;
