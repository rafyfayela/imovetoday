import React, { useRef } from 'react';
import { useTopGemsProperties } from '../../../hooks/useTopGemsProperties';
import TopGemsCard from './TopGemsCard';
import styles from './OurTopGems.module.css';
import SkeletonCard from '../SkeletonCard';

export default function OurTopGems() {
  const { properties, loading, error } = useTopGemsProperties();
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

  const skeletonCount = 4;

  return (
    <div className={styles.ourTopGemsContainer}>
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
