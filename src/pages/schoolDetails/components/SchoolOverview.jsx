import React from 'react';
import styles from './SchoolOverview.module.css';
import { FaStar, FaDollarSign, FaGraduationCap } from 'react-icons/fa';

const SchoolOverview = ({ name, location, type, curriculum, grades, rating, fees_range }) => {
  return (
    <div className={styles.detailCard}>
      <h2 className={styles.sectionTitle}>School Overview</h2>
      <p className={styles.description}>
        Welcome to <span className={styles.highlight}>{name}</span>, a{' '}
        <span className={styles.highlight}>{type}</span> located in{' '}
        <span className={styles.highlight}>{location}</span>. We offer the{' '}
        <span className={styles.highlight}>{curriculum}</span> program for grades{' '}
        <span className={styles.highlight}>{grades}</span>.
      </p>

      <div className={styles.statsGrid}>
        {[
          { label: 'Rating', value: rating || 'N/A', icon: <FaStar /> },
          { label: 'Fees', value: fees_range || 'N/A', icon: <FaDollarSign /> },
          { label: 'Grades', value: grades || 'N/A', icon: <FaGraduationCap /> },
        ].map((stat, idx) => (
          <div key={idx} className={styles.statItem}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolOverview;
