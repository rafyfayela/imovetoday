import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, values, onChange }) {
  const handleInputChange = (key, value) => {
    if (onChange) {
      onChange(key, value);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchSegment}>
        <span>Where</span>
        <input
          type="text"
          placeholder="Search destinations"
          value={values?.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </div>

      <div className={styles.searchSegment}>
        <span>Date</span>
        <input
          type="text"
          placeholder="Add dates"
          value={values?.date || ''}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
      </div>

      <div className={styles.searchSegment}>
        <span>Who</span>
        <input
          type="text"
          placeholder="Add guests"
          value={values?.guests || ''}
          onChange={(e) => handleInputChange('guests', e.target.value)}
        />
      </div>

      <button className={styles.searchButton} onClick={() => onSearch && onSearch(values)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
