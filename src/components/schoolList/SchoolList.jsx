// File: src/components/SchoolList/SchoolList.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SchoolCard from '../../pages/schoolCard/SchoolCard';
import SkeletonCard from '../SkeletonCard';
import styles from './SchoolList.module.css';

const SchoolList = () => {
  const { schools, SchoolsLoading, schoolsError } = useOutletContext();
  const renderItem = (item) => <SchoolCard school={item} key={item.id} />;

  const skeletonCount = 6;

  return (
    <div className={styles.schoolsGrid}>
      {SchoolsLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => <SkeletonCard key={index} />)
        : schools.map((school) => renderItem(school))}
      {schoolsError && <p className={styles.errorText}>Error loading schools.</p>}
    </div>
  );
};

export default SchoolList;
