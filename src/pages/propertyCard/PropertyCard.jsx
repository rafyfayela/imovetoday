import React from 'react';
import styles from './PropertyCard.module.css';
import { Link } from 'react-router-dom';
const PropertyCard = ({ property }) => {
  const { id, name, city, type, images, listing_type } = property;

  return (
    <div className={styles.propertyCard}>
      <Link to={`/app/properties/${id}`} className={styles.imageLink}>
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
      </Link>

      <div className={styles.cardContent}>
        <p className={styles.cardText}>City: {city}</p>
        <p className={styles.cardText}>Type: {type}</p>
      </div>
    </div>
  );
};
export default PropertyCard;
