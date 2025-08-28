import React from 'react';
import styles from './Reviews.module.css';

const dummyReviews = [
  {
    id: 1,
    name: 'Alice Johnson',
    rating: 5,
    comment: 'Amazing property! Highly recommend it.',
    date: 'Aug 20, 2025',
    avatar: 'https://i.pravatar.cc/50?img=1',
  },
  {
    id: 2,
    name: 'Mark Smith',
    rating: 4,
    comment: 'Very comfortable and well-located.',
    date: 'Aug 18, 2025',
    avatar: 'https://i.pravatar.cc/50?img=2',
  },
  {
    id: 3,
    name: 'Sophia Lee',
    rating: 5,
    comment: 'Beautiful place with great amenities!',
    date: 'Aug 15, 2025',
    avatar: 'https://i.pravatar.cc/50?img=3',
  },
];

const Reviews = () => {
  return (
    <div className={styles.reviewsSection}>
      <h2 className={styles.sectionTitle}>Reviews</h2>
      {dummyReviews.map((review) => (
        <div key={review.id} className={styles.reviewCard}>
          <img src={review.avatar} alt={review.name} className={styles.avatar} />
          <div className={styles.reviewContent}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewerName}>{review.name}</span>
              <span className={styles.reviewDate}>{review.date}</span>
            </div>
            <div className={styles.reviewRating}>
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className={styles.star}>
                  ★
                </span>
              ))}
            </div>
            <p className={styles.reviewComment}>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
