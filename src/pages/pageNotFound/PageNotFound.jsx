// File: src/components/PageNotFound/PageNotFound.jsx

import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.css';
import Header from '../../components/header/Header';

const PageNotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.errorCode}>404</div>

            <div className={styles.errorMessage}>
              <h1>Page Not Found</h1>
              <p>The page you're looking for doesn't exist or has been moved.</p>
            </div>

            <div className={styles.illustration}>
              <svg
                width="300"
                height="200"
                viewBox="0 0 500 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M250 50C250 50 200 100 200 150C200 200 250 250 300 250C350 250 400 200 400 150C400 100 350 50 300 50C250 50 250 50 250 50Z"
                  fill="#f8f9fa"
                  stroke="#E41B23"
                  strokeWidth="8"
                />
                <path
                  d="M200 150L100 150M400 150L450 150"
                  stroke="#00843D"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="250" cy="150" r="30" fill="#000000" fillOpacity="0.2" />
                <circle cx="350" cy="150" r="30" fill="#000000" fillOpacity="0.2" />
                <path
                  d="M150 200C150 200 180 230 250 230C320 230 350 200 350 200"
                  stroke="#000000"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className={styles.actions}>
              <Link to="/" className={styles.homeButton}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Return Home
              </Link>

              <button onClick={() => window.history.back()} className={styles.backButton}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageNotFound;
