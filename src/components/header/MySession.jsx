import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../../../Provider/AuthProvider';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import HoverButton from './HoverButton';
import ProfileSkeleton from './ProfileSkeleton';
import { useNavigate } from 'react-router';

export default function MySession() {

  const navigate = useNavigate()
  const { profile, loading } = useAuthContext();

  const [open, setOpen] = useState(false);
  const { logout, loading: LogoutLoading, error } = useAuth();
  const dropdownRef = useRef(null);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile?.full_name
  )}&background=0D8ABC&color=fff&rounded=true`;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setOpen(false);

      window.location.href = '/';
    } else {
      console.error('Logout failed:', error);
    }
  };

  if (loading || !profile) return <ProfileSkeleton />;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
      }}
    >
      <span style={{ color: 'black' }}>Hello, {profile.full_name}</span>
      <img
        src={profile.photo_url || fallbackAvatar}
        alt={profile.full_name}
        style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: '#fff',
            borderRadius: '14px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            minWidth: '200px',
            overflow: 'hidden',
            zIndex: 100,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          <HoverButton onClick={() => alert('Settings clicked')}>
          <button style={menuItemStyle} onClick={() => navigate('/profile')}>
            <FaUser style={iconStyle} />
            <span>Profile</span>
          </button>
          <div style={dividerStyle}></div>
          <button style={menuItemStyle} onClick={() => alert('Settings clicked')}>
            <FaCog style={iconStyle} />
            <span>Settings</span>
          </HoverButton>
          <div style={dividerStyle}></div>
          <HoverButton
            onClick={handleLogout}
            disabled={LogoutLoading}
            hoverColor="#fce4e4"
            style={{ color: '#e53935', fontWeight: 500 }}
          >
            <FaSignOutAlt style={{ ...iconStyle, color: '#e53935' }} />
            <span>{LogoutLoading ? 'Logging out...' : 'Logout'}</span>
          </HoverButton>
        </div>
      )}
    </div>
  );
}

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  padding: '10px 16px',
  background: 'transparent',
  border: 'none',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  textAlign: 'left',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  color: '#333',
};

const iconStyle = {
  fontSize: '18px',
  color: '#555',
  flexShrink: 0,
};

const dividerStyle = {
  height: '1px',
  background: '#e0e0e0',
  margin: '4px 0',
};
