import React, { useRef } from 'react';
import styles from './PropertiesInDubai.module.css'; // Use its own CSS module
import TopGemsCard from './TopGemsCard';
import useProperties from '../../../hooks/useProperties';
import SkeletonCard from '../../components/SkeletonCard';

export default function PropertiesInDubai() {
  const { properties, loading } = useProperties({ city: 'Dubai' });
  const scrollRef = useRef(null);

  // Scroll by width of one card
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

  const skeletonCount = 5;

  return (
    <div className={styles.propertiesInDubaiContainer}>
      <div className={styles.horizontalScrollContainer} ref={scrollRef}>
        {loading
          ? Array.from({ length: skeletonCount }).map((_, index) => <SkeletonCard key={index} />)
          : properties.map((property) => <TopGemsCard key={property.id} property={property} />)}
      </div>
      {properties.length > 0 && !loading && (
        <>
          <div className={styles.arrowLeft} onClick={() => scroll('left')} />
          <div className={styles.arrowRight} onClick={() => scroll('right')} />
        </>
      )}
    </div>
  );
}
