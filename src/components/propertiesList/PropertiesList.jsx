import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './PropertiesList.module.css';
import PropertyCard from '../../pages/propertyCard/PropertyCard';
import ProperFilterBar from './PropertyListComponents/ProperFilterBar';

const PropertyList = () => {
  const { properties, propertiesLoading, propertiesError } = useOutletContext();
  const [filter, setFilter] = useState('all'); // all, sell, buy

  if (propertiesLoading) return <p>Loading properties...</p>;
  if (propertiesError) return <p>Error loading properties: {propertiesError.message}</p>;
  if (!properties || properties.length === 0) return <p>No properties available.</p>;

  // Filter properties based on selected listing type
  const filteredProperties = properties.filter((property) => {
    if (filter === 'all') return true;
    return property.listing_type === filter;
  });

  return (
    <div style={{ flex: '1' }}>
      <ProperFilterBar />

      <div className={styles.propertiesGrid}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties match the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
