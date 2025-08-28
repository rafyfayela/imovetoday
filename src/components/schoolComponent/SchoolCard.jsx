import React from 'react';
import styles from './SchoolCard.module.css'; // Dedicated CSS for school cards

export default function SchoolCard({ school }) {
  // Assuming 'school' object has fields like name, address, rating, type, images
  const handleClick = () => {
    window.open(`/app/schools/${school.id}`, '_blank');
  };
  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.cardImageContainer}>
        {school?.images && school.images.length > 0 ? (
          <img src={school.images[0]} alt={school?.name} className={styles.cardImage} />
        ) : (
          <div className={styles.noImage}>No Image Available</div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{school?.name}</h3>
        <p className={styles.cardText}>{school?.address}</p>
        {school?.type && <p className={styles.cardText}>Type: {school.type}</p>}
        {school?.rating && <p className={styles.rating}>⭐ {school.rating}</p>}
      </div>
    </div>
  );
}
