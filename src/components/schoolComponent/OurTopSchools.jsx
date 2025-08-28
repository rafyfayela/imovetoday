import React, { useRef } from 'react';
import styles from './OurTopSchools.module.css';
import { useTopRatedSchools } from '../../../hooks/useSchoolFilter';
import SchoolCard from './SchoolCard';
import SkeletonCard from '../SkeletonCard';

export default function OurTopSchools() {
  const { schools, loading, error } = useTopRatedSchools();
  const scrollRef = useRef(null);

  // console.log("scoo:", JSON.stringify(schools, null, 2));

  // Scroll by width of one card
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild
        ? scrollRef.current.firstChild.offsetWidth + 20 // 20px gap
        : 300 + 20; // Fallback width

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const skeletonCount = 4;

  return (
    <div className={styles.ourTopSchoolsContainer}>
      <div className={styles.horizontalScrollContainer} ref={scrollRef}>
        {loading ? (
          Array.from({ length: skeletonCount }).map((_, index) => <SkeletonCard key={index} />)
        ) : schools.length > 0 ? (
          schools.map((school) => <SchoolCard key={school.id} school={school} />)
        ) : (
          <p className={styles.noSchools}>No top-rated schools found.</p>
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
