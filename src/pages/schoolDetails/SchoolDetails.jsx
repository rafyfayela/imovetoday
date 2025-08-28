import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SchoolDetails.module.css';
import useSchools from '../../../hooks/useSchools';

const SchoolDetails = () => {
  const { id } = useParams();
  // Ajout d'un log pour vérifier la récupération de l'id
  useEffect(() => {
    // console.log("SchoolDetails - useParams id:", id);
  }, [id]);

  // Correction : le hook useSchools doit retourner un objet contenant 'school', 'loading', 'error'
  // Assure-toi que useSchools accepte un id et retourne bien ces propriétés
  const { school, loading, error } = useSchools(id);

  if (loading) return <div className={styles.loading}>Chargement des détails de l'école...</div>;
  if (error)
    return <div className={styles.error}>Erreur lors du chargement : {error.toString()}</div>;
  if (!school) return <div className={styles.error}>École non trouvée</div>;

  const {
    name,
    location,
    type,
    curriculum,
    images,
    grades,
    fees_range,
    rating,
    transport,
    canteen,
    contact,
    website,
    geolocation,
  } = school;

  return (
    <div className={styles.schoolDetailsContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <img
          src={images && images.length > 0 ? images[0] : '/placeholder-school.jpg'}
          alt={name}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.schoolBasicInfo}>
            <h1 className={styles.schoolName}>{name}</h1>
            <div className={styles.schoolLocation}>
              <i className="fas fa-map-marker-alt"></i>
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          {/* School Overview */}
          <div className={styles.detailCard}>
            <h2 className={styles.sectionTitle}>Présentation de l'école</h2>
            <p>
              Bienvenue à {name}, un établissement {type} situé à {location}. Nous proposons le
              programme {curriculum} pour les classes {grades}.
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{rating || 'N/A'}</div>
                <div className={styles.statLabel}>Note</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{fees_range || 'N/A'}</div>
                <div className={styles.statLabel}>Frais</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{grades || 'N/A'}</div>
                <div className={styles.statLabel}>Classes</div>
              </div>
            </div>
          </div>

          {/* School Details */}
          <div className={styles.detailCard}>
            <h2 className={styles.sectionTitle}>Détails de l'école</h2>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Type</span>
                <span className={styles.detailValue}>{type}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Programme</span>
                <span className={styles.detailValue}>{curriculum}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Classes</span>
                <span className={styles.detailValue}>{grades}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Transport</span>
                <span className={styles.detailValue}>
                  {transport ? 'Disponible' : 'Non disponible'}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Cantine</span>
                <span className={styles.detailValue}>
                  {canteen?.available ? 'Disponible' : 'Non disponible'}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Frais</span>
                <span className={styles.detailValue}>{fees_range}</span>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {images && images.length > 0 && (
            <div className={styles.detailCard}>
              <h2 className={styles.sectionTitle}>Galerie</h2>
              <div className={styles.galleryGrid}>
                {images.map((img, idx) => (
                  <div key={idx} className={styles.galleryItem}>
                    <img src={img} alt={`${name} - Image ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
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
              {geolocation && (
                <div className={styles.contactItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{geolocation}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.actionCard}>
            <h3 className={styles.sectionTitle}>Actions rapides</h3>
            {contact && (
              <a href={`tel:${contact}`} className={styles.actionButton}>
                <i className="fas fa-phone"></i> Appeler l'école
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                <i className="fas fa-globe"></i> Visiter le site
              </a>
            )}
          </div>

          {/* Location / Map */}
          <div className={styles.actionCard}>
            <h3 className={styles.sectionTitle}>Localisation</h3>
            <div className={styles.mapContainer}>
              {geolocation ? (
                <p>La carte s'affichera ici pour : {geolocation}</p>
              ) : (
                <p>Information de localisation non disponible</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
