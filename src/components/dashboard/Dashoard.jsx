import { useState, useEffect } from 'react';
import { Outlet, useMatch } from 'react-router-dom';

import styles from './Dashboard.module.css';
import useSchools from '../../../hooks/useSchools';
import useProperties from "../../../hooks/useProperties";
import SchoolList from '../schoolList/SchoolList';

const Dashboard = () => {
  const { schools, loading: schoolsLoading, error: schoolsError } = useSchools();
  const { properties, loading: propertiesLoading, error: propertiesError } = useProperties();

  return (
    <div className={styles.dashboard}>
      {/* Provide both schools and properties data to nested routes */}
      <Outlet 
        context={{ 
          schools, 
          schoolsLoading, 
          schoolsError, 
          properties, 
          propertiesLoading, 
          propertiesError 
        }} 
      />
    </div>
  );
};

export default Dashboard;
