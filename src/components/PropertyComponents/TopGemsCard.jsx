import React from 'react';
import Slider from 'react-slick';
import styles from './TopGemsCard.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';

export default function TopGemsCard({ property }) {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: false,
  };

  const handleClick = () => {
    window.open(`/app/properties/${property.id}`, '_blank');
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.cardCarousel}>
        <Slider {...settings}>
          {property?.images?.map((img, index) => (
            <img key={index} src={img} alt={property?.name} className={styles.cardImage} />
          ))}
        </Slider>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{property?.name}</h3>
        <p className={styles.cardText}>{property?.address}</p>
        <p className={styles.cardText}>
          {property?.type} | {property?.bedrooms} Bed • {property?.bathrooms} Bath
        </p>
        {property?.rating && <p className={styles.rating}>⭐ {property.rating}</p>}
      </div>
    </div>
  );
}
