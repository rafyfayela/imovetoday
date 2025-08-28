import React from 'react';
import Slider from 'react-slick';
import styles from './HeroSection.module.css';

const HeroSection = ({ name, location, images }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const displayImages = images && images.length > 0 ? images : ['/placeholder-school.jpg'];

  return (
    <div className={styles.heroSection}>
      <Slider {...sliderSettings}>
        {displayImages.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt={`${name} - Image ${idx + 1}`} className={styles.heroImage} />
          </div>
        ))}
      </Slider>

      <div className={styles.heroOverlay}>
        <div className={styles.schoolBasicInfo}>
          <h1 className={styles.schoolName}>{name}</h1>
          <div className={styles.schoolLocation}>
            <i className="fas fa-map-marker-alt"></i>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
