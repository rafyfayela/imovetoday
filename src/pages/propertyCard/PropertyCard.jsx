import React from 'react';
import styles from './PropertyCard.module.css';

const PropertyCard = ({ property }) => {
  const { id, name, city, type, images, listing_type } = property;

  const handleRedirect = (id) => {
    // Opens property page in a new tab
    window.open(`/app/properties/${id}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.propertyCard}>
      <div
        className={styles.imageLink}
        onClick={() => handleRedirect(id)}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.cardImage}>
          <img
            src={images && images.length > 0 ? images[0] : '/placeholder-property.jpg'}
            alt={name}
            className={styles.propertyImage}
          />
          <div className={styles.imageOverlay}></div>
          <div className={styles.listingTypeBadge}>{listing_type}</div>
          <div className={styles.cardHeader}>
            <h3 className={styles.propertyName}>{name}</h3>
          </div>
        </div>
      </div>

      <div className={styles.cardContent}>
        <p className={styles.cardText}>City: {city}</p>
        <p className={styles.cardText}>Type: {type}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
