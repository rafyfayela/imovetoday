import React from 'react';
import styles from './SchoolCard.module.css';
import { Link } from 'react-router-dom';

const SchoolCard = ({ school }) => {
  const { id, name, location, type, curriculum, images } = school;

  return (
    <div className={styles.schoolCard}>
      {/* Clickable Image */}
      <Link to={`/app/schools/${id}`} className={styles.imageLink}>
        <div className={styles.cardImage}>
          <img
            src={images && images.length > 0 ? images[0] : '/placeholder-school.jpg'}
            alt={name}
            className={styles.schoolImage}
          />
          <div className={styles.imageOverlay}></div>
          <div className={styles.cardHeader}>
            <h3 className={styles.schoolName}>{name}</h3>
          </div>
        </div>
      </Link>

      {/* Card Details */}
      <div className={styles.cardContent}>
        <p className={styles.cardText}>City: {location}</p>
        <p className={styles.cardText}>Type: {type}</p>
        <p className={styles.cardText}>Education System: {curriculum}</p>
      </div>
    </div>
  );
};

export default SchoolCard;
