import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SchoolDetails.module.css';
import useSchools from '../../../hooks/useSchools';
import LoadingDot from '../../assets/lottie/Loading.json';
import Lottie from 'lottie-react';
import HeroSection from './components/HeroSection';
import SchoolOverview from './components/SchoolOverview';
import SchoolDetailsCard from './components/SchoolDetailsCard';
import SchoolSidebar from './components/SchoolSidebar';
import Reviews from '../propertyDetails/components/Reviews';

const SchoolDetails = () => {
  const { id } = useParams();

  useEffect(() => {}, [id]);

  const { school, loading, error } = useSchools(id);
  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Lottie animationData={LoadingDot} loop autoplay style={{ height: 70, width: 70 }} />
      </div>
    );

  if (!school) return <div className={styles.error}>École non trouvée</div>;

  const {
    name,
    location,
    type,
    curriculum,
    images,
    grades,
    fees_range,
    rating,
    transport,
    canteen,
    contact,
    website,
    geolocation,
  } = school;

  return (
    <div className={styles.schoolDetailsContainer}>
      <HeroSection name={name} location={location} images={images} />

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <SchoolOverview
            name={name}
            location={location}
            type={type}
            curriculum={curriculum}
            grades={grades}
            rating={rating}
            fees_range={fees_range}
          />

          <SchoolDetailsCard
            type={type}
            curriculum={curriculum}
            grades={grades}
            transport={transport}
            canteen={canteen}
            fees_range={fees_range}
          />
        </div>

        <SchoolSidebar
          contact={contact}
          website={website}
          location={location}
          geolocation={geolocation}
        />
        <Reviews />
      </div>
    </div>
  );
};

export default SchoolDetails;
