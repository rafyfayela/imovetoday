import React from 'react';
import styles from './Amenities.module.css';

const Amenities = ({ amenities }) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className={styles.amenitiesSection}>
      <h2 className={styles.sectionTitle}>Amenities & Features</h2>
      <div className={styles.amenitiesGrid}>
        {amenities.map((amenity) => (
          <div key={amenity.name} className={styles.amenityItem}>
            <i className={amenity.icon}></i>
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
