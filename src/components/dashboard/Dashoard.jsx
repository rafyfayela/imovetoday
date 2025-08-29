import { Outlet } from 'react-router-dom';

import styles from './Dashboard.module.css';
import useSchools from '../../../hooks/useSchools';
import useProperties from '../../../hooks/useProperties';

const Dashboard = () => {
  const { schools, loading: schoolsLoading, error: schoolsError } = useSchools();
  const { properties, loading: propertiesLoading, error: propertiesError } = useProperties();

  return (
    <div className={styles.dashboard}>
      <Outlet
        context={{
          schools,
          schoolsLoading,
          schoolsError,
          properties,
          propertiesLoading,
          propertiesError,
        }}
      />
    </div>
  );
};

export default Dashboard;
