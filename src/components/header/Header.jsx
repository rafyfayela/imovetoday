import React, { useEffect, useState, useMemo, useRef } from 'react';
import styles from './Header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../logo/Logo';
import { supabase } from '../../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import MySession from './MySession';
import { useAuthContext } from '../../../Provider/AuthProvider';
import SearchBar from '../SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scroll state
      setIsScrolled(currentScrollY > 10);

      // Auto collapse search bar when scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsSearchExpanded(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { label: 'All', path: '/app' },
      { label: 'Schools', path: '/app/schools' },
      { label: 'Properties', path: '/app/properties' },
    ],
    []
  );

  const navButtons = useMemo(() => {
    return navItems.map((item) => {
      const isActive =
        item.path === '/app'
          ? location.pathname === '/app'
          : location.pathname.startsWith(item.path);
      return (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`${styles.segmentButton} ${isActive ? styles.active : ''}`}
        >
          {isActive && (
            <motion.div
              layoutId="activeSegment"
              className={styles.activeBackground}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className={styles.label}>{item.label}</span>
        </button>
      );
    });
  }, [location.pathname, navigate, navItems]);

  const searchBarVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const segmentedControlVariants = {
    initial: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.topLevel}>
        <div className={styles.navContainer}>
          <div className={styles.left} onClick={() => navigate('/app')}>
            <Logo />
          </div>

          {user && location.pathname.startsWith('/app') && (
            <div className={styles.center}>
              <AnimatePresence mode="wait">
                {isScrolled && !isSearchExpanded ? (
                  <motion.div
                    key="miniSearch"
                    variants={searchBarVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={styles.miniSearchBar}
                    onClick={() => setIsSearchExpanded(true)} // expand on click
                  >
                    <span>Start your search</span>
                    <div className={styles.miniSearchButton}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="1em"
                        height="1em"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="segments"
                    variants={segmentedControlVariants}
                    initial="initial"
                    animate="initial"
                    exit="exit"
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={styles.segmentedControlContainer}
                  >
                    {navButtons}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className={styles.right}>
            {user ? (
              <MySession />
            ) : (
              <>
                <button className={styles.btnNav} onClick={() => navigate('/login')}>
                  Log In
                </button>
                <button className={styles.btnRegister} onClick={() => navigate('/signup')}>
                  Start Your Journey
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(isSearchExpanded || !isScrolled) && user && location.pathname.startsWith('/app') && (
          <motion.div
            className={styles.bottomLevel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <SearchBar
              values={{ location: '', date: '', guests: '' }}
              onChange={(key, value) => console.log(key, value)}
              onSearch={(values) => {
                console.log('Search clicked:', values);
                setIsSearchExpanded(false); // collapse after search
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
