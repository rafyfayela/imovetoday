import styles from './ProfileSkeleton.module.css';

const ProfileSkeleton = () => {
  return (
    <div className={styles['profile-skeleton']}>
      <span className={`${styles['skeleton-text']} ${styles.shimmer}`} />
      <div className={`${styles['skeleton-avatar']} ${styles.shimmer}`} />
    </div>
  );
};

export default ProfileSkeleton;
