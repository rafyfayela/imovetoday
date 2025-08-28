import React from 'react';
import styles from './SchoolDetailsCard.module.css';

const SchoolDetailsCard = ({ type, curriculum, grades, transport, canteen, fees_range }) => {
  return (
    <div className={styles.detailCard}>
      <h2 className={styles.sectionTitle}>School Details</h2>
      <div className={styles.detailGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Type</span>
          <span className={styles.detailValue}>{type}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Program</span>
          <span className={styles.detailValue}>{curriculum}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Grades</span>
          <span className={styles.detailValue}>{grades}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Transport</span>
          <span className={styles.detailValue}>{transport ? 'Available' : 'Not available'}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Cafeteria</span>
          <span className={styles.detailValue}>
            {canteen?.available ? 'Available' : 'Not available'}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Fees</span>
          <span className={styles.detailValue}>{fees_range}</span>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailsCard;
