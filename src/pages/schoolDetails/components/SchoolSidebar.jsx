import React from 'react';
import styles from './SchoolSidebar.module.css';

const SchoolSidebar = ({ contact, website, geolocation, location }) => {
  return (
    <div className={styles.sidebar}>
      {/* Contact */}
      <div className={styles.actionCard}>
        <h3 className={styles.sectionTitle}>Contact</h3>
        <div className={styles.contactInfo}>
          {contact && (
            <div className={styles.contactItem}>
              <i className="fas fa-phone"></i>
              <span>{contact}</span>
            </div>
          )}
          {website && (
            <div className={styles.contactItem}>
              <i className="fas fa-globe"></i>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </div>
          )}
          {location && (
            <div className={styles.contactItem}>
              <i className="fas fa-map-marker-alt"></i>
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.actionCard}>
        <h3 className={styles.sectionTitle}>Quick Actions</h3>
        <div className={styles.actionButtons}>
          {contact && (
            <a href={`tel:${contact}`} className={styles.actionButton}>
              <i className="fas fa-phone"></i> Call School
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionButton}
            >
              <i className="fas fa-globe"></i> Visit Website
            </a>
          )}
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Location</h3>

      {geolocation ? (
        (() => {
          const coords = typeof geolocation === 'string' ? JSON.parse(geolocation) : geolocation;

          return (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.driveButton}
            >
              Drive to Location
            </a>
          );
        })()
      ) : (
        <p>Location information not available</p>
      )}
    </div>
  );
};

export default SchoolSidebar;
