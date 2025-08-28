import React from 'react';
import styles from './PropertyHeroSection.module.css';

const PropertyHeroSection = ({ name, address, city, listing_type, images }) => {
  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const sideImages = images.slice(1, 5);

  return (
    <div className={styles.heroSection}>
      <div className={styles.imageGrid}>
        <div className={styles.mainImageWrapper}>
          <img src={mainImage} alt={`${name} main`} className={styles.mainImage} />
        </div>
        {sideImages.map((img, index) => (
          <div key={index} className={styles.sideImageWrapper}>
            <img src={img} alt={`${name} ${index + 2}`} className={styles.sideImage} />
          </div>
        ))}
      </div>

      <div className={styles.propertyInfo}>
        <span className={styles.listingType}>{listing_type}</span>
        <h1 className={styles.propertyName}>{name}</h1>
        <div className={styles.propertyLocation}>
          <i className="fas fa-map-marker-alt"></i>
          <span>
            {address}, {city}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeroSection;
