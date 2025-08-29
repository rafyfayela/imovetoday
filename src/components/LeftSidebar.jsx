// File: src/components/LeftSidebar.jsx
import React from 'react';
import styles from './LeftSidebar.module.css';

const LeftSidebar = ({ children }) => {
  return <div className={styles.leftSidebar}>{children}</div>;
};

export default LeftSidebar;
