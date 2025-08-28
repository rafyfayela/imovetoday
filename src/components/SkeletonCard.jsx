import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <div className={styles.schoolCard}>
      <div className={`${styles.cardImage} ${styles.skeleton}`}>
        <div className={styles.cardHeader}>
          <div className={styles.skeletonText} style={{ width: '60%' }}></div>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={`${styles.skeletonText}`} style={{ width: '80%' }}></div>
        <div className={`${styles.skeletonText}`} style={{ width: '50%' }}></div>
        <div className={`${styles.skeletonText}`} style={{ width: '70%' }}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
