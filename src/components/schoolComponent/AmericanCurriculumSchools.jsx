import React, { useRef } from 'react';
import SchoolCard from './SchoolCard';
import { useTopRatedSchools } from '../../../hooks/useSchoolFilter';
import styles from './AmericanCurriculumSchools.module.css';
import SkeletonCard from '../../components/SkeletonCard';

export default function AmericanCurriculumSchools() {
  const { schools, loading, error } = useTopRatedSchools();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild
        ? scrollRef.current.firstChild.offsetWidth + 20
        : 300 + 20;

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const skeletonCount = 4;

  return (
    <div className={styles.americanCurriculumSchoolsContainer}>
      <div className={styles.horizontalScrollContainer} ref={scrollRef}>
        {loading ? (
          Array.from({ length: skeletonCount }).map((_, index) => <SkeletonCard key={index} />)
        ) : schools.length > 0 ? (
          schools.map((school) => <SchoolCard key={school.id} school={school} />)
        ) : (
          <p className={styles.noSchools}>No American curriculum schools found.</p>
        )}
      </div>
      {!loading && schools.length > 0 && (
        <>
          <div className={styles.arrowLeft} onClick={() => scroll('left')} />
          <div className={styles.arrowRight} onClick={() => scroll('right')} />
        </>
      )}
    </div>
  );
}
