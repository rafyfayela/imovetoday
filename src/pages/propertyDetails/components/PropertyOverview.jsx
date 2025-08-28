import React from 'react';
import styles from './PropertyOverview.module.css';

const PropertyOverview = ({ description, bedrooms, bathrooms, type }) => {
  return (
    <div className={styles.detailCard}>
      <h2 className={styles.sectionTitle}>Property Overview</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{bedrooms || 'N/A'}</div>
          <div className={styles.statLabel}>Bedrooms</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{bathrooms || 'N/A'}</div>
          <div className={styles.statLabel}>Bathrooms</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{type || 'N/A'}</div>
          <div className={styles.statLabel}>Type</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
