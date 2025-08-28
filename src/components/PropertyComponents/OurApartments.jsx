import React, { useRef } from 'react';

import TopGemsCard from './TopGemsCard';
import styles from './OurApartments.module.css';
import useProperties from '../../../hooks/useProperties';
import SkeletonCard from '../SkeletonCard';

export default function OurApartments() {
  const { properties, loading, error } = useProperties({ propertyType: 'apartment' });
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild.offsetWidth + 20;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const skeletonCount = 5;

  return (
    <div className={styles.ourApartmentsContainer}>
      <div className={styles.horizontalScrollContainer} ref={scrollRef}>
        {loading
          ? Array.from({ length: skeletonCount }).map((_, index) => <SkeletonCard key={index} />)
          : properties.map((property) => <TopGemsCard key={property.id} property={property} />)}
      </div>
      {!loading && (
        <>
          <div className={styles.arrowLeft} onClick={() => scroll('left')} />
          <div className={styles.arrowRight} onClick={() => scroll('right')} />
        </>
      )}
    </div>
  );
}
