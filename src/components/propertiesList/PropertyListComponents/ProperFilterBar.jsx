import React, { useState } from 'react';
import styles from './ProperFilterBar.module.css';

export default function ProperFilterBar({ onFilter }) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [listingType, setListingType] = useState('rent');

  const handleSearch = () => {
    onFilter({ location, type, listingType });
  };

  return (
    <div className={styles.filterBar}>
      {/* Location */}
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={styles.input}
      />

      <select value={type} onChange={(e) => setType(e.target.value)} className={styles.select}>
        <option value="">Any type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="villa">Villa</option>
      </select>

      <div className={styles.segmented}>
        <button
          className={`${styles.segment} ${listingType === 'rent' ? styles.active : ''}`}
          onClick={() => setListingType('rent')}
        >
          Rent
        </button>
        <button
          className={`${styles.segment} ${listingType === 'buy' ? styles.active : ''}`}
          onClick={() => setListingType('buy')}
        >
          Buy
        </button>
      </div>

      <button onClick={handleSearch} className={styles.searchBtn}>
        Search
      </button>
    </div>
  );
}
