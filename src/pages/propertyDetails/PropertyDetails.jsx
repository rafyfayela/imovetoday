import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { getPorpertyById } from '../../services/apiProperties';
import styles from './PropertyDetails.module.css';
import Amenities from './components/Amenities';
import PropertyOverview from './components/PropertyOverview';
import PropertyHeroSection from './components/PropertyHeroSection';
import Reviews from './components/Reviews';
import LoadingDot from '../../assets/lottie/Loading.json';
import Lottie from 'lottie-react';

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchOneProperty = async () => {
      try {
        setLoading(true);
        const data = await getPorpertyById(id);
        // console.log('Fetched property:', data);
        setProperty(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOneProperty();
  }, [id]);

  // Destructure property data
  const {
    name,
    address,
    city,
    type,
    bedrooms,
    bathrooms,
    description,
    images,
    listing_type,
    location,
    geolocation,
    pool,
    equipped_kitchen,
    garden,
    furnished,
    parking,
    gym,
  } = property || {};

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Lottie animationData={LoadingDot} loop autoplay style={{ height: 70, width: 70 }} />
      </div>
    );
  }

  if (!property) {
    return <div className={styles.error}>Property not found</div>;
  }

  // Create a list of available amenities for easier rendering
  const amenities = [
    { name: 'Pool', available: pool, icon: 'fas fa-swimming-pool' },
    { name: 'Equipped Kitchen', available: equipped_kitchen, icon: 'fas fa-utensils' },
    { name: 'Garden', available: garden, icon: 'fas fa-leaf' },
    { name: 'Furnished', available: furnished, icon: 'fas fa-couch' },
    { name: 'Parking', available: parking, icon: 'fas fa-car' },
    { name: 'Gym', available: gym, icon: 'fas fa-dumbbell' },
  ].filter((amenity) => amenity.available);

  return (
    <div>
      <div className={styles.propertyDetailsContainer}>
        <PropertyHeroSection
          name={name}
          address={address}
          city={city}
          listing_type={listing_type}
          images={images}
        />

        <div className={styles.contentContainer}>
          <div className={styles.mainContent}>
            <PropertyOverview
              description={description}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              type={type}
            />

            {amenities.length > 0 && <Amenities amenities={amenities} />}
            <Reviews />
          </div>

          <div className={styles.sidebar}>
            <div className={styles.actionCard}>
              <h3 className={styles.sectionTitle}>Interested?</h3>
              <button className={styles.actionButton}>
                <i className="fas fa-phone"></i>
                Call Agent
              </button>
              <button className={styles.secondaryButton}>
                <i className="fas fa-envelope"></i>
                Send Inquiry
              </button>
            </div>

            <div className={styles.actionCard}>
              <h3 className={styles.sectionTitle}>Location</h3>
              <p className={styles.locationText}>
                <strong>Area:</strong> {location}
              </p>
              <p className={styles.locationText}>
                <strong>City:</strong> {city}
              </p>
              <div className={styles.mapContainer}>
                {geolocation ? (
                  <p>Map would be displayed here for: {geolocation}</p>
                ) : (
                  <p>Location information not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
